require('dotenv').config()
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import {validationCheck} from './validator.js'
import jwt from 'express-jwt'

const router = express.Router()
const data = [] //temporary until part 3 of project

router.post('/entries', validationCheck('contact'), (req, res)=>{
    let body = req.body
    body['id'] = uuidv4()
    data.push(body)
    return res.status(201).send(body)
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

router.get('/entries' , (req,res)=>{
    return res.status(201).send(data)
    
})

router.get('/entries/:id', (req,res)=>{
    const result = data.filter(message => message.id == req.params.id)
    if (result.length > 0) {
        return res.send(result)
     }
     
     return res.status(404).send({message: `${req.params.id} not found`})
})

export default router