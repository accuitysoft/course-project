require('dotenv').config()
import express from 'express'
import * as jwtGenerator from 'jsonwebtoken'
const router = express.Router()
const user = {email: "123@123.com", password: "12345678"} //temporary until part 3 of project

router.post('/' ,(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    if (email == user.email && password == user.password) {
        const token = jwtGenerator.sign({email}, process.env.JWT_SECRET, {expiresIn: '1m'})
        res.send({token})
        
    } else {
        res.status(401).send({error: "incorrect credentials provided"})
    }
    
})


export default router