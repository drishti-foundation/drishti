import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';

interface Id {
  id: string;
}

interface Data {
  username: string;
  password: string;
}

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: Data, params?: Params): Promise<Data & Id> {
    return super.create(data, params);
  }
}
