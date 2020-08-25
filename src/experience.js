require('dotenv').config()
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'express-jwt'
import * as db from './dbhandler.js'

const router = express.Router()

router.get('/' , async (req,res)=>{
    let sql = 'SELECT * FROM experience ORDER BY category'
    let data = await db.query(sql, [])
    if(data.length > 0){
        return res.status(201).send(data)
    } else {
        return res.status(404).send({message: 'No data to display'})
    }
    
})

router.get('/search/:id', async (req,res)=>{
    let sql = 'SELECT * FROM experience WHERE experienceID = ?'
    let data = await db.query(sql, req.params.id)
    if(data.length > 0){
        return res.status(201).send(data)
    } else {
        return res.status(404)
    }
})

router.get('/categories', async (req, res) => {
    let sql = 'SELECT DISTINCT category FROM experience  ORDER BY category'
    let data = await db.query(sql, [])
    if(data.length > 0){
        return res.status(201).send(data)
    } else {
        return res.status(404).send({message: 'No data to display'})
    }
})


// all routes below to be accessed with valid JWT
router.use(jwt({secret: process.env.JWT_SECRET}))

//scan all routes below for error for valid jwt, modify error message if there is an error
router.use(function(err,req,res,next){
    if(err.name === 'UnauthorizedError') {
        if(err.message === 'jwt expired'){
            return res.status(403).send({message: "token expired"})
        } else if(err.message === 'No authorization token was found'){
            return res.status(403).send({message: "token not provided"})
        } else {
            return res.status(401).send({message: "Unauthorized access"})
        }
    }
    next();
})


router.post('/', async (req, res)=>{
    let body = req.body
    console.log(body)
    body['id'] = uuidv4()
    let sql = "INSERT INTO experience (experienceID, category, experience) VALUES (?,?,?)"
    let param = [body.id, body.formCat, body.formExp]
    await db.query(sql, param);
    
    return res.status(201).send({experienceID: body.id, category: body.formCat, experience: body.formExp})
})

router.patch('/', async (req, res)=>{
    let body = req.body
    console.log(body)
    let sql = "UPDATE experience SET category = ?, experience = ? WHERE experienceID = ?"
    let param = [body.editCat, body.editExp, body.experienceID]
    await db.query(sql, param);
    return res.status(201).send({message: 'Experience modified'})
})

router.delete('/:id', async (req, res)=>{
    let sql = "SELECT * FROM experience WHERE experienceID = ?"
    let experience = await db.query(sql, req.params.id)
    sql = "DELETE FROM experience WHERE experienceID = ?"
    await db.query(sql, req.params.id);
    return res.status(201).send(experience)
})

export default router