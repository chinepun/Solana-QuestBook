const
{
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");

//Generating a new wallet keypair
const newPair = new Keypair();//newPair INstance holds public key and Secret Key.
console.log(newPair);

// Store Private and Public Key
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();// We store the publicKey in a variable of type string
// secretKey is of type Uint8Array(length == 64)
const secretKey = newPair._keypair.secretKey;// We Repeat the Process for the Secret key

// Creates a connection object that we will use to get the balance
// clusterApiUrl provides us a url for devnet that we pass to our connection object so that we get details of devnet
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
        console.log({amount_in_lamport});

        const balance_before_airdrop = await getWalletBalance(address);
        console.log(`Balance Before Airdrop for Address ${address} = ${balance_before_airdrop} SOL`);

        const tx = await connection.requestAirdrop(publicKey, amount_in_lamport);
        
        const balance_after_airdrop = await getWalletBalance(address);
        console.log(`Balance After Airdrop For Address ${address} = ${balance_after_airdrop} SOL`);
    }
    catch (error)
    {
        console.log(error);
    }
}

async function transferSOL(from, to, transferAmt)
{
    try
    {
        const fromPubkeyVar = new PublicKey(from.publicKey.toString());
        const toPubkeyVar = new PublicKey(to.publicKey.toString());
    // Create an Empty Transaction Object
        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer(
                {
                    fromPubkey : fromPubkeyVar,
                    toPubkey : toPubkeyVar,
                    lamports : transferAmt * LAMPORTS_PER_SOL
                }
            )//SystemProgram.transfer is responsible for transfering funds from one account to another
        );

// Sign Transaction With Secret KEy
        const signature = await web3.sendAndConfirmTransaction(
            connection, //the connection instance
            transaction, //the transaction constant created at the top
            [from] //the wallet instance of all the signers for the transaction
        );
        console.log("Secret Key is ", signature);
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