// src/components/Header.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext'; // Correct import path

const Header = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <header className="bg-gradient-to-r from-orange-400 to-red-500 p-4 shadow-lg rounded-b-xl mb-6">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white mb-4 sm:mb-0 transform hover:scale-105 transition-transform duration-300">
          Food Recipes
        </h1>
        <nav className="flex space-x-4">
          <Link
            to="/"
            className="px-5 py-2 rounded-full text-lg font-semibold transition-all duration-300 text-white hover:bg-white hover:text-red-600 hover:shadow-md"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="px-5 py-2 rounded-full text-lg font-semibold relative transition-all duration-300 text-white hover:bg-white hover:text-red-600 hover:shadow-md"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;


