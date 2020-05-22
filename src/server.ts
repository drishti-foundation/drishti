import express from "express";
import * as path from "path";
import fileUpload, { UploadedFile } from "express-fileupload";
import { readPdf } from "./pdfHandler";

const app = express();
const PORT = 5000;

const staticFolder = path.resolve("static");

// Middleware for easy file uploading
app.use(fileUpload());

app.use(express.static("static"));

app.get(["/", "/demo", "/about"], (req, res) =>
  res.sendFile("index.html", { root: staticFolder })
);

app.post("/braille/:lang", async (req, res) => {
  try {
    let file = req.files?.file as UploadedFile;
    const { lang } = req.params;

    if (file === undefined) {
      res.status(500).send("No uploaded file detected.");
      return;
    }

    console.log({ file, lang });

    const pdfText = await readPdf(file.data);

    console.log(pdfText);
    // TODO Translate

    // TODO Encode

    // TODO write braille to PDF

    res.send({
      route: "downloads/1588170336.3559759.pdf", // TODO send new file name
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
