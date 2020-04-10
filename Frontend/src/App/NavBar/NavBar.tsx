import * as React from "react";
import { Link, withRouter } from "react-router-dom";

import drishti from "./drishti.png";

function NavBar({ location }) {
  return (
    <div className="nav-bar">
      <img src={drishti} alt="Logo" />
      <div className="link-wrapper">
        <Link
          className={`link ${location.pathname !== "/about" ? "selected" : ""}`}
          to="/home"
        >
          Home
        </Link>
        <Link
          className={`link ${location.pathname === "/about" ? "selected" : ""}`}
          to="/about"
        >
          About
        </Link>
      </div>
    </div>
  );
}

export default withRouter(NavBar);
