import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LangProvider } from "./hooks/lang";

const container = document.getElementById("root");

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <LangProvider>
        <App />
      </LangProvider>
    </React.StrictMode>
  );
}
