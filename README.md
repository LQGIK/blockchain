LQGIK's Simple Blockchain CryptoCurrency Demo

Requirements:
    crypto-js
    elliptic


Questions:

How is it tamper proof?

    I)  What if I were to change a specific block's transaction amount to benefit myself or another?
            lqgikCoin.chain[1].pendingTransactions[1].amount = 200;

        When the new block is introduced into the system, it will run the method isChainValid()
        isChainValid() creates a hash using the same method as the block was initially made with
        and checks whether the new hash and the old one are the same. Since the amount is used as
        a parameter in creating the hash, the new hash will obviously change and therefore we can
        tell that the hashes aren't the same.

    II) console.log("Is BlockChain valid? " + lqgikCoin.isChainValid());

        This returns false because the hashes don't match.


    III) What if I were to recalculate and change the block's initial hash so that it looks like it matches the new one?
        lqgikCoin.chain[1].hash = lqgikCoin.chain[1].calculateHash();

        isChainValid() would still return false because the chain breaks. The block that comes after the one we modified,
        would point to a hash that doesn't exist anymore.

    IV) What if I were to recalculate all the blocks' hashes so that every hash matches?

        This is where proof-of-work comes in! It statistically takes 10min to make a block with EVERY MINER in the P2P network attempting to create a sufficient hash.
        It will simply take forever to recalculate every block's hash within the time it takes to update the chain.
        Bitcoin has value because of the power and time it takes to make a block.

    V) What if I were to create my own blockchain and upload it?

        Concensus! Everyone in the P2P Network has a copy of the blockchain. When you upload a block, it validates your chain with everyone else's.
        You could only reach concensus with a new chain if 51% of all computers approved / had the same exact chain. In other words, a hacker
        would need to have control over 51% of the network's users in order to successfully upload a new blockchain.



How do pendingTransactions work?
    Whenever a block is made, all transactions are added to it and successfully uploaded into that block.
    It is not necessary to have one transaction per block. If there was one transaction per block, then the
    entire system would be extremely slow as it cannot mine as quick as it takes transactions.
