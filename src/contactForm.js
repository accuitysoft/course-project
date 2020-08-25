require('dotenv').config()
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { validationCheck } from './validator.js'
import jwt from 'express-jwt'
import * as db from './dbhandler.js'

const router = express.Router()
const filename = 'entries.json'

// post new entry
router.post('/entries', validationCheck(['name', 'email', 'phoneNumber', 'content']), (req, res) => {
    let body = req.body
    body['id'] = uuidv4()
    try {
        db.add(filename, body)
        return res.status(201).send(body)
    } catch (err) {
        throw err
    }

})

// all routes below to be accessed with valid JWT
router.use(jwt({ secret: process.env.JWT_SECRET }))

//scan all routes below for error for valid jwt, modify error message if there is an error
router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        if (err.message === 'jwt expired') {
            return res.status(403).send({ message: "token expired" })
        } else if (err.message === 'No authorization token was found') {
            return res.status(403).send({ message: "token not provided" })
        } else {
            return res.status(401).send({ message: "Unauthorized access" })
        }
    }
    next();
})

// gets all entries
router.get('/entries', async (req, res) => {
    try {
        const entries = await db.getAll(filename)
        return res.status(200).send(entries)
    } 
    catch (err) {
        throw err
    }
})

// get specific entry based on ID
router.get('/entries/:id', async (req, res) => {
    let data = null
    try {
        data = await db.getAll(filename)
    } catch (err){
        throw err
    }
    
    const result = data.filter(message => message.id == req.params.id)
    if (result.length > 0) {
        return res.send(result)
    }

    return res.status(404).send({ message: `${req.params.id} not found` })
})

export default router