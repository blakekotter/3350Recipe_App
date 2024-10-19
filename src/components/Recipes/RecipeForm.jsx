import { useState } from "react";
import useHttp from "../../hooks/useHttp"; 

const RecipeForm = ({ recipe, refreshRecipes }) => {
  const [name, setName] = useState(recipe ? recipe.name : "");
  const [ingredients, setIngredients] = useState(
    recipe ? recipe.ingredients.join(", ") : ""
  );
  const [instructions, setInstructions] = useState(
    recipe ? recipe.instructions : ""
  );
  const [imageURL, setImageURL] = useState(recipe ? recipe.imageURL : "");
  const [imageFile, setImageFile] = useState(null); // To store file input
  const [difficulty, setDifficulty] = useState(
    recipe ? recipe.difficulty : "medium"
  );
  const [prepTime, setPrepTime] = useState(
    recipe ? recipe.prepTime : "30 minutes"
  );
  const [servings, setServings] = useState(recipe ? recipe.servings : "4");
  const [category, setCategory] = useState(
    recipe ? recipe.category : "Main Course"
  );
  const [useFile, setUseFile] = useState(false); 

  const { isLoading, error, sendRequest } = useHttp();

  const resetForm = () => {
    // Reset all form fields
    setName("");
    setIngredients("");
    setInstructions("");
    setImageURL("");
    setImageFile(null);
    setDifficulty("medium");
    setPrepTime("30 minutes");
    setServings("4");
    setCategory("Main Course");
    setUseFile(false);
  };  
  

const submitOrderHandler = async (userData) => {
    const applyData = () => {
      console.log("Recipe submitted!");
      resetForm(); 
      if (refreshRecipes) {
        refreshRecipes(); 
      }
      window.location.reload(); 
    };
  
    const url = recipe
      ? `https://recipe-app-4faa1-default-rtdb.firebaseio.com/recipes/${recipe.id}.json`
      : "https://recipe-app-4faa1-default-rtdb.firebaseio.com/recipes.json";
    const method = recipe ? "PATCH" : "POST"; 
  
    sendRequest(
      {
        url: url,
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      },
      applyData
    );
  };
  

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const recipeData = {
      name,
      ingredients: ingredients.split(","),
      instructions,
      imageURL:
        useFile && imageFile ? URL.createObjectURL(imageFile) : imageURL,
      difficulty,
      prepTime,
      servings,
      category,
    };

    submitOrderHandler(recipeData);
  };

  return (
    <form onSubmit={formSubmitHandler} className="p-3">
      <div className="mb-3">
        <label htmlFor="recipeName" className="form-label">
          Recipe Name
        </label>
        <input
          type="text"
          className="form-control"
          id="recipeName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="ingredients" className="form-label">
          Ingredients (separate by commas)
        </label>
        <input
          type="text"
          className="form-control"
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="instructions" className="form-label">
          Instructions
        </label>
        <textarea
          className="form-control"
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        ></textarea>
      </div>

      {/* Toggler for Image URL or File Upload */}
      <div className="mb-3">
        <label className="form-label">Choose Image Source</label>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="imageSource"
            id="urlOption"
            checked={!useFile}
            onChange={() => setUseFile(false)}
          />
          <label htmlFor="urlOption" className="form-check-label">
            Use Image URL
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="imageSource"
            id="fileOption"
            checked={useFile}
            onChange={() => setUseFile(true)}
          />
          <label htmlFor="fileOption" className="form-check-label">
            Upload Image File
          </label>
        </div>
      </div>

      {useFile ? (
        <div className="mb-3">
          <label htmlFor="imageFile" className="form-label">
            Upload Image
          </label>
          <input
            type="file"
            className="form-control"
            id="imageFile"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="mb-3">
          <label htmlFor="imageURL" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="difficulty" className="form-label">
          Difficulty
        </label>
        <select
          className="form-select"
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="prepTime" className="form-label">
          Prep Time
        </label>
        <input
          type="text"
          className="form-control"
          id="prepTime"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="servings" className="form-label">
          Servings
        </label>
        <input
          type="number"
          className="form-control"
          id="servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          className="form-select"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        style={{
          backgroundColor: "#5e8e13",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "5px",
          transition: "background-color 0.3s ease",
        }}
      >
        {isLoading ? "Submitting..." : "Submit Recipe"}
      </button>

      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
  );
};

export default RecipeForm;
