import { useState } from "react"
import { NavLink } from "react-router-dom"

const Navbar = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(true)
    
    return(
        <>
        {isLoggedIn ? (
             <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/createRecipe'>Create recipe</NavLink>
                <NavLink to='/savedRecipes'>Saved Recipes</NavLink>
                <NavLink to='/auth'>Login / Register</NavLink>
            </nav>
        ) : (
            <nav>
                <NavLink to='/' className="active">Home</NavLink>
                <NavLink to='/auth'>Login / Register</NavLink>
            </nav>
        )}
       
        </>
    )
}

export default Navbar