import feathers from '@feathersjs/client';
import auth from '@feathersjs/authentication-client';
import rest from '@feathersjs/rest-client';
import { ServiceMethods } from '@feathersjs/feathers';
import { AuthenticationService } from '@feathersjs/authentication';

export interface ServiceTypes {
  authentication: AuthenticationService;
  'admin-func': ServiceMethods<{}>;
  braille: ServiceMethods<any>;
  users: ServiceMethods<Credentials>;
}

const client = feathers<ServiceTypes>();

// @ts-ignore
const isProd = !window.webpackHotUpdate;

const restClient = isProd ? rest() : rest('http://localhost:5000');

client.configure(auth());
client.configure(restClient.fetch(fetch));

export default client;
