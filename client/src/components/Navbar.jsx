import { Link } from "react-router-dom"

const Navbar = () => {
    return(
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/createRecipe'>Create recipe</Link>
            <Link to='/savedRecipes'>Saved Recipes</Link>
            <Link to='/auth'>Login / Register</Link>
        </nav>
    )
}

export default Navbar