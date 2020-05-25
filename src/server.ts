import express from "express";
import path from "path";
import fileUpload, { UploadedFile } from "express-fileupload";

import { readPdf, writePdf } from "./pdfHandler";
import textToBraille from "./braille";

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
    const file = req.files?.file as UploadedFile;
    const { lang } = req.params;

    if (file === undefined) {
      return res.status(500).send("No uploaded file detected.");
    }

    const pdfText = await readPdf(file.data);

    const brailleText = await textToBraille(pdfText, lang);

    if (brailleText === "Failed") {
      res.status(500).send("Conversion to Braille Failed.");
    }

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
