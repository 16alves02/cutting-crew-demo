import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.tsx";

// Usado só no build, por scripts/prerender.mjs, para gerar o HTML estático.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
