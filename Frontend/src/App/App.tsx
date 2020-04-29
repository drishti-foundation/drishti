import React, { useState } from "react";

import NavBar from "./NavBar";
import Home from "./Home";

import { ENG, HIN } from "#shared/constants";

import "#styles/App.scss";

function App() {
  const [lang, setLang] = useState(ENG);

  console.log({ lang });

  return (
    <div className="app">
      <NavBar lang={lang} setHin={() => setLang(HIN)} setEng={() => setLang(ENG)} />
      <Home lang={lang} />
    </div>
  );
}

export default App;
