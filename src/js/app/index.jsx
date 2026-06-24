import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LangProvider } from "./hooks/lang";
import { ConfirmProvider } from "./hooks/useConfirm";

const container = document.getElementById("root");

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <LangProvider>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </LangProvider>
    </React.StrictMode>
  );
}
