import React, { useState } from "react";

import { ROUTE, HIN, ENG } from "#shared/constants";
import Button from "#shared/Button";
import FileUpload from "#shared/FileUpload";

import Download from "./Download";
import NavBar from "./NavBar";

interface HomeProps {}

function Home({}: HomeProps) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState("");
  const [link, setLink] = useState("");

  const [lang, setLang] = useState(ENG);

  const submit = async () => {
    let data = new FormData();

    let language = "";

    switch (lang) {
      case HIN:
        language = "hi";
      case ENG:
      default:
        language = "en";
    }
    data.append("file", file);
    data.append("lang", language);

    setProgress("Converting...");

    console.log({ data: Array.from(data.entries()), ROUTE });

    let response = await fetch(`/${ROUTE}`, {
      method: "POST",
      body: data,
    });

    let response_json = await response.json();

    let download_route = response_json.route;

    console.log({ response_json, download_route });

    setProgress("");
    setLink(download_route);
  };

  let p_value = "";

  if (file != null && file.name) {
    p_value = "Selected File: " + file.name;
  }

  return (
    <>
      <NavBar
        lang={lang}
        setHin={() => setLang(HIN)}
        setEng={() => setLang(ENG)}
      />
      <FileUpload setFile={setFile} onDrop={(list) => setFile(list[0])} />
      <p className="file-name">{p_value}</p>
      <Button name="Submit" onClick={submit} className="submit-btn" />
      <p className="file-name">{progress}</p>
      {link.length ? (
        <Download
          className="download"
          link={link}
          onClick={() => setLink("")}
        />
      ) : null}
    </>
  );
}

export default Home;
