const ObjectId = require('mongoose').Types.ObjectId;
const Recipe = require('../models/recipeModel')
const User = require('../models/userModel')

//@desc get all recipes from DB 
//@route /api/recipes/
//@method GET
//@access public
const getAllRecipes = async (req , res) => {
    try {
        const recipes = await Recipe.find()

        if(!recipes) {
            res.status(500)
            throw new Error("Something went wrong. Try again later...")
        }

        res.status(200).json(recipes);
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}

//@desc get recipe based on id from params from DB 
//@route /api/recipes/recipe/:id
//@method GET
//@access public
const getOneRecipe = async (req,res) => {
    try {
        const recipeID = req.params.id;

        if(!ObjectId.isValid(recipeID)){
            res.status(401)
            throw new Error("Wrong ID entered")
        }
        const recipe = await Recipe.findOne({_id: recipeID}) 

        if(!recipe) {
            res.status(500)
            throw new Error("Something went wrong. Try again later...")
        }
        res.status(200).json(recipe)
    } catch (error) {
        res.send(error.message)
    }
}

//@desc create recipe and save it to DB 
//@route /api/recipes/
//@method POST
//@access private
const createRecipe = async (req,res) => {
    //Poslat userID do author
    try {
        const { title, description, ingredients, tutorial, imageURL, authorLiked } = req.body;

        if(!title || !description || !ingredients || !tutorial || !imageURL || !authorLiked) {
            res.status(401)
            throw new Error("All parts are mandatory!")
        }
        
        const recipe = await Recipe.create({title, description, ingredients, tutorial, imageURL, authorLiked, author: req.user._id})

        if(!recipe) {
            res.status(501)
            throw new Error("Something went wrong. Try again later...")
        }

        res.status(201).json(recipe)   
    } catch (error) {
        res.send(error.message)
    }
}

//@desc Delete recipe based on ID from Recipe and user model 
//@route /api/recipes/:id
//@method DELETE
//@access private
const deleteRecipe = async (req,res) => {
    try {
        const recipeID = req.params.id;

        if(!ObjectId.isValid(recipeID)){
            res.status(401)
            throw new Error("Wrong ID entered")
        }

        // Delete recipes based on param id only when you are the author
        const recipe = await Recipe.findOneAndDelete({_id: recipeID}).where({author: req.user._id}) 

        if(!recipe) {
            res.status(500)
            throw new Error("Recepi not found or you are not the author")
        }

        //delete this id from all users that have saved recipes
        const users = await User.find();

        const updatedUsers = users.map((user) => (
            deleteSavedRecepiForUser(user, recipeID)
        ))
        
        if(!updatedUsers){
            res.status(501)
            throw new Error('Something went wrong. Try again later')
        }

        res.status(201).json(recipe._id)
        //res.status(200).json(recipe)
    } catch (error) {
        res.send(error.message)
    }

}

//@desc Get recipes that user have saved 
//@route /api/recipes/saved
//@method GET
//@access private
const savedRecipes = async (req, res) => {
    try {
        const user = await User.findOne({_id:req.user._id})

        if(!user){
            res.status(404)
            throw new Error('User doesnt exist.')
        }
        
        const savedRecipes = await Recipe.find({author: req.user._id})

        if(!savedRecipes){
            res.status(500)
            throw new Error('Something went wrong...')
        }

        res.status(200).json(savedRecipes)
    } catch (error) {
        res.json(error.message)
    }

}

const deleteSavedRecepiForUser = async (user,recipeID) => {    
    const savedRecipes = user.savedRecipes.filter((id) => id.toString() !== recipeID)
    return await User.findByIdAndUpdate({_id: user._id}, {savedRecipes}, {new: true})
}

module.exports = {getAllRecipes, getOneRecipe, createRecipe, savedRecipes, deleteRecipe}