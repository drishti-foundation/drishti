import { Params } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { NotAuthenticated } from '@feathersjs/errors';

import { Application } from '../../declarations';
import OTPHandler from '../../otpHandler';

interface Id {
  id: string;
}

interface Data {
  username: string;
  password: string;
}

export class Users extends Service {
  otpHandler: OTPHandler;

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application, otpHandler: OTPHandler) {
    super(options);
    this.otpHandler = otpHandler;
  }

  async create(data: Data, params?: Params): Promise<Data & Id> {
    if (await this.otpHandler.validateOTP(params?.query?.otp)) {
      return super.create(data, params);
    }

    throw new NotAuthenticated('Invalid OTP: A valid OTP must be provided');
  }
}
