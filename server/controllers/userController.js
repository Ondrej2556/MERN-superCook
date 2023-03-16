const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const Recipe = require('../models/recipeModel');
const { savedRecipes } = require('./recipeController');
const ObjectId = require('mongoose').Types.ObjectId;

//@desc Login user  
//@route /api/users/login
//@method post
//@access public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email })

        if(!user) {
            res.status(401)
            throw new Error('User doesnt exist!')
        }

        if(!bcrypt.compareSync(password, user.password)){
            res.status(401)
            throw new Error('Password is incorrect!')
        }


        res.status(200).json({
            name: user.name,
            email: user.email,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        })
    } catch (error) {
        res.send(error.message)
    }
}

//@desc Register user  
//@route /api/users/register
//@method post
//@access public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password ) {
            res.status(401)
            throw new Error('All fields are mandatory!')
        }

        const userExist = await User.findOne({email})

        if(userExist) {
            res.status(401)
            throw new Error('User already exists!')
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({name, email, password: hashedPassword})

        if(!newUser) {
            res.status(500)
            throw new Error('Something went wrong. Try again later...')
        }
        res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            token: jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        })
    } catch (error) {
        res.send(error.message)
    }
}

//@desc Save or unSave recipe from/to user DB
//@route /api/users/handleRecipe/:id
//@method put
//@access private
const saveOrUnsaveRecipe = async (req, res) => {
    try {
        const  recipeID  = req.params.id;
        const user = req.user;

        if(!ObjectId.isValid(recipeID)){
            res.status(401)
            throw new Error("Wrong ID entered")
        }

        const recipe = await Recipe.findOne({_id: recipeID})

        if(!recipe) {
            res.status(401)
            throw new Error('Recepi doesnt exist')
        }


        if(!user.savedRecipes.toString().includes(recipeID)){
            const savedRecipes = [...user.savedRecipes, recipeID]

            const updatedUser = await User.findByIdAndUpdate({_id: user._id}, {savedRecipes}, {new: true})

            if(!updatedUser){
                res.status(501)
                throw new Error('Something went wrong. Try again later')
            }

            res.status(201).json("Recepi saved")
        } else{
            const savedRecipes = user.savedRecipes.filter((id) => id.toString() !== recipeID)
            
            const updatedUser = await User.findByIdAndUpdate({_id: user._id}, {savedRecipes}, {new: true})

            if(!updatedUser){
                res.status(501)
                throw new Error('Something went wrong. Try again later')
            }

            res.status(201).json("Recepi unsaved")
        }

    } catch (error) {
        console.log(error)   
        res.json(error.message)
    }
}

module.exports = {loginUser, registerUser, saveOrUnsaveRecipe }