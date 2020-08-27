import { NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

import { Application } from '../../declarations';
import OTPHandler from '../../otpHandler';

interface Data {}

interface ServiceOptions {}

type Type = 'otp';

export class AdminFunc implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;
  otpHandler: OTPHandler;

  constructor(options: ServiceOptions = {}, app: Application, otpHandler: OTPHandler) {
    this.options = options;
    this.app = app;
    this.otpHandler = otpHandler;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(type: Type, params?: Params): Promise<Data> {
    if (type === 'otp') {
      const otp = await this.otpHandler.generateOTP();

      return {
        otp,
      };
    } else {
      throw new BadRequest(`Unknown type: ${type}`);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: Params): Promise<Data> {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return { id };
  }
}
