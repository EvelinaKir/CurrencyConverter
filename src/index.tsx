import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from './components/App/App'
import {
  BrowserRouter, 
  Route, Routes
} from "react-router-dom";

import { setupStore } from "./services/store";
import { Provider } from "react-redux";

const store = setupStore()

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
