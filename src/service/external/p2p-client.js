const {  config } = require('../../common');
const {  ERROR_CODES } = require('../../constant');
const { CustomError } = require('../../utils');
const Encryption = require('../../common/encryption');


class P2PClient{
static async validatePrivateKey(headers, userId) {
    
    if (!headers || !headers.token) {
      throw new CustomError(ERROR_CODES.AUTH_TOKEN_EXPIRED);
    }
    const stringDecrypted = Encryption.decrypt(headers.token, config.internalCommunicationKey);
    const decrypted = JSON.parse(stringDecrypted);
    
    if (+decrypted.userId !== +userId) {
      throw new CustomError(ERROR_CODES.AUTH_TOKEN_EXPIRED);
    }

    return true;
  }
}

module.exports = P2PClient;