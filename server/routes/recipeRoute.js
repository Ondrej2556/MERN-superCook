const express = require('express')
const router = express.Router()
const {getAllRecipes, getOneRecipe, createRecipe, savedRecipes, deleteRecipe} = require('../controllers/recipeController')
const protect = require('../middleware/auth')


router.get('/', getAllRecipes)

router.get('/recipe/:id', getOneRecipe)

router.post('/',protect, createRecipe)

router.get('/saved', protect, savedRecipes)

router.delete('/:id', protect, deleteRecipe)

module.exports = router;