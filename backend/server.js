require('dotenv').config()
const {createServer} = require('http')
const express = require('express')
const {socketServer} = require('./socketServer')

const app = express()
app.use(express.json());

const apiRoutes = require('./routes/apiRoutes')
// const mongoose = require('mongoose')

app.use('/api', apiRoutes)

const server = createServer(app)
socketServer(server)

//mongoDB connection
const connectDB = require('./config/db')
connectDB() 

const PORT = process.env.PORT
server.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))

