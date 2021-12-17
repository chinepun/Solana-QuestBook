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

// Get The Wallet's Balance
const getWalletBalance = async () => 
{
// This Function uses Connection Class to get Balance
    try
    {
        // Creates a connection object that we will use to get the balance
        // clusterApiUrl provides us a url for devnet that we pass to our connection object so that we get details of devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        const myWallet = await Keypair.fromSecretKey(secretKey);

        const walletBalance = await connection.getBalance( new PublicKey(myWallet.publicKey) );
        console.log(`Wallet Balance = ${walletBalance}`);
        console.log(`=> For Wallet Address ${publicKey}`);
        console.log(`   Wallet balance(Lamport Per Sol): ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    }
    catch(err)
    {
        console.log(err);
    }
}

// Airdrop Function(In terms of LAMPORTS)
const airDropSol = async () =>
{
    try
    {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        console.log('---- Airdropping 5 SOL ----');
        const fromAirDropSignature =  await connection.requestAirdrop
        (
            new PublicKey(walletKeyPair.publicKey),
            5 * LAMPORTS_PER_SOL// Max of 5 SOL FOR airdrop
        )
        await connection.confirmTransaction(fromAirDropSignature);
    }
    catch (error)
    {
        console.log(error);
    }
}

// Test Functions
const driverFunction = async () =>
{
// Checks Wallet Balance Before and After AirDrop
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();