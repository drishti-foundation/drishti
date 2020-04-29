import * as React from "react";
import { withRouter } from "react-router-dom";
import Button from "./Button";

import { ENG, HIN } from "#shared/constants";

import drishti from "./drishti.png";

interface NavBarProps {
  setEng: () => void;
  setHin: () => void;
  lang: number;
}

function NavBar({ lang, setEng, setHin }: NavBarProps) {
  return (
    <div className="nav-bar">
      <img src={drishti} alt="Logo" />
      <div className="btn-wrapper">
        <Button name="English Braille" selected={lang === ENG} onClick={setEng} />
        <Button name="Hindi Braille" selected={lang === HIN} onClick={setHin} />
      </div>
    </div>
  );
}

export default withRouter(NavBar);
