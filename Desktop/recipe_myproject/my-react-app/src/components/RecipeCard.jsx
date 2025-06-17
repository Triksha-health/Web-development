// src/components/RecipeCard.jsx

import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext.js'; // Correct import path

const RecipeCard = ({ recipe }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover object-center rounded-t-lg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/400x300/FF5733/FFFFFF?text=No+Image`;
        }}
      />
      <div className="p-4 flex flex-col justify-between h-40">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate group-hover:underline">
          {recipe.strMeal}
        </h3>
        <button
          onClick={() => addToCart(recipe)}
          className="mt-auto bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 shadow-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
