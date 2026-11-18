import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/libre-franklin";
import "@fontsource-variable/jetbrains-mono";
import App from "./App";
import "./index.css";
import "./motion.css";
import { AuthProvider } from "./context/AuthContext";
import StoreProvider from "./store/StoreProvider";

const container = document.getElementById("root")!;

const app = (
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>
);

// Pages written out by scripts/prerender.mjs already contain their HTML and
// say which page it is. When that matches the address, attach to it instead
// of rendering from scratch. Anything else (app.html, the dev server, or a
// host that served the wrong file) starts from an empty root.
const prerendered = container.dataset.prerendered;
const here = window.location.pathname.replace(/\/+$/, "") || "/";

if (prerendered && prerendered === here) {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}
