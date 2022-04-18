import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import App from "./App";
import "./index.css";
import { rootReducer } from "./redux/rootReducer";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
