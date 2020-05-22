declare module "pdfreader" {
  import { PathLike } from "fs";

  interface Item {
    x: number;
    y: number;
    w: number;
    sw: number;
    clr: number;
    A: string;
    R: { T: string; S: number; TS: any[] }[];
    text: string;
  }

  class PdfReader {
    parseBuffer(
      buffer: Buffer,
      callback: (err: Error, item: Item) => void
    ): any;
    parseFileItems(
      path: PathLike,
      callback: (err: Error, item: Item) => void
    ): any;
  }
}
