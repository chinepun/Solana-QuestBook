const
{
    Connection,
    PublicKey,
    clusterApiUrl,
    sendAndConfirmTransaction,
    Keypair,
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    Account,
} = require("@solana/web3.js");


const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Get The Wallet's Balance
async function getWalletBalance(address) 
{
    try
    {
        const publicKey = new PublicKey(address);

        const balance = await connection.getBalance(publicKey);
        return balance;        
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

// Airdrop Function(In terms of LAMPORTS)
async function airDropSol(amount_in_sol, address)
{
    try
    {
        const publicKey = new PublicKey(address);
        const amount_in_lamport = amount_in_sol * LAMPORTS_PER_SOL;

        const balance_before_airdrop = await getWalletBalance(address);

        const tx = await connection.requestAirdrop(publicKey, amount_in_lamport);
        await connection.confirmTransaction(tx);


        let balance_after_airdrop = await getWalletBalance(address);
        balance_after_airdrop /= LAMPORTS_PER_SOL;

    }
    catch (error)
    {
        console.log(error);
    }
}

async function transferSOL(from, to, transferAmt, keypairOfSender)
{
    try
    {
        const fromPubkeyVar = new PublicKey(from);
        const toPubkeyVar = new PublicKey(to);
    // Create an Empty Transaction Object
        const transaction = new Transaction().add(
            SystemProgram.transfer(
                {
                    fromPubkey : fromPubkeyVar,
                    toPubkey : toPubkeyVar,
                    lamports : transferAmt * LAMPORTS_PER_SOL
                }
            )//SystemProgram.transfer is responsible for transfering funds from one account to another
        );

        if (transaction) {console.log("Transaction Completed Succesfully");}
        else {console.log(("Transaction failed successfully"));}

    // Sign Transaction With Secret KEy
        const signature = await sendAndConfirmTransaction(
            connection, //the connection instance
            transaction, //the transaction constant created at the top
            [keypairOfSender] //the wallet instance of all the signers for the transaction
        );

        return signature;
    }
    catch (error)
    {
        console.log(error);
        return null;
    }
}

module.exports = 
{
    getWalletBalance,
    airDropSol,
    transferSOL,
    connection    
}