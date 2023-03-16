const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({ 
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    ingredients:[{
        type: String,
        required: true,
    }],
    tutorial:{
        type: String,
        required: true,
    },
    imageURL:{
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    authorLiked:{
        type: Number,
        required: true,
    },
},{
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;