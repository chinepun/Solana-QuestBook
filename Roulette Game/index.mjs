import web3, { Keypair, PublicKey} from '@solana/web3.js';
import  chalk  from 'chalk';
import inquirer  from 'inquirer';
import
{
    getReturnAmount,
    totalAmtToBePaid,
    randomNumber,
    returnPlayerSecretKey,
    returnProgramSecretKey
} from './helper.js';
import
{
    getWalletBalance,
    transferSOL,
    airDropSol
} from './solana.js';
const programGenaratesKeypair = web3.Keypair.generate();
const playerGenaratesKeypair = web3.Keypair.generate();


const programSecretKey =  await returnProgramSecretKey();// 3w5i8wfDZ9MbfrRf2Av17HpdqfqaekFstSxXhvNiKnJY
console.log(`program secret = `, programSecretKey);
const programWalletSeed = programSecretKey.slice(0, 32);
const programKeypair = await web3.Keypair.fromSeed(Uint8Array.from(programWalletSeed));
const programPublicKey = await new web3.PublicKey(programKeypair._keypair.publicKey).toString();

console.log(`Program Public Address = `, programPublicKey);
 
const playerSecretKey = await returnPlayerSecretKey();//  ABW7kPeXpjWgmVnm9VifXULzxMk4YoYndUY3wosmfrhi 
console.log(`player secret = `, playerSecretKey);
const playerWalletSeed = playerSecretKey.slice(0, 32);
const playerKeypair = await web3.Keypair.fromSeed(Uint8Array.from(playerWalletSeed));
const playerPublicKey = await new web3.PublicKey(playerKeypair._keypair.publicKey).toString();

console.log(`Player Public Address = `, playerPublicKey);

console.log(chalk.yellow("-----------------------My first NodeJS application-------------------"));


const connection = new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
//For checking whether the connection is successfully made
//console.log(connection);
const log = console.log;

function solStakeTeminalDesign()
{
    log(chalk.magenta('   _____   ___  _        _____  _         _             '));
    log(chalk.magenta('  /  ___| / _ \\| |      /  ___|| |_ ___ _| | _____  '));
    log(chalk.magenta('  \\____ \\| | | | |      \\____ \\| __/  _` | |/ / _ \\  '));
    log(chalk.magenta('   ____) | |_| | |___    ____) | ||  (_| |   <  __/   '));
    log(chalk.magenta('  |_____/ \\___/|_____|  |_____/ \\__\\___,_|_|\\_\\___|      '));
}

async function RouletteGame()
{

    solStakeTeminalDesign();
    const questions = 
    [
        {
            type : "input",
            name : "Amount",
            message : "What is the Amount you are willing to Stake",    
        },
        {
            type : "input",
            name : "Ratio",
            message : "What is the ratio of your Staking ? "
        }
    ]

    const prompts = await inquirer.prompt(questions);

    const { Amount, Ratio} = prompts;
    const winningPrice = Amount * Ratio;
    log(chalk.green(`You Need to pay ${Amount} Sol to Progress.`));
    log(chalk.greenBright(`You Will Win ${winningPrice} SOL If you Guess the Number Correctly`));

// Do Airddrop so program can have funds to pay the player if The player wins
    const programAirDrop = await airDropSol(2, programPublicKey);

    // Accept Terms to Pay to Play
    const acceptTerms = await inquirer.prompt(
        [
            {
                type: 'confirm',
                name: 'value',
                message: `Do you want to continue?`
            }
        ]
    )
    if (!acceptTerms.value)
    {
        log(chalk.bold("-----Ending Game-------"));
        return;
    }
    
    
    log(chalk.bold.cyanBright(`Transferring ${Amount} Sol to the Game.`));
    const transactionSignature = await transferSOL(playerPublicKey, programPublicKey, Amount, playerKeypair);
    log(chalk.greenBright('Signature of payment for playing the game: ', transactionSignature));
    log(chalk.blueBright("Check https://explorer.solana.com/?cluster=devnet to Confirm"));

    const answer = await randomNumber(1, 5);
    const playGame = await inquirer.prompt(
        [
            {
                type : "input",
                name : "value",
                message : `Guess a random number from 1 to 5 Inclusive : ${answer}`,
                validate(value)
                {
                    if (value >= 1 && value <= 5){return true;}
                    else return "InValid Number. It Must be Between 1 & 5";
                }        
            }
        ]
    )
    if (answer != playGame.value)
    {
        log(chalk.red(`Correct Guess Is ${answer}, Better Luck in yout next round`));
        return;
    }
    log(chalk.green(`Your Guess Is Absolutely Correct. Your Reward Will Be transferred to you Immediately`));

    const winningTxSignature = await transferSOL(programPublicKey, playerPublicKey, winningPrice, programKeypair);
    log(chalk.greenBright('Winning transaction signature: ', winningTxSignature));
    log(chalk.blueBright("Check https://explorer.solana.com/?cluster=devnet to Confirm"));

}  
// Do AirDrop So Player can have enough funds to play
const playerAirDrop = await airDropSol(2, playerPublicKey);


await RouletteGame();



