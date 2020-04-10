import * as React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";
import About from "./About";
import Home from "./Home";

import "/styles/App.scss";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
