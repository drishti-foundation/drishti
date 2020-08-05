import { Application as ExpressFeathers } from '@feathersjs/express';

// A mapping of service names to types. Will be extended in service files.
export interface ServiceTypes {}
// The application instance type that will be used everywhere else
export type Application = ExpressFeathers<ServiceTypes>;

declare module 'pdfreader' {
  import { PathLike } from 'fs';

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

  export class PdfReader {
    parseBuffer(buffer: Buffer, callback: (err: Error, item: Item) => void): any;
    parseFileItems(path: PathLike, callback: (err: Error, item: Item) => void): any;
  }
}
