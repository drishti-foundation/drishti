import React from "react";
import { Link } from "react-router-dom";

import { Language } from "#shared/constants";

import Button from "./Button";
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
        <img src={drishti} alt="Logo" />
      </Link>
      <div className="btn-wrapper mobile-bg">
        <Button name="English Braille" selected={lang === Language.Eng} onClick={setEng} />
        <Button name="Hindi Braille" selected={lang === Language.Hin} onClick={setHin} />
      </div>
    </div>
  );
}

export default NavBar;
