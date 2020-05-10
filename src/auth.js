require('dotenv').config()
import express from 'express'
import * as jwtGenerator from 'jsonwebtoken'
import * as db from './dbhandler.js'

const router = express.Router()
const filename = 'users.json'

//generate token if user and password is in users.json
router.post('/', async (req, res) => {
    const users = await db.getAll(filename)
    const user = users.filter(user => user.email == req.body.email)

    if (user === undefined || user.length == 0) {
        return res.status(401).send({ error: "incorrect credentials provided" })
    }
    let email = req.body.email
    let password = req.body.password

    if (email == user[0].email && password == user[0].password) {
        const token = jwtGenerator.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' })
        res.send({ token })
    } else {
        res.status(401).send({ error: "incorrect credentials provided" })
    }


})


export default router