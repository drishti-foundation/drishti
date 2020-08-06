import { Id, NullableId, Paginated, Params, ServiceMethods, Query } from '@feathersjs/feathers';
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

interface BrailleQuery extends Query {
  lang: 'en' | 'hi';
}

interface BrailleParams extends Params {
  file: Express.Multer.File;
  query?: BrailleQuery;
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
    params: BrailleParams
  ): Promise<DownloadLocation | DownloadLocation[]> {
    if (Array.isArray(data)) {
      return Promise.all(
        data.map(current => this.create(current, params)) as Promise<DownloadLocation>[]
      );
    }

    const { file } = params;
    const lang = params.query?.lang;

    let pdfText = await pdf.read(file.buffer);

    let brailleText = '';

    if (brailleText === 'Failed') {
      throw new Error('Conversion to Braille Failed.');
    }

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

    await pdf.write(brailleText, file.originalname);

    return {
      route: `downloads/${file.originalname}`,
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
