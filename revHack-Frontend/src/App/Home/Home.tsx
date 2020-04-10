import * as React from "react";
import { useState } from "react";

import { HIN, ENG, API_URL } from "/shared/constants";
import Button from "/shared/Button";
import FileUpload from "/shared/FileUpload";

function Home() {
  const [lang, setLang] = useState(ENG);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState("");

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

    let download_route = await fetch(`${API_URL}/${route}`, {
      method: "POST",
      body: data,
      headers: { "Content-Type": "multipart/form-data" }
    });

    setProgress("Downloading...");

    fetch(`/${download_route}`, {
      method: "GET"
    });

    setProgress("Done.");
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
    </>
  );
}

export default Home;
