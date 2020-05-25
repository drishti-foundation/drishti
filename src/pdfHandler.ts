import path from "path";
import { PdfReader } from "pdfreader";
import pdf from "html-pdf";

export const readPdf = (buffer: Buffer): Promise<string> => {
  return new Promise((res) => {
    let pdfText = "";

    new PdfReader().parseBuffer(buffer, (err, item) => {
      if (err) {
        console.error(err);
      } else if (!item) {
        res(pdfText);
      } else if (item.text) {
        pdfText += item.text + " ";
      }
    });
  });
};

export const writePdf = (text: string, fileName: string): Promise<void> =>
  new Promise((res) => {
    pdf
      .create(`<h1>Braille</h1><p>${text}</p>`)
      .toFile(path.resolve("downloads", fileName), (err) => {
        if (err) console.error(err);
        res();
      });
  });
