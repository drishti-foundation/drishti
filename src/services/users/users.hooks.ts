import { HookContext } from '@feathersjs/feathers';
import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { BadRequest } from '@feathersjs/errors';
import { validate, iff } from 'feathers-hooks-common';

import onlyAdmin from '../../hooks/onlyAdmin';

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [authenticate('jwt'), onlyAdmin()],
    get: [authenticate('jwt')],
    create: [
      validate(values => {
        if (!values.password || !values.username) {
          throw new BadRequest('Both a username and password must be given');
        }
        return null;
      }),
      hashPassword('password'),
      ({ params }: HookContext) => {
        if (!params?.query?.otp) {
          // Must have language param
          throw new BadRequest('OTP not found: A OTP must be given as a query');
        }
      },
    ],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
