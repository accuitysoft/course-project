import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import {validationCheck} from './validator.js'
import * as db from './dbhandler.js'

const router = express.Router()

// for testing purposes
// router.get('/' , async (req,res)=>{
//     let users = await db.getAll('users');
//     return res.status(201).send(users)
// })

router.use(validationCheck(['name', 'password', 'email']))

router.post('/', async (req, res)=>{
    let body = req.body
    body['id'] = uuidv4()
    await db.add(body, 'users');
    return res.status(201).send(body)
})

export default router