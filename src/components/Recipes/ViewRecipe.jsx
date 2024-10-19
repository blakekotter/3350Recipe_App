import { useState } from "react";
import RecipeForm from "./RecipeForm";

const ViewRecipe = ({ recipe, onBack, onDelete, refreshRecipes }) => {
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCloseModal = () => {
    setIsEditMode(false); // Close modal after editing
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <img
          src={recipe.imageURL}
          className="card-img-top"
          alt={recipe.name}
          style={{ height: "200px", objectFit: "none", maxWidth: "100%" }}
        />
        <div className="d-flex justify-content-start ms-3 mt-3">
          <button
            className="btn"
            style={{
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={onBack}
          >
            <i className="bi bi-arrow-left"></i> Back to Recipes
          </button>
        </div>

        <div className="card-body">
          <h2 className="card-title">{recipe.name}</h2>
          <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Category:</strong> {recipe.category}</p>

          <h5>Ingredients</h5>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h5>Instructions</h5>
          <p>{recipe.instructions}</p>

          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn"
              style={{
                backgroundColor: "#5e8e13",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={handleEdit}
            >
              Edit Recipe
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={() => onDelete(recipe.id)}
            >
              Delete Recipe
            </button>
          </div>
        </div>
      </div>

      {isEditMode && (
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
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <RecipeForm 
                  recipe={recipe} 
                  refreshRecipes={refreshRecipes} 
                  onUpdateRecipe={(updatedRecipe) => {
                    // Update the recipe details in the ViewRecipe
                    recipe.name = updatedRecipe.name;
                    recipe.ingredients = updatedRecipe.ingredients;
                    recipe.instructions = updatedRecipe.instructions;
                    recipe.imageURL = updatedRecipe.imageURL;
                    recipe.difficulty = updatedRecipe.difficulty;
                    recipe.prepTime = updatedRecipe.prepTime;
                    recipe.servings = updatedRecipe.servings;
                    recipe.category = updatedRecipe.category;
                  }}
                  onClose={handleCloseModal} // Close modal after editing
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRecipe;
