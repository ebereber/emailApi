const express = require('express')
const app = express()
const routes = require('./routes')
const dotenv = require('dotenv')

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', routes)

const serverPort = process.env.PORT

app.listen(serverPort, () => console.log(`
################################################
🚀 Server listening on port: ${serverPort} 🚀
################################################
`))
