const express = require('express');
const app = express();
require('dotenv').config()
const colors = require('colors');
const recipeRoute = require('./routes/recipeRoute')
const userRoute = require('./routes/userRoute')
const {connect} = require('./config/db')

app.use(express.json())

//connect db
connect()

//Route for recipes
app.use('/api/recipes', recipeRoute)

//Route for users
app.use('/api/users', userRoute)

// Server port
const PORT = process.env.SERVER_PORT || 8080
app.listen(PORT, ()=>console.log(`Server running & listening on port: ${PORT}`))
