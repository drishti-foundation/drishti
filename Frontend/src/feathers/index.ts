import feathers from '@feathersjs/client';
import { ServiceMethods } from '@feathersjs/feathers';
import { AuthenticationService } from '@feathersjs/authentication';
import auth from '@feathersjs/authentication-client';
import rest from '@feathersjs/rest-client';
import axios from 'axios';

interface Empty {}

interface ServiceTypes {
  authentication: AuthenticationService;
  'admin-func': ServiceMethods<Empty>;
  braille: ServiceMethods<any>;
  users: ServiceMethods<Credentials>;
}

const client = feathers<ServiceTypes>();

const isDev = window.location.host === 'localhost:1234';

const restClient = isDev ? rest('http://localhost:5000') : rest();

client.configure(auth());
client.configure(restClient.axios(axios));

export default client;
