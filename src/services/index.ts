import path from 'path';

import { Application } from '../declarations';
import OTPHandler from '../otpHandler';
import users from './users/users.service';
import braille from './braille/braille.service';

import adminFunc from './admin-func/admin-func.service';

export default (app: Application) => {
  const otpHandler = new OTPHandler(path.resolve('data', 'otp.json'));

  app.configure(users(otpHandler));
  app.configure(braille());
  app.configure(adminFunc(otpHandler));

  app.get('/downloads/:name', (req, res) => {
    res.download(path.resolve('downloads', req.params.name));
  });
};
