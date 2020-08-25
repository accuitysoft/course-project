require('dotenv').config()
import { promises as fs } from 'fs'
import path from 'path'

// return file path depending on file name
const file = (fileName) => {
    let filePath = process.env.DB_FILE_LOCATION + fileName
    return path.resolve(filePath)
}

// write to file
const write = async (filename, data) => {
    await fs.writeFile(file(filename), JSON.stringify(data))
}

// adds to file
const add = async (filename, data) => {
    try {
        let content = await getAll(filename)
        content.push(data)
        write(filename, content)
        console.log("file written")
    } catch (err) {
        console.error(err)
        throw err
    }
}

// gets data file
const getAll = async (filename) => {
    try {
        let content = await fs.readFile(file(filename))
        if (content == []) {
            return content
        }
        return JSON.parse(content)
    } catch (err) {
        console.error(err)
        throw err
    }
}

export {
    add,
    getAll
}