import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StarCounter from './StarCounter';

function RecipeBox() {
    const [recipeArray, setRecipeArray] = useState([])
    const [recipeFilter, setRecipeFilter] = useState("")
    const API_URL = "http://localhost:3001/api/recipes"
    const navigate = useNavigate()


    useEffect(() => {
        getRecipes()
    },[])

    const getRecipes = async () => {
        try {
            const response = await axios.get(API_URL)
            setRecipeArray(response.data)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        }
    }

    const filteredRecipeArray = recipeArray.filter((recipe)=> {
        return recipe.title.toLowerCase().includes(recipeFilter.toLowerCase())
    })
  return (
    <section>
        <div className="searchBar">
            <h2>Search for recipes</h2>
            <input type="text" className="filterInput" placeholder='Search for recipe' value={recipeFilter} onChange={(e)=>setRecipeFilter(e.target.value)}/>
        </div>
        {filteredRecipeArray.length > 0 ? (
            filteredRecipeArray.map((recipe)=>(
                <div onClick={() => navigate(`/recipe/${recipe._id}`)} className="recipeBox" key={recipe._id}>
                <div className="upperPic">
                    <img src={recipe.imageURL} alt={recipe.title}/>
                </div>
                <h3>{recipe.title}</h3>
                <hr width="50%" />
                <p style={{padding:"0px 10px"}}>{recipe.description}</p>
                <hr />
                <div style={{display: "flex", justifyContent:"space-between", alignItems:"center",margin: "0px 10px"}}>
                <StarCounter rating={recipe.authorLiked} color="black"/>
                <button>Recipe</button>
                </div>
            </div>
            ))
        ) : (
            <h1>There are no recipes...</h1>
        )}
        
    </section>
  )
}

export default RecipeBox