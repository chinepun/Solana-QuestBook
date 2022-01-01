const key = require('./secret.json');

function randomNumber(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getReturnAmount(){}

function returnPlayerSecretKey(){return key.PLAYER_SECRET_KEY;}
function returnProgramSecretKey(){return key.PROGRAM_SECRET_KEY;}

function totalAmtToBePaid(){}

module.exports =
{
    randomNumber,
    totalAmtToBePaid,
    returnPlayerSecretKey,
    returnProgramSecretKey,
    getReturnAmount
}