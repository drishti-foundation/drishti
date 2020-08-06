import * as authentication from '@feathersjs/authentication';
import onlyAdmin from '../../hooks/onlyAdmin';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt'), onlyAdmin()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
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
