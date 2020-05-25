import path from "path";
import pdf from "html-pdf";
import textract from "textract";

export const readPdf = (buffer: Buffer): Promise<string> =>
  new Promise((res) =>
    textract.fromBufferWithMime("application/pdf", buffer, (err, text) => {
      if (err) console.error(err);
      res(text);
    })
  );

export const writePdf = (text: string, fileName: string): Promise<void> =>
  new Promise((res) => {
    pdf
      .create(`<h1>Braille</h1><p>${text}</p>`)
      .toFile(path.resolve("downloads", fileName), (err) => {
        if (err) console.error(err);
        res();
      });
  });
