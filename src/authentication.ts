import { ServiceAddons } from '@feathersjs/feathers';
import {
  AuthenticationService,
  JWTStrategy,
  AuthenticationBaseStrategy,
} from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

declare module '@feathersjs/feathers' {
  interface Params {
    anonymous?: boolean;
  }
}

class AnonymousStrategy extends AuthenticationBaseStrategy {
  async authenticate() {
    return {
      anonymous: true,
    };
  }
}

export default (app: Application) => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('anonymous', new AnonymousStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
