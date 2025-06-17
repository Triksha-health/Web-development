// src/contexts/AppContext.jsx

import React, { createContext, useState, useCallback } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback memoizes the fetchRecipes function to prevent unnecessary re-creations
  const fetchRecipes = useCallback(async (currentSearchTerm) => {
    if (!currentSearchTerm.trim()) {
      setError('Please enter an ingredient to search.');
      setRecipes([]);
      return;
    }

    setLoading(true); // Indicate loading state
    setError(null); // Clear previous errors
    setRecipes([]); // Clear previous recipes

    try {
      // TheMealDB API endpoint to filter meals by a main ingredient
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${currentSearchTerm}`);
      if (!response.ok) {
        // Throw an error if the network response was not ok (e.g., 404, 500)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals); // Set recipes if data.meals is not null
      } else {
        setRecipes([]); // No meals found
        setError(`No recipes found for "${currentSearchTerm}". Try another ingredient.`);
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError('Failed to fetch recipes. Please try again later.'); // Set user-friendly error message
    } finally {
      setLoading(false); // End loading state regardless of success or failure
    }
  }, []); // Empty dependency array means this function is created once

  // The value object provided to any consumer of AppContext
  const contextValue = {
    searchTerm,
    setSearchTerm,
    recipes,
    loading,
    error,
    fetchRecipes,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
