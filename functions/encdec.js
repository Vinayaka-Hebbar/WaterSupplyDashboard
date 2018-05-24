const crypto = require('crypto');
const iv = '@@@@&&&&####$$$$';

function EncDec() {

}

/**
 *
 * @param input {string}
 * @param key
 * @returns {!string|String}
 */
EncDec.prototype.encrypt = function (input, key) {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(input, 'binary', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};

EncDec.prototype.decrypt = function (crypt, key) {
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(crypt, 'base64', 'binary');
  decrypted += decipher.final('binary');
  return decrypted;
};

EncDec.prototype.array2String = function (array) {
  const findMe = 'REFUND';
  const findMePipe = '|';
  let paramStr = "";
  let flag = 1;
  const tempKeys = Object.keys(array);
  tempKeys.sort();
  for (let i = 0; i < tempKeys.length; i++) {
    const key = tempKeys[i];
    const value = array[key];
    const pos = value.indexOf(findMe);
    const posPipe = value.indexOf(findMePipe);
    if (pos !== -1 || posPipe !== -1) {
      continue;
    }
    if (flag === 1) {
      paramStr += this.checkStringEmpty(value);
      flag = 0;
    } else {
      paramStr += '|' + this.checkStringEmpty(value);
    }
  }
  return paramStr;
};

/**
 *
 * @param length {int}
 * @returns {string}
 */
EncDec.prototype.generateSalt = function (length) {
  return crypto.randomBytes((length * 3.0) / 4.0).toString('base64');
};

EncDec.prototype.checkStringEmpty = function (value) {
  if (value)
    return value;
  return '';
};

/**
 *
 * @param array
 * @param key
 * @returns {Promise<string>}
 */
EncDec.prototype.getChecksumFromArray = function (array, key) {
  const str = this.array2String(array);
  return new Promise((resolve, reject) => {
    const salt = this.generateSalt(4);
    const finalStr = str + "|" + salt;
    const hash = crypto.createHash('sha256').update(finalStr).digest('hex');
    const hashString = hash + salt;
    const encrypt = this.encrypt(hashString, key);
    resolve(encrypt);
  });
};

EncDec.prototype.handleParams = function (param) {
  const findMe = 'REFUND';
  const findMePipe = '|';
  const paramList = [];
  for (const key in param) {
    const value = param[key].toString();
    const pos = value.indexOf(findMe);
    const posPipe = value.indexOf(findMePipe);
    if (pos === -1 || posPipe === -1) {
      paramList[key] = value;
    }
  }
  return paramList;
};

module.exports = EncDec;
