require('dotenv').config()
import express from 'express'
import * as jwtGenerator from 'jsonwebtoken'
import * as db from './dbhandler.js'
const router = express.Router()


router.post('/' , async (req,res)=>{
    const email = req.body.username
    const password = req.body.password
    let sql = "SELECT * FROM user WHERE email = ?"
    let userInfo = await db.query(sql, email)
    
    if (userInfo.length != 0 && userInfo[0].password == password) {
        const token = jwtGenerator.sign({email}, process.env.JWT_SECRET, {expiresIn: '10m'})
        res.send({token})
    } else {
        res.status(401).send({error: "incorrect credentials provided"})
    }
    
})


export default router