'use strict';

const crypto = require('crypto');

var encryptString = ((val) => {

const encryptionKey =process.env.NEXT_PUBLIC_ENCRYPTION_KEY; 
const iv = Buffer.alloc(16, 0);
const key = Buffer.from(encryptionKey, 'utf-8');
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

let encrypted = cipher.update(val, 'utf-8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;

});

var decryptString = ((encrypted) => {
const encryptionKey =process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
const iv = Buffer.alloc(16, 0);
const key = Buffer.from(encryptionKey, 'utf-8');
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
let decrypted = decipher.update(encrypted, 'base64', 'utf-8');
decrypted += decipher.final('utf-8');
return decrypted;
});

module.exports = { encryptString, decryptString };
