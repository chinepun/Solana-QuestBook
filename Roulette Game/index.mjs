import web3 from '@solana/web3.js';
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

console.log("My first NodeJS application");


const connection = new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
//For checking whether the connection is successfully made
//console.log(connection);
const log = console.log;
log(chalk.red("Chinepunnnnnnnnnnnnnnn"));
log(chalk.magenta("Dami Is Really Cool"));

log(chalk.bgBlue("Blue Background babyyyyy"));
log(chalk.bgGray("Gray Background now"));

log(chalk.bold("I am Bold"));
log(chalk.underline("Hmmmmmmm"));

log(chalk.yellow.bgGreen.underline.bold("Wowwwwwwwwwwww"));
log(chalk.green('   _____   ___  _        _____  _         _             '));
log(chalk.green('  /  ___| / _ \\| |      /  ___|| |_ ___ _| | _____  '));
log(chalk.green('  \\____ \\| | | | |      \\____ \\| __/  _` | |/ / _ \\  '));
log(chalk.green('   ____) | |_| | |___    ____) | ||  (_| |   <  __/   '));
log(chalk.green('  |_____/ \\___/|_____|  |_____/ \\__\\___,_|_|\\_\\___|      '));
// inquirer.prompt
// ([
//     // Your questions in here
//     {
//         type : 'input',
//         name : 'input_type',
//         message : 'what is your name',
//         default : 'chineeeee'
//     },
//     {
//         type : 'list',
//         name : 'list_question',
//         message : 'what programming language do u like',
//         choices : ['Js', 'Python', 'C++', "Java"],
//         default : 'C++'
//     },
//     {
//         type : 'checkbox',
//         name : 'checkbox_question',
//         message : 'what programming language do u like',
//         choices : ['Js', 'Python', 'C++', "Java"],
//         default : 'C++'
//     }
// ]).then(
//     answers => {
//         console.log(answers);
//         // Use user feedback
//     });
// ).catch(error => {
//     if (error.isTytError){
//         // Prompt could not be rendered to the cutrent enviroment
//     } else {
//         //Something else went wrong
//     }
// }
// Generate Wallet
const userWallet = web3.Keypair.generate();

console.log(userWallet);



