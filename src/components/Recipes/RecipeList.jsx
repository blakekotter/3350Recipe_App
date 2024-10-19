import { useState } from "react";

const RecipeList = ({ recipes, onViewRecipe }) => {
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store the selected category

  // Get unique categories
  const uniqueCategories = [
    ...new Set(recipes.map((recipe) => recipe.category)),
  ];

  // Filter the recipes by the selected category
  const filteredRecipes = recipes.filter(
    (recipe) => selectedCategory === "" || recipe.category === selectedCategory
  );

  return (
    <div style={{ marginTop: "20px", padding: "20px" }}>
      <div>
        <h2 style={{ marginBottom: "20px" }}>Recipes</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Dropdown for category selection */}
        <select
          style={{ width: "50%", padding: "10px" }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category
        >
          <option value="">All Categories</option>{" "}
          {/* Default option for showing all */}
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Main content area: Ensure consistent grid and card sizing */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              flex: "1 1 30%",
              minWidth: "280px", // Ensure a minimum width for consistency
              maxWidth: "30%", // Consistent max width for grid structure
              marginBottom: "1rem",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                minHeight: "400px", // Ensures all cards have a consistent height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <img
                src={recipe.imageURL}
                alt={recipe.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px 8px 0 0",
                }}
              />
              <div style={{ padding: "15px", flexGrow: "1" }}>
                <h5 style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                  {recipe.name}
                </h5>
                <p style={{ marginBottom: "10px" }}>
                  <strong>Prep Time:</strong> {recipe.prepTime} <br />
                  <strong>Servings:</strong> {recipe.servings} <br />
                  <strong>Category:</strong> {recipe.category}
                </p>
                <button
                  style={{
                    backgroundColor: "#5e8e13",
                    color: "#fff", 
                    border: "none",
                    padding: "10px 20px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease", 
                  }}
                  onClick={() => onViewRecipe(recipe)}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#5e8e13")
                  } // Darker green on hover
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#76a71d")
                  } // Reset color when not hovering
                >
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
