import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import StoreProvider from "./store/StoreProvider";
import { PAGE_META, PRERENDER_ROUTES, SITE_URL } from "./seo";

/**
 * Build-time entry used by scripts/prerender.mjs. Mirrors the provider
 * tree in main.tsx so the browser can hydrate the HTML it produces.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <StoreProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </StoreProvider>
      </StaticRouter>
    </StrictMode>
  );
}

export { PAGE_META, PRERENDER_ROUTES, SITE_URL };
