import { promises as fs } from 'fs';
import { customAlphabet } from 'nanoid';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const nanoid = customAlphabet(ALPHABET, 10);

class OTPHandler {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  private async _read(): Promise<string[]> {
    try {
      return JSON.parse(await fs.readFile(this.path, { encoding: 'utf-8' }));
    } catch (e) {
      return [];
    }
  }

  private async _write(otps: string[]) {
    await fs.writeFile(this.path, JSON.stringify(otps));
  }

  async generateOTP() {
    const otps = await this._read();

    let otp: string;
    do {
      otp = nanoid();
    } while (otps.includes(otp));

    otps.push(otp);

    await this._write(otps);

    return otp;
  }

  async validateOTP(otp: string) {
    const otps = await this._read();
    const index = otps.indexOf(otp);

    if (index >= 0) {
      otps.splice(index, 1);
      await this._write(otps);
    }

    return index >= 0;
  }
}

export default OTPHandler;
