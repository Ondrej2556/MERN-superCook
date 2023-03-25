const express = require('express')
const router = express.Router()
const {loginUser, registerUser, saveOrUnsaveRecipe, getOneUser, getAllUserRecipes} = require('../controllers/userController')
const protect = require('../middleware/auth')


router.post('/login', loginUser)

router.post('/register', registerUser)

router.get('/getMe',protect, getOneUser)

router.put('/handleRecipe/:id',protect, saveOrUnsaveRecipe)

router.get('/getUserRecipes',protect, getAllUserRecipes)


module.exports = router;