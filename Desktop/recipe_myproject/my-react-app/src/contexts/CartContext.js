// src/contexts/CartContext.js

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Attempt to load cart items from localStorage on initial render
    const savedCart = localStorage.getItem('foodRecipesCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Effect to save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('foodRecipesCart', JSON.stringify(cartItems));
  }, [cartItems]); // Dependency array ensures effect runs only when cartItems changes

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart to prevent duplicates
      if (!prevItems.find(cartItem => cartItem.idMeal === item.idMeal)) {
        return [...prevItems, item]; // Add item if it's new
      }
      return prevItems; // Otherwise, return the current items unchanged
    });
  };

  const removeFromCart = (id) => {
    // Filter out the item with the matching id from the cart
    setCartItems((prevItems) => prevItems.filter((item) => item.idMeal !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};