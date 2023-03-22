import {useNavigate} from 'react-router-dom'
import { FaStar } from "react-icons/fa";

const sampleData = [
    {
        "_id": "64135dcfaf6247424b03d645",
        "title": "Ham Sandwich",
        "description": "Best & Cheap Sandwich with a lot of proteins",
        "ingredients": [
            "Cheese",
            "Ham",
            "Bread",
            "Tomato"
        ],
        "tutorial": "Just do it the way u like it",
        "imageURL": "https://www.simplyrecipes.com/thmb/KDRUgnhl-Y1_7wvlr7PZbZoXWms=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2013__04__green-eggs-ham-sandwich-horiz-a-1800-bc6c3c7daef44a5aa31b5d8ae3c039ad.jpg",
        "author": "64134a65c3ce8308bde1b181",
        "authorLiked": 5,
    },
    {
        "_id": "6414b003bec0d00fb56b90b5",
        "title": "Ondrejkos Lasagne",
        "description": "Best Lasagna u will ever eat",
        "ingredients": [
            "Cheese",
            "Beef",
            "Whey",
            "Eggs",
            "Marmalade"
        ],
        "tutorial": "Put everything into a large bowl and shake it off",
        "imageURL": "https://mlsnavarecka.cz/wp-content/uploads/2018/06/lasagne2-1020x560.jpg",
        "author": "6414af05bec0d00fb56b90ac",
        "authorLiked": 4,
        "createdAt": "2023-03-17T18:22:59.974Z",
        "updatedAt": "2023-03-17T18:22:59.974Z",
        "__v": 0
    }
]

function RecipeBox() {
    const navigate = useNavigate()

  return (
    <section>
        {sampleData.map((recipe)=>(
            <div onClick={() => navigate(`/recipe/${recipe._id}`)} className="recipeBox" key={recipe._id}>
            <div className="upperPic">
                <img src={recipe.imageURL} alt={recipe.title}/>
            </div>
            <h3>{recipe.title}</h3>
            <hr width="50%" />
            <p style={{padding:"0px 10px"}}>{recipe.description}</p>
            <hr />
            <div style={{display: "flex", justifyContent:"space-between", alignItems:"center",margin: "0px 10px"}}>
            <p >Rating: {recipe.authorLiked}/5</p>
            <button>Recept</button>

            </div>
        </div>
        ))}
        
    </section>
  )
}

export default RecipeBox