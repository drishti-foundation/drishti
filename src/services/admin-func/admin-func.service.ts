// Initializes the `admin-func` service on path `/admin-func`
import { ServiceAddons } from '@feathersjs/feathers';

import { Application } from '../../declarations';
import OTPHandler from '../../otpHandler';
import { AdminFunc } from './admin-func.class';
import hooks from './admin-func.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'admin-func': AdminFunc & ServiceAddons<any>;
  }
}

export default (otpHandler: OTPHandler) => (app: Application) => {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/admin-func', new AdminFunc(options, app, otpHandler));

  // Get our initialized service so that we can register hooks
  const service = app.service('admin-func');

  service.hooks(hooks);
};
