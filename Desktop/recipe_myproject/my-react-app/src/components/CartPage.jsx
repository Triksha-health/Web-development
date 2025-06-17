// src/components/CartPage.jsx

import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext.js'; // Correct import path

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-xl mt-10">Your cart is empty. Add some delicious recipes!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item.idMeal} className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center p-4 transform hover:scale-105 transition-transform duration-300">
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-20 h-20 object-cover rounded-md mr-4 flex-shrink-0"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/80x80/FF5733/FFFFFF?text=No+Image`;
                }}
              />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800">{item.strMeal}</h3>
              </div>
              <button
                onClick={() => removeFromCart(item.idMeal)}
                className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 shadow-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;