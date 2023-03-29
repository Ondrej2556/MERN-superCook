import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StarCounter from "./StarCounter";
import { useNavigate } from "react-router-dom";

function RecipeInfo({ recipeID }) {
  const [recipeInfo, setRecipeInfo] = useState("");
  const [isRecipeSaved, setIsRecipeSaved] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false)
  const user = JSON.parse(localStorage.getItem(`user`));
  const navigate = useNavigate();

  useEffect(() => {
    getRecipeData();
    if (user) {
      getIfRecipeSaved();
    }
  }, []);

  const getIfRecipeSaved = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/recipes/saved",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const savedRecipesID = response.data.map((recipe) => recipe._id);

      if (savedRecipesID.includes(recipeID)) {
        setIsRecipeSaved(true);
      } else {
        setIsRecipeSaved(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRecipeData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/recipes/recipe/${recipeID}`
      );
      setRecipeInfo(response.data);      
      if(user && response.data.author === user.id) {
        setIsAuthor(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data);
    }
  };

  const handleSaveRecipe = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/users/handleRecipe/${recipeID}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      toast.success(response.data);
      location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipe = async () => {
    const confirmation = confirm('Are you sure you want to delete')
    
    if(confirmation) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/recipes/${recipeID}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
          if(response) {
            toast.success("recipe deleted");
            navigate('/')
          }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data)
      }
    }
  }

  return (
    <div className="recipeInfo">
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        {recipeInfo.title}
      </h1>
      <div className="recipeBoxik">
        <img src={recipeInfo.imageURL} alt={recipeInfo.title} width="50%" height="350px" />
        <div>
          <h2>Description</h2>
          <p>{recipeInfo.description}</p>
          <hr />
          <h2>Tutorial</h2>
          <p>{recipeInfo.tutorial}</p>
          <hr />
          <h2>Ingredients</h2>
          <ul>
            {recipeInfo?.ingredients?.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>
          <hr />
          <StarCounter rating={recipeInfo.authorLiked} color="yellow" />
          {user ? (
            <>
              <button onClick={handleSaveRecipe}>
                {isRecipeSaved ? "Unsave" : "save"}
              </button>
              {isAuthor&&<button style={{ backgroundColor:"red", marginLeft:"25px"}} onClick={deleteRecipe}> Delete Recipe</button>}
            </>
          ) : (
            <button onClick={() => navigate("/auth")}>
              Login to save recipe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeInfo;
