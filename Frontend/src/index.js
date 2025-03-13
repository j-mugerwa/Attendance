import React from "react";
import ReactDOM from "react-dom/client"; //Import `createRoot`
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

// Get the root element
const rootElement = document.getElementById("root");

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
