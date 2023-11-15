import RecipeBox from "../components/RecipeBox";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SavedRecipes = () => {
  const [recipeArray, setRecipeArray] = useState([]);
  
  const API_URL = `${import.meta.env.VITE_API_URL}recipes/saved` 

  const user = JSON.parse(localStorage.getItem(`user`));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(`/`);
    }
    getSavedRecipes();
  }, []);

  const getSavedRecipes = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
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

export default SavedRecipes;
