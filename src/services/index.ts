import { Application } from '../declarations';
import users from './users/users.service';

import braille from './braille/braille.service';

export default function (app: Application): void {
  app.configure(users);
  app.configure(braille);
}
