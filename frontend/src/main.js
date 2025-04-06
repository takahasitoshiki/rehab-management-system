import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "@/context/AuthProvider";
import { store } from "./store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(_jsx(React.StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(AuthProvider, { children: _jsx(App, {}) }) }) }));
