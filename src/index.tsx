import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";


try {
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (ex) {
  console.error("React failed", ex);
}