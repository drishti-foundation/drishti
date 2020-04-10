import * as React from "react";
import { useState } from "react";

import { HIN, ENG } from "/shared/constants";
import Button from "/shared/Button";
import FileUpload from "/shared/FileUpload";

import Download from "./Download";

function Home() {
  const [lang, setLang] = useState(ENG);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState("");
  const [link, setLink] = useState("");

  const submit = async () => {
    let route = "";
    switch (lang) {
      case HIN:
        route = "hindi";
      case ENG:
      default:
        route = "english";
    }

    let data = new FormData();

    data.append("file", file);

    setProgress("Converting...");

    console.log({ data });

    let response = await fetch(`/${route}`, {
      method: "POST",
      body: data
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
      <FileUpload setFile={setFile} onDrop={list => setFile(list[0])} />
      <p className="file-name">{p_value}</p>
      <Button name="Submit" onClick={submit} className="submit-btn" />
      <p className="file-name">{progress}</p>
      {link.length ? (
        <Download className="download" link={link} onClick={() => setLink("")} />
      ) : null}
    </>
  );
}

export default Home;
