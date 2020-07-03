import React from "react";
import { Link } from "react-router-dom";

import { Language } from "#shared/constants";

import Checkbox from "./Checkbox";
import drishti from "#pics/drishti.png";

interface NavBarProps {
  setEng: () => void;
  setHin: () => void;
  lang: Language;
}

function NavBar({ lang, setEng, setHin }: NavBarProps) {
  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        {back}
        <img src={drishti} alt="drishti logo" />
      </Link>
      <div className="btn-wrapper">
        <Checkbox name="English Braille" checked={lang === Language.Eng} onClick={setEng} />
        <Checkbox name="Hindi Braille" checked={lang === Language.Hin} onClick={setHin} />
      </div>
    </div>
  );
}

export default NavBar;

const back = (
  <svg viewBox="0 0 50 100" className="back">
    <path d="M50 0 L0 50 L50 100" fill="transparent" stroke="white" strokeWidth="10" />
  </svg>
);
