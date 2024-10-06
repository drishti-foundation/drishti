"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const nanoid_1 = require("nanoid");
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const nanoid = (0, nanoid_1.customAlphabet)(ALPHABET, 10);
class OTPHandler {
    constructor(path) {
        this.path = path;
    }
    async _read() {
        try {
            return JSON.parse(await fs_1.promises.readFile(this.path, { encoding: 'utf-8' }));
        }
        catch (e) {
            return [];
        }
    }
    async _write(otps) {
        await fs_1.promises.writeFile(this.path, JSON.stringify(otps));
    }
    async generateOTP() {
        const otps = await this._read();
        let otp;
        do {
            otp = nanoid();
        } while (otps.includes(otp));
        otps.push(otp);
        await this._write(otps);
        return otp;
    }
    async validateOTP(otp) {
        const otps = await this._read();
        const index = otps.indexOf(otp);
        if (index >= 0) {
            otps.splice(index, 1);
            await this._write(otps);
        }
        return index >= 0;
    }
}
exports.default = OTPHandler;
