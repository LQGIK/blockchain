const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }
    
    mineBlock(difficulty){

        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();

        }

        console.log("BLOCK MINED: " + this.hash);

    }

}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    
    createGenesisBlock(){
        return new Block("2/25/2020", "Genesis Block", "0")
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];

    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;
        
        for (const block of this.chain){
            for (const trans of block.transactions){
                if (trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if (trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }


    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            /* If the parameters are the same, the SHA256 will return the same hash 
               If someone tampers with the information, the new hash changes because the parameters are different than from the previous. */
            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

        }

        return true;

    }

}

let lqgikCoin = new Blockchain();
/* In reality address1 and address2 are the public keys of someone's wallet */
/* Submitted transactions */
lqgikCoin.createTransaction(new Transaction('address1', 'address2', 100));
lqgikCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
lqgikCoin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is', lqgikCoin.getBalanceOfAddress('xaviers-address'));

console.log('\n Starting the miner...');
lqgikCoin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is', lqgikCoin.getBalanceOfAddress('xaviers-address'));

/*console.log("Mining block 2...");
lqgikCoin.addBlock(new Block(2, "2/25/2020", { amount: 10 }));*/

/* Print Block
console.log(JSON.stringify(lqgikCoin, null, 4));*/

/* Demonstrates how it is tamper-proof 
lqgikCoin.chain[1].transactions = { amount: 100 };
lqgikCoin.chain[1].hash = lqgikCoin.chain[1].calculateHash();
console.log("Is BlockChain valid? " + lqgikCoin.isChainValid());
*/

