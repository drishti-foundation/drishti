import path from 'path';
import pdf from 'html-pdf';
import textract from 'textract';

export const read = (buffer: Buffer): Promise<string> =>
  new Promise((res, rej) =>
    textract.fromBufferWithMime('application/pdf', buffer, (err: any, text: string) => {
      if (err) rej(err);
      res(text);
    })
  );

export const write = (text: string, fileName: string): Promise<void> =>
  new Promise((res, rej) => {
    let newline_text = "";
    for (let i = 0; i < text.length; i += 50) {
        newline_text += text.slice(i, i + 50) + '<br>';
    }
    pdf
      .create(`<h1>Braille</h1><p>${newline_text}</p>`)
      .toFile(path.resolve('downloads', fileName), (err: any) => {
        if (err) rej(err);
        res();
      });
  });
