import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RecipeBox from "../components/RecipeBox";

function Profile() {
  const user = JSON.parse(localStorage.getItem(`user`));
  const navigate = useNavigate();
  const API_URL = `${import.meta.env.VITE_API_URL}users/`
   
  const [userInfo, setUserInfo] = useState({});
  const [recipeArray, setRecipeArray] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
        getUser();
        getUserCreatedRecipes()
    }
  }, []);

  const getUser = async () => {
    if (user) {
      setUserInfo(user)
    } else {

      try {
        const response = await axios.get(API_URL+'getMe', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data);
      }
    }
  };

  const getUserCreatedRecipes = async () => {
    try {
        const response = await axios.get(API_URL+'getUserRecipes', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRecipeArray(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data);
      }
  }
  const logoutUser = () => {
    localStorage.removeItem(`user`);
    location.reload();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <div>
          <h1>Profile</h1>
          <h2>name: {userInfo.name}</h2>
          <h2>email: {userInfo.email}</h2>
          <h2>Member since: {userInfo.createdAt?.split("T")[0]}</h2>
          <button onClick={logoutUser}>Logout</button>
        </div>
        <div>
          <h1>Created Recipes</h1>
          <RecipeBox recipes={recipeArray} />
        </div>
      </div>
    </>
  );
}

export default Profile;
