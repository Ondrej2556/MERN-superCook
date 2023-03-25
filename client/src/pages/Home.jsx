import RecipeBox from "../components/RecipeBox";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [recipeArray, setRecipeArray] = useState([]);
  const API_URL = "http://localhost:3001/api/recipes";

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await axios.get(API_URL);
      setRecipeArray(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <div>
      <RecipeBox recipes={recipeArray} />
    </div>
  );
};

export default Home;
