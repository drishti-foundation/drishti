import express from "express";
import path from "path";
import fileUpload, { UploadedFile } from "express-fileupload";
import translate from "googletrans";

import { readPdf, writePdf } from "./pdfHandler";

const app = express();
const PORT = 5000;
const MAX_LENGTH = 10000;

const staticFolder = path.resolve("static");

// Middleware for easy file uploading
app.use(fileUpload());

app.use(express.static("static"));

app.get(["/", "/demo", "/about"], (req, res) => res.sendFile("index.html", { root: staticFolder }));

app.post("/braille/:lang", async (req, res) => {
  try {
    const file = req.files?.file as UploadedFile;
    const { lang } = req.params;

    if (file === undefined) {
      return res.status(500).send("No uploaded file detected.");
    }

    console.log({ file, lang });

    const pdfText = await readPdf(file.data);

    let brailleText: string;
    if (lang === "hi") {
      let text = "";
      const toConvert: string[] = [];
      for (let i = 0; i < pdfText.length; i += MAX_LENGTH) {
        toConvert.push(pdfText.slice(i, i + MAX_LENGTH));
      }
      text = (await Promise.all(toConvert.map((text) => translate(text, "hi")))).map((result) => result.text).join();
      console.log(text);
      brailleText = text;
    } else if (lang === "en") {
      brailleText = pdfText;
    } else {
      console.error("Unrecognised language", lang);
      return res.status(500).send("Bad Language");
    }

    // TODO Encode

    await writePdf(brailleText, file.name);

    res.send({
      route: `downloads/${file.name}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.get("/downloads/:pdfName", (req, res) => {
  res.download(path.resolve("downloads", req.params.pdfName));
});

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
