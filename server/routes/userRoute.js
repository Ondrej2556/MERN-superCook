const express = require('express')
const router = express.Router()
const {loginUser, registerUser, saveOrUnsaveRecipe} = require('../controllers/userController')
const protect = require('../middleware/auth')


router.post('/login', loginUser)

router.post('/register', registerUser)

router.put('/handleRecipe/:id',protect, saveOrUnsaveRecipe)


module.exports = router;