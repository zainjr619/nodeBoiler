/* eslint-disable class-methods-use-this */
const crypto = require('crypto');
const config = require('./config');

class Utils {
  static encyptPassword(password) {
    const iterations = 100;
    const keylen = 24;

    const derivedKey = crypto.pbkdf2Sync(
      password,
      config.passwordSalt,
      iterations,
      keylen,
      'sha512',
    );
    const pw = Buffer.from(derivedKey, 'binary').toString('hex');

    return pw;
  }

  static replaceError(errKey, errValue) {
    if (errValue instanceof Error) {
      const error = {};
      let keys;
      // get own property name will help in traversing inherited properties
      keys = Object.getOwnPropertyNames(errValue);
      if (keys) {
        for (let i = 0; i < keys.length; i += 1) {
          error[keys[i]] = errValue[keys[i]];
        }
      }
      // free mem-leak
      keys = null;
      return error;
    }

    return errValue;
  }

  static generateRandomNumbers(n) {
    const add = 1;
    let max = 12 - add;
    if (n > max) {
      return this.generate(max) + this.generate(n - max);
    }
    max = 10 ** (n + add);
    const min = max / 10;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return (`${number}`).substring(add);
  }
}
module.exports = Utils;
