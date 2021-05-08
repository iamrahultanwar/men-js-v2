import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as pages from "./pages";

// const links = Object.keys(pages).map((key) => (
//   <li>
//     <Link to={pages[key].route}>{pages[key].name}</Link>
//   </li>
// ));

const pagesRoute = Object.keys(pages).map((key) => {
  return (
    <Route exact path={pages[key].route}>
      {pages[key]}
    </Route>
  );
});
export default function App() {
  return (
    <Router basename="/admin">
      <Switch>{pagesRoute}</Switch>
    </Router>
  );
}
