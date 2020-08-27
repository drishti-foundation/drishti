// Initializes the `braille` service on path `/braille`
import { ServiceAddons } from '@feathersjs/feathers';
import multer from 'multer';

import { Application } from '../../declarations';
import { Braille } from './braille.class';
import hooks from './braille.hooks';

const multerMultipart = multer();

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    braille: Braille & ServiceAddons<any>;
  }
}

export default () => (app: Application) => {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    '/braille',
    multerMultipart.single('file'),
    (req, _, next) => {
      if (req.feathers) {
        req.feathers.file = req.file;
      } else {
        req.feathers = {
          file: req.file,
        };
      }
      next();
    },
    new Braille(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('braille');

  service.hooks(hooks);
};
