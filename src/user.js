import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import {validationCheck} from './validator.js'

const router = express.Router()
const user = []

router.get('/' ,(req,res)=>{
    return res.status(201).send(user)
})

router.use(validationCheck('user'))

router.post('/', (req, res)=>{
    let body = req.body
    body['id'] = uuidv4()
    user.push(body)
    return res.status(201).send(body)
})

export default router