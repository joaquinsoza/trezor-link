import CryptoJS from "crypto-js";

// const deriveKey = (password: string, salt: string) => {
//   return CryptoJS.PBKDF2(password, salt, {
//     keySize: 256 / 32,
//     iterations: 1000,
//   });
// };

export const encryptData = (data: string, password: string) => {
  // const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
  // const key = deriveKey(password, salt);

  const ciphertext = CryptoJS.AES.encrypt(data, password).toString();
  return ciphertext;
};

export const decryptData = (
  ciphertext: string,
  password: string
  // salt: string
) => {
  // const key = deriveKey(password, salt);
  const bytes = CryptoJS.AES.decrypt(ciphertext, password);
  return bytes.toString(CryptoJS.enc.Utf8);
};
