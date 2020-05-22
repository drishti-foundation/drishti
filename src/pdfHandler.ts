import { PdfReader } from "pdfreader";

export const readPdf = (buffer: Buffer) => {
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

