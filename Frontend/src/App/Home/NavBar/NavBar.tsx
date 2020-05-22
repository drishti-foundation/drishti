import React from "react";

import { Language } from "#shared/constants";

import Button from "./Button";
import drishti from "./drishti.png";

interface NavBarProps {
  setEng: () => void;
  setHin: () => void;
  lang: Language;
}

function NavBar({ lang, setEng, setHin }: NavBarProps) {
  return (
    <div className="nav-bar">
      <img src={drishti} alt="Logo" />
      <div className="btn-wrapper">
        <Button name="English Braille" selected={lang === Language.Eng} onClick={setEng} />
        <Button name="Hindi Braille" selected={lang === Language.Hin} onClick={setHin} />
      </div>
    </div>
  );
}

export default NavBar;
