import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem(`user`));

  return (
    <>
      {user ? (
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/createRecipe">Create recipe</NavLink>
          <NavLink to="/savedRecipes">Saved Recipes</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      ) : (
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/auth">Login / Register</NavLink>
        </nav>
      )}
      <header>
        <h1>SuperCook</h1>
        <h2>All Recipes In One Place</h2>
      </header>
    </>
  );
};

export default Navbar;
