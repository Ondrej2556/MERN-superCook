import RecipeInfo from "../components/RecipeInfo"

const RecipePage = () => {
    const recipeID = location.pathname.split('/')[2]

    return(
        <div>
            <RecipeInfo recipeID={recipeID}/>
        </div>
    )
}

export default RecipePage