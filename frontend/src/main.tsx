import React from "react";
import ReactDOM from "react-dom/client"; // ✅ React 18 では `react-dom/client` を使用
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!); // ✅ createRoot を使用

root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>
);