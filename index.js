// Packages
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

// Routes
const routes = require('./routes')

dotenv.config()

const app = express()

// Set Body parser, reading data from body into req.body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Implement CORS
app.use(cors())

// API Routes
app.get('/', (req, res) => {
  res.send('Email Contact Form')
})

app.use('/api', routes)

// Server
const serverPort = process.env.PORT

app.listen(serverPort, () => console.log(`
################################################
🚀 Server listening on port: ${serverPort} 🚀
################################################
`))
