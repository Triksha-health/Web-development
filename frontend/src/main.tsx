import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import StoreProvider from "./store/StoreProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        {/* Wrapping the App with AuthProvider to provide authentication context */}

        <AuthProvider>
          <App />
        </AuthProvider>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>
);
