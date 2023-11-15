import RecipeBox from "../components/RecipeBox";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [recipeArray, setRecipeArray] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}recipes`);
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
