// We use nanoid v3 (CommonJS compatible) to generate a base62 string
const { customAlphabet } = require('nanoid');

// Standard Base62 Alphabet (A-Z, a-z, 0-9)
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const generateShortId = customAlphabet(alphabet, 7); // 7 characters long

module.exports = { generateShortId };