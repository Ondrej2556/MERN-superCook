import RecipeInfo from "../components/RecipeInfo"

const RecipePage = () => {
    const recipeID = location.pathname.split('/')[2]

    return(
        <div>
            <header>
                <h1>SuperCook</h1>
                <h2>All Recipes In One Place</h2>
            </header>

            <RecipeInfo recipeID={recipeID}/>
        </div>
    )
}

export default RecipePage