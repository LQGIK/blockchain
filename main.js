const {Blockchain, Transaction} = require('./blockchain');


/* Creates Blockchain */
let lqgikCoin = new Blockchain();
/* In reality address1 and address2 are the public keys of someone's wallet */
/* Submitted transactions. One block can contain and submit multiple transactions */
lqgikCoin.createTransaction(new Transaction('address1', 'address2', 100));
lqgikCoin.createTransaction(new Transaction('address2', 'address1', 50));

/* Xavier inputs his address to recieve the reward for mining/creating a block that will take care of all the current transactions. */
console.log('\n Starting the miner...');
lqgikCoin.minePendingTransactions('xaviers-address');

/* Now his reward is a new transaction in pendingTransactions so he does not actually recieve anything until someone mines his and others new transactions */
console.log('\n Starting the miner...');
lqgikCoin.minePendingTransactions('address1');

console.log('\nBalance of xavier is', lqgikCoin.getBalanceOfAddress('xaviers-address'));


/* Print Blockchain
console.log(JSON.stringify(lqgikCoin, null, 4));*/
