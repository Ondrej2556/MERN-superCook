const express = require('express');
const app = express();
var cors = require('cors')
require('dotenv').config()
const colors = require('colors');
const recipeRoute = require('./routes/recipeRoute')
const userRoute = require('./routes/userRoute')
const {connect} = require('./config/db')

app.use(express.json())
app.use(cors())

//connect db
connect()


app.get("/", (req, res) => res.json("Hello world"))

//Route for recipes
app.use('/api/recipes', recipeRoute)

//Route for users
app.use('/api/users', userRoute)

// Server port
const PORT = process.env.SERVER_PORT || 8080
app.listen(PORT, ()=>console.log(`Server running & listening on port: ${PORT}`))

module.exports = app;
