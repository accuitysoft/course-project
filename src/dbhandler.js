// import { promises as fs } from 'fs'
// import path from 'path'


// const filepath = (filename) => {
//     return path.resolve(process.env.DB_FILE_LOCATION + filename + '.json')
// } 


// const write = async (data, filename) => {
//     let file = filepath(filename);
//     await fs.writeFile(file, JSON.stringify(data))
// }

// const add = async (data, filename) => {
//     try {
//         let content = await getAll(filename)
//         content.push(data)
//         write(content, filename)
//         console.log("file written")
//     } catch (err) {
//         console.error(err)
//         throw err
//     }

// }

// const getAll = async (filename) => {
//     try {
//         let file = filepath(filename);
//         let content = await fs.readFile(file)
//         return JSON.parse(content)
//     } catch (err) {
//         console.error(err)
//         throw err
//     }
// }


// export {
//     add,
//     getAll
// }
require('dotenv').config();
var sql = require("mysql");

const db = sql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE

        });

db.connect( err => {
    if (err) throw err;
})

exports.query = (sql, param) => {
    return new Promise((resolve, reject) => {
        db.query(sql, param, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        })
    })
}
