import { HookContext } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import { iff, disallow } from 'feathers-hooks-common';
import { Forbidden, BadRequest } from '@feathersjs/errors';
import allowAnonymous from '../../hooks/allowAnonymous';

const { authenticate } = authentication.hooks;

const SUPPORTED_LANGS = new Set(['en', 'hi']);

export default {
  before: {
    all: [
      allowAnonymous(),
      authenticate('jwt', 'anonymous'),
      (context: HookContext) => {
        const { params } = context;

        if (!params?.query?.lang) {
          // Must have language param
          throw new BadRequest('Language not found: A language must be given as a query');
        } else if (!SUPPORTED_LANGS.has(params.query.lang)) {
          // Must have correct language
          throw new BadRequest(`Unsupported language`, {
            languageGiven: params?.query?.lang,
            supportedLanguages: Array.from(SUPPORTED_LANGS),
          });
        }

        return context;
      },
      iff(
        context => context.params.anonymous === true,
        context => {
          const { query } = context.params;

          if (query?.lang === 'hi') {
            throw new Forbidden('hi only supported for account holders');
          }
          return context;
        }
      ),
    ],
    find: [disallow()],
    get: [disallow()],
    create: [],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()],
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
