const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');

//config for dotenv
require('dotenv').config()

//creating app
const app = express()


//db
connectDB()
//middleware
app.use(cors({origin:"https://admin-dash-board-frontend.vercel.app"}))
app.use(express.json())

//routes
app.use('/api/auth',require('./routes/authRoute'))
app.use('/api/check',require('./routes/checkRoute'))
app.use('/api/job',require('./routes/jobRoute'))

//getting the server
app.get('/', (req, res) => {
    res.send('Hello Welcome to the server')
})

//port
const port = process.env.PORT

//server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})