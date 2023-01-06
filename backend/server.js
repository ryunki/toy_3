require('dotenv').config()
const {createServer} = require('http')
const express = require('express')
const app = express()

app.use(express.json());

const server = createServer(app)

const apiRoutes = require('./routes/apiRoutes')
// const mongoose = require('mongoose')

app.use('/api', apiRoutes)

//mongoDB connection
const connectDB = require('./config/db')
connectDB() 

const PORT = process.env.PORT
server.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))

