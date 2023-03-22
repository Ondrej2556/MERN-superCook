import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import StarCounter from './StarCounter';

function RecipeInfo({recipeID}) {
    const [recipeInfo, setRecipeInfo] = useState("")
    const API_URL = "http://localhost:3001/api/recipes"

    useEffect(()=>{
        getRecipeData()
    }, [])
  
    const getRecipeData = async () => {
        try {
            const response = await axios.get(API_URL+`/recipe/${recipeID}`)
            setRecipeInfo(response.data)
        } catch (error) {
            console.error(error)
            toast.error(error.response.data)
        }
    }
    
    const handleSaveRecipe = () => {
        //Save only if logged in
        console.log("save recipe")
    }
    return (
        <div className="recipeInfo">
            <h1 style={{display:"flex", justifyContent: "center"}}>{recipeInfo.title}</h1>
            <div className="recipeBoxik">
                <img src={recipeInfo.imageURL} alt={recipeInfo.title} width="50%"/>
                <div>
                <h2>Description</h2>
                <p>{recipeInfo.description}</p>
                <hr />
                <h2>Tutorial</h2>
                <p>{recipeInfo.tutorial}</p>
                <hr />
                <h2>Ingredients</h2>
                <ul>
                {recipeInfo?.ingredients?.map((ingredient, i)=> <li key={i}>{ingredient}</li>)}
                </ul>
                <hr />
                <StarCounter rating={recipeInfo.authorLiked} color="yellow"/>
                
                <button onClick={handleSaveRecipe}>Save recipe</button>
                </div>
            </div>
        </div>
    )
}

export default RecipeInfo