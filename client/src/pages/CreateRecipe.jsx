import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({});

  const user = JSON.parse(localStorage.getItem(`user`));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(`/`);
    }
  }, []);

  const handleRecipe = (e) => {
    if (e.target.name === "ingredients") {
      let ingredients = e.target.value.split(",");
      ingredients = ingredients.filter((ing) => ing.trim() !== "");
      setRecipe((prev) => ({ ...prev, [e.target.name]: ingredients }));
    } else {
      setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    if (
      !recipe.title ||
      !recipe.description ||
      !recipe.ingredients ||
      !recipe.tutorial ||
      !recipe.imageURL ||
      !recipe.authorLiked
    ) {
      toast.error("All fields are mandatory");
    } else if(recipe.authorLiked < 1 || recipe.authorLiked > 5) {
      toast.error("Stars can be only in range of 1 to 5")
    }
    else {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/recipes",
          recipe,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        if (response) {
          toast.success("Recipe succesfully created.");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data);
      }
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Create Recipe</h1>

      <form className="recipeForm">
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleRecipe}
        />
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleRecipe}
        />
        <label>Ingredients separated by a comma</label>
        <textarea
          type="text"
          placeholder="ingredients (,)"
          name="ingredients"
          onChange={handleRecipe}
        />
        <label>Step by step guide</label>
        <textarea
          name="tutorial"
          placeholder="Tutorial"
          onChange={handleRecipe}
        />
        <label>URL for an image</label>
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          onChange={handleRecipe}
        />
        <label>How many stars out of 5</label>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="1"
          name="authorLiked"
          onChange={handleRecipe}
        />

        <button onClick={handleCreateRecipe}>Create recipe</button>
      </form>
      <br />
      <br />
    </>
  );
};

export default CreateRecipe;
