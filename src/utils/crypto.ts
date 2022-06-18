/* eslint-disable no-param-reassign */
import CryptoJS from 'crypto-js';

export const hashPassword = (original: string): string =>
  CryptoJS.SHA1(original).toString(CryptoJS.enc.Hex);

export const generateHash = (): string => {
  const seed = Date.now().toString();
  return CryptoJS.MD5(seed).toString(CryptoJS.enc.Hex);
};

const shuffleArray = (array: Array<string>) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const generatePassword = (): string => {
  const numberChars = '0123456789';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const allChars = numberChars + upperChars + lowerChars;
  let randPasswordArray = Array(10);
  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray = randPasswordArray.fill(allChars, 3);
  return shuffleArray(
    randPasswordArray.map((x) => x[Math.floor(Math.random() * x.length)])
  ).join('');
};

export const encryptString = (original: string): string =>
  CryptoJS.AES.encrypt(
    original,
    CryptoJS.enc.Utf8.parse(process.env.REACT_APP_AES_SECRET),
    {
      iv: CryptoJS.enc.Utf8.parse(process.env.REACT_APP_AES_IV),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }
  ).toString();

export const decryptString = (encrypted: string): string =>
  CryptoJS.AES.decrypt(
    encrypted,
    CryptoJS.enc.Utf8.parse(process.env.REACT_APP_AES_SECRET),
    {
      iv: CryptoJS.enc.Utf8.parse(process.env.REACT_APP_AES_IV),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }
  ).toString(CryptoJS.enc.Utf8);

export const encryptLocalStorage = (key: string, value: string) => {
  const encrypted = encryptString(value);
  localStorage.setItem(key, encrypted);
};

export const decryptLocalStorage = (key: string): string | null => {
  const v = localStorage.getItem(key);
  if (v) {
    return decryptString(v);
  }
  return null;
};
