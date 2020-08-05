import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { NotImplemented } from '@feathersjs/errors';

import { Application } from '../../declarations';
import translate from './helpers/translate';
import * as pdf from './helpers/pdf';
import hinToBraille from './helpers/hin';
import engToBraille from './helpers/eng';

const MAX_LENGTH = 2000;

interface Data {}

interface ServiceOptions {}

interface DownloadLocation {
  route: string;
}

declare module '@feathersjs/feathers' {
  interface Params {
    file: Express.Multer.File;
  }
  interface Query {
    lang: 'en' | 'hi';
  }
}

export class Braille implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async create(
    data: Data | Data[],
    params: Params
  ): Promise<DownloadLocation | DownloadLocation[]> {
    if (Array.isArray(data)) {
      return Promise.all(
        data.map(current => this.create(current, params)) as Promise<DownloadLocation>[]
      );
    }

    const { file } = params;
    const lang = params.query?.lang;

    let pdfText = await pdf.read(file.buffer);

    // const brailleText = await textToBraille(pdfText, lang);
    let brailleText = '';

    if (brailleText === 'Failed') {
      throw new Error('Conversion to Braille Failed.');
    }

    await pdf.write(brailleText, file.filename);

    if (lang === 'hi') {
      const toConvert: string[] = [];
      for (let i = 0; i < pdfText.length; i += MAX_LENGTH) {
        toConvert.push(pdfText.slice(i, i + MAX_LENGTH));
      }
      pdfText = (await Promise.all(toConvert.map(slice => translate(slice)))).join(' ');
      brailleText = hinToBraille(pdfText);
    } else if (lang === 'en') {
      brailleText = engToBraille(pdfText);
    }

    return {
      route: `downloads/${file.filename}`,
    };
  }

  find(params?: Params | undefined): Promise<Data | Data[] | Paginated<Data>> {
    throw new NotImplemented('Method not implemented.');
  }
  get(id: Id, params?: Params | undefined): Promise<Data> {
    throw new NotImplemented('Method not implemented.');
  }
  update(id: NullableId, data: Data, params?: Params | undefined): Promise<Data | Data[]> {
    throw new NotImplemented('Method not implemented.');
  }
  patch(id: NullableId, data: Partial<Data>, params?: Params | undefined): Promise<Data | Data[]> {
    throw new NotImplemented('Method not implemented.');
  }
  remove(id: NullableId, params?: Params | undefined): Promise<Data | Data[]> {
    throw new NotImplemented('Method not implemented.');
  }
}
