// src/components/HomePage.jsx

import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext.js'; // Correct import path
import { CartContext } from '../contexts/CartContext.js'; // Correct import path
import RecipeCard from './RecipeCard.jsx'; // Correct import path

const HomePage = () => {
  const {
    searchTerm,
    setSearchTerm,
    recipes,
    loading,
    error,
    fetchRecipes,
  } = useContext(AppContext);
  const { addToCart } = useContext(CartContext);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(searchTerm);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ingredient (e.g., apple, chicken)"
          className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 shadow-md"
        >
          Search Recipes
        </button>
      </form>

      {loading && (
        <div className="text-center text-xl text-gray-700 mt-10">
          Loading recipes...
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mt-4"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mt-10" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!loading && !error && recipes.length === 0 && searchTerm.trim() && (
        <div className="text-center text-xl text-gray-500 mt-10">
          No recipes found for "{searchTerm}". Try ingredients like "chicken", "apple", "rice", etc.
        </div>
      )}

      {!loading && !error && recipes.length === 0 && !searchTerm.trim() && (
        <div className="text-center text-xl text-gray-500 mt-10">
          Start by searching for an ingredient to discover delicious recipes!
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;