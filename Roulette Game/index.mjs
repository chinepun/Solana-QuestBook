import web3, { Keypair, PublicKey} from '@solana/web3.js';
import  chalk  from 'chalk';
import inquirer  from 'inquirer';
import
{
    getReturnAmount,
    totalAmtToBePaid,
    randomNumber
} from './helper.js';
import
{
    getWalletBalance,
    transferSOL,
    airDropSol
} from './solana.js';
const programGenaratesKeypair = web3.Keypair.generate();
const playerGenaratesKeypair = web3.Keypair.generate();

// Generate Program And PLayer KEYS here
// In Real Application, use a Secret File and remember to include it in the .gitignore
// We store the publicKey in a variable of type string
const programPublicKey = new web3.PublicKey(programGenaratesKeypair._keypair.publicKey).toString();

// secretKey is of type Uint8Array(length == 64)
const programSecretKey = programGenaratesKeypair._keypair.secretKey;// We Repeat the Process for the Secret key

const playerPublicKey = new web3.PublicKey(playerGenaratesKeypair._keypair.publicKey).toString();// We store the publicKey in a variable of type string
// secretKey is of type Uint8Array(length == 64)
const playerSecretKey = playerGenaratesKeypair._keypair.secretKey;// We Repeat the Process for the Secret key

const programKeypair = programPublicKey;
const playerKeypair = playerPublicKey;



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
    const transactionSignature = await transferSOL(playerPublicKey, programPublicKey, Amount, playerGenaratesKeypair);
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

    const winningTxSignature = await transferSOL(programPublicKey, playerPublicKey, winningPrice, programGenaratesKeypair);
    log(chalk.greenBright('Winning transaction signature: ', winningTxSignature));
    log(chalk.blueBright("Check https://explorer.solana.com/?cluster=devnet to Confirm"));

}  
    // Do AirDrop So Player can have enough funds
    const playerAirDrop = await airDropSol(2, playerPublicKey);
 

    await RouletteGame();



