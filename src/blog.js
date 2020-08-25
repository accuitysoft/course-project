require('dotenv').config()
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'express-jwt'
import * as db from './dbhandler.js'

const router = express.Router()

router.get('/summary' , async (req,res)=>{
    let sql = "SELECT DATE_FORMAT(date, '%M %d, %Y') as date, blogID, picture, cardTitle, cardSummary FROM blog"
    let data = await db.query(sql, [])
    if (data.length > 0) {
        return res.status(201).send(data)
    } else {
        return res.status(404).send({message: 'No posts found'})
    }
})

router.get('/page/:id' , async (req,res)=>{
    let sql = 'SELECT * FROM blog WHERE blogID = ?'
    let data = await db.query(sql, req.params.id)
    if (data.length > 0) {
        return res.status(201).send(data)
    } else {
        return res.status(404).send({message: 'No posts found'})
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
    body['id'] = uuidv4()
    typeof body.picture === "undefined" ? '' : body.picture
    let sql = "INSERT INTO blog (blogID, picture, date, cardTitle, cardSummary, blogTitle, blogText) VALUES (?,?,?,?,?,?,?)"
    let param = [body.id, body.picture, body.date, body.cardTitle, body.cardSummary, body.blogTitle, body.blogText ]
    console.log(body)
    await db.query(sql, param);
    return res.status(201).send({blogID: body.id, picture: body.picture, date: body.date, cardTitle: body.cardTitle, cardSummary: body.cardSummary, blogTitle: body.blogTitle, blogText: body.blogText})
})

router.patch('/', async (req, res)=>{
    let body = req.body
    let sql = "UPDATE blog SET picture = ?, date = ?, cardTitle = ?, cardSummary = ?, blogTitle = ?, blogText = ? WHERE blogID = ?"
    console.log(body)
    typeof body.picture === "undefined" ? '' : body.picture
    let param = [body.picture, body.date, body.cardTitle, body.cardSummary, body.blogTitle, body.blogText, body.blogID]
    await db.query(sql, param);
    return res.status(201).send({message: 'Post modified'})
})

router.delete('/:id', async (req, res)=>{
    let sql = "DELETE FROM blog WHERE blogID = ?"
    await db.query(sql, req.params.id);
    return res.status(201).send({message: 'Post deleted'})
})

export default router