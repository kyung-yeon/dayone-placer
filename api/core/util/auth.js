const crypto = require("crypto-js");

const key = "kd-128";

const encrypt = (data) => {
  const encrypted = crypto.AES.encrypt(JSON.stringify(data), key);
  return encrypted.toString();
};

const decrypt = (data) => {
  try {
    const decrypted = crypto.AES.decrypt(data, key);
    return JSON.parse(decrypted.toString(crypto.enc.Utf8));
  } catch (e) {
    console.error("decrypt error", e);
    throw new Error(e);
  }
};

const generateAccessToken = (principal) => {
  return encrypt(principal);
};

const verifyAccessToken = (accessToken) => {
  return decrypt(accessToken);
};

const generateShaSignature = (value) => {
  return crypto.SHA256(value, key).toString(crypto.enc.Hex);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateShaSignature,
};
