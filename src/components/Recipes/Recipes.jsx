import { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import ViewRecipe from "./ViewRecipe";
import Header from "../Layout/Header";
import useHttp from "../../hooks/useHttp";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
  const { isLoading, error, sendRequest } = useHttp();

  // Function to fetch recipes from Firebase
  const refreshRecipes = () => {
    sendRequest(
      {
        url: "https://recipe-app-4faa1-default-rtdb.firebaseio.com/recipes.json",
      },
      (recipesData) => {
        const loadedRecipes = [];
        for (const key in recipesData) {
          loadedRecipes.push({
            id: key,
            name: recipesData[key].name,
            ingredients: recipesData[key].ingredients,
            instructions: recipesData[key].instructions,
            imageURL: recipesData[key].imageURL,
            prepTime: recipesData[key].prepTime,
            servings: recipesData[key].servings,
            category: recipesData[key].category,
          });
        }
        setRecipes(loadedRecipes);
      }
    );
  };

  // Fetch recipes on component mount
  useEffect(() => {
    refreshRecipes();
  }, [sendRequest]);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsEditMode(false); // Viewing mode, not editing
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
  };

  const handleEditRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsEditMode(true); // Enable edit mode
  };

  const handleDeleteRecipe = async (recipeId) => {
    await fetch(
      `https://recipe-app-4faa1-default-rtdb.firebaseio.com/recipes/${recipeId}.json`,
      {
        method: "DELETE",
      }
    );
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId)
    );
    setSelectedRecipe(null); // Return to the recipe list after deletion
  };

  return (
    <>
      <Header hideHeader={selectedRecipe !== null} />
      <div className="container mt-4">
        {selectedRecipe ? (
          isEditMode ? (
            <div
              className="modal fade show"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
              tabIndex="-1"
              role="dialog"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Recipe</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleBackToList}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <RecipeForm
                      recipe={selectedRecipe}
                      onClose={handleBackToList}
                      refreshRecipes={refreshRecipes} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ViewRecipe
              recipe={selectedRecipe}
              onBack={handleBackToList}
              onEdit={handleEditRecipe}
              onDelete={handleDeleteRecipe}
              refreshRecipes={refreshRecipes} 
            />
          )
        ) : (
          <>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <br />
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addRecipeModal"
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
                    Add Recipe
                  </button>
                </div>

                <RecipeList recipes={recipes} onViewRecipe={handleViewRecipe} />
              </>
            )}

            <div
              className="modal fade"
              id="addRecipeModal"
              tabIndex="-1"
              aria-labelledby="addRecipeModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addRecipeModalLabel">
                      Add New Recipe
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <RecipeForm
                      onClose={handleBackToList}
                      refreshRecipes={refreshRecipes} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Recipes;
