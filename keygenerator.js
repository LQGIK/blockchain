/* Imports elliptic library function ec */
const EC = require('elliptic').ec;

/* Allow us to access the specific function 'secp256k1', this is used for bitcoin */
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log('\n Public Key: ', publicKey);
console.log('\n Private Key: ', privateKey);
