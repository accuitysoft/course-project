require('dotenv').config()
import express from 'express'
import * as jwtGenerator from 'jsonwebtoken'
import * as db from './dbhandler.js'
const router = express.Router()


router.post('/' , async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    let allUsers = await db.getAll('users')
    let user = allUsers.filter(users => users.email == email)
    if (user.length == 0) {
        return res.status(401).send({error: "incorrect credentials provided"})
    }
    if (password == user[0].password) {
        const token = jwtGenerator.sign({email}, process.env.JWT_SECRET, {expiresIn: '10m'})
        res.send({token})
        
    } else {
        res.status(401).send({error: "incorrect credentials provided"})
    }
    
})


export default router