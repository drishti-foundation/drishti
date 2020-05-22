import express from "express";
import * as path from "path";
import fileUpload from "express-fileupload";

const app = express();
const PORT = 5000;

const staticFolder = path.resolve("static");

// Middleware for easy file uploading
app.use(fileUpload());

app.use(express.static("static"));

app.get(["/", "/demo", "/about"], (req, res) => res.sendFile("index.html", { root: staticFolder }));

app.post("/braille/:lang", (req, res) => {
  try {
    const file = req.files?.file;
    const { lang } = req.params;

    if (file === undefined) {
      res.status(500).send("No uploaded file detected.");
    }

    console.log({ file, lang });

    // TODO stuff with file and lang

    res.send({
      route: "downloads/1588170336.3559759.pdf",
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
