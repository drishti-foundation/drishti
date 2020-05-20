import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";

import "#styles/App.scss";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/demo" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/" component={About} />
      </Switch>
    </div>
  );
}

export default App;
