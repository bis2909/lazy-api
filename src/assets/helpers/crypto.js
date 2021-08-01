// TODO: install crypto ---> `npm i crypto`
const crypto = require('crypto');
const { secrets } = {authCryptoSecret: 'authCryptoSecret', authCryptoIV: 'authCryptoIV'}; // TODO: should use ENV here. secret: 32 character, IV: 16 character
const algorithm = 'aes-256-gcm';
const authenCryptoSecret = secrets.authCryptoSecret;
const authenIV = secrets.authCryptoIV;

const encrypt = (text, cryptoSecret, iv) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(cryptoSecret), iv);
  let encrypted = cipher.update(text, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([authTag, encrypted]).toString('base64');
};

const decrypt = (text, cryptoSecret, iv) => {
  const bData = Buffer.from(text, 'base64');
  const authTag = bData.slice(0, 16);
  const encryptedText = bData.slice(16);
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(cryptoSecret), iv);
  decipher.setAuthTag(Buffer.from(authTag, 'base64'));
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const authenEncrypt = text => {
  if (!text) { return ""; }
  return encrypt(text, authenCryptoSecret, authenIV);
};

const authenDecrypt = text => {
  if (!text) { return ""; }
  return decrypt(text, authenCryptoSecret, authenIV);
};

module.exports = {
  authenEncrypt,
  authenDecrypt
};
