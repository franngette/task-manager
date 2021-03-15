import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import "./styles/fonts/RobotoRegular.ttf";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { AnimatePresence } from "framer-motion";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AnimatePresence>
        <App />
      </AnimatePresence>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
