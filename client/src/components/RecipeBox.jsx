import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StarCounter from "./StarCounter";

function RecipeBox({ recipes }) {
  const [recipeFilter, setRecipeFilter] = useState("");
  const navigate = useNavigate();

  const filteredRecipeArray = recipes.filter((recipe) => {
    return recipe.title.toLowerCase().includes(recipeFilter.toLowerCase());
  });
  return (
    <>
      <div style={{textAlign:"center"}}>
        <h2>Search for recipes</h2>
        <input
          type="text"
          className="filterInput"
          placeholder="Search for recipe"
          value={recipeFilter}
          onChange={(e) => setRecipeFilter(e.target.value)}
        />
      </div>
    <section>
      {filteredRecipeArray.length > 0 ? (
        filteredRecipeArray.map((recipe) => (
          <div
            onClick={() => navigate(`/recipe/${recipe._id}`)}
            className="recipeBox"
            key={recipe._id}
          >
            <div className="upperPic">
              <img src={recipe.imageURL} alt={recipe.title} height="300px" />
            </div>
            <h3>{recipe.title}</h3>
            <hr width="50%" />
            <div className="counterBox">
              <StarCounter rating={recipe.authorLiked} color="black" />
            </div>
          </div>
        ))
      ) : (
        <h1>There are no recipes...</h1>
      )}
    </section>
    </>
  );
}

export default RecipeBox;
