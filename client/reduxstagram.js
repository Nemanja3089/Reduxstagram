import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import SingleContainer from "./components/SingleContainer";
import PhotoGridContainer from "./components/PhotoGridContainer";
import css from "./styles/style.styl";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import store, { history } from "./store";

const router = (
  <Provider store = {store}>
  <Router history = {history}>
   <Route path = "/" component = {App}>
    <IndexRoute component = {PhotoGridContainer}/>
    <Route path = "/view/:postId" component = {SingleContainer}/>
   </Route>
  </Router>
  </Provider>
);
render(router,document.getElementById("root"));
