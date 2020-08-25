import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { validationCheck } from './validator.js'
import * as db from './dbhandler.js'

const router = express.Router()
const filename = 'users.json'

// get all users () - only for testing
// router.get('/', async (req, res) => {
//     try {
//         const users = await db.getAll(filename)        
//         return res.status(200).send(users)
//     } catch (err) {
//         throw err
//     }

// })

// all routes below to go through validation
router.use(validationCheck(['name', 'password', 'email']))

// create user
router.post('/', (req, res) => {
    let body = req.body
    body['id'] = uuidv4()
    
    try {
        db.add(filename, body)
        return res.status(201).send(body)
    } catch (err) {
        throw err
    }

})

export default router