import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from './contexts/AppContext.js';// Import Context Providers with explicit .js extension
import { AppProvider } from './contexts/AppContext.js';
import { CartProvider } from './contexts/CartContext.js';

// Import Components with explicit .jsx extension (assuming they are .jsx)
import Header from './components/Header.jsx';
import HomePage from './components/HomePage.jsx';
import CartPage from './components/CartPage.jsx';
import RecipeCard from './components/RecipeCard.jsx'; // Make sure RecipeCard is also imported if it's used directly in App.js or other refactored components

// Main App Component
export default function App() {
  return (
    <BrowserRouter>
      {/* AppProvider provides global states for HomePage */}
      <AppProvider>
        {/* CartProvider provides global states for Cart */}
        <CartProvider>
          <div className="min-h-screen bg-gray-100 font-sans antialiased">
            {/* Load Tailwind CSS */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Set Inter font */}
            <style>{`body { font-family: 'Inter', sans-serif; }`}</style>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

            <Header />

            <main className="pb-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<div className="text-center text-2xl mt-20">404 - Page Not Found</div>} />
              </Routes>
            </main>
          </div>
        </CartProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
