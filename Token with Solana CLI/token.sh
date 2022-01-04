#! /bin/bash

#install spl-token-cli
#cargo install spl-token-cli

sol_address=$(solana address)
echo "Your Solana Address Is $sol_address \n"

#Do Airdrop
solana airdrop 1

# Create Token with Spl(make sure solana-test-validator is running)
spl-token create-token --url localhost

#store token address in variable token_address
echo "Enter your Token Address from the Output Above"
read token_address
echo "Your Token Address is $token_address"

#Create An Account that can hold our newly Created Token
spl-token create-account $token_address --url localhost

#Store Newly Created Account In variable account_address
echo "Enter your Account Address from the Output Above"
read account_address
echo "Your Account Address is $account_address"

#Check Token Balance
echo "Checking Token Balance"
spl-token balance $token_address

#Let's Mint Money From Nowhere
echo "Input the Amount of Tokens you want to mint"
read amount_to_mint
spl-token mint $token_address $amount_to_mint --url localhost

#Check Token Balance
echo "Checking Token Balance"
spl-token balance $token_address

#Check Token Max Supply
echo "Checking Token Max Supply"
spl-token supply $token_address

#Disable Minting to Creater of Token
echo "You can no longer Mint Tokens from Nowhere"
spl-token authorize $token_address mint --disable --url localhost

#Try Minting New Tokens(we expect it to fail)
#spl-token mint $token_address $amount_to_mint --url localhost

#Burn Some Tokens
echo "Input the Amount of Tokens you want to burn"
read amount_to_burn
spl-token burn $account_address $amount_to_burn --url localhost

#Confirm Tokens Were Burnt
echo "Checking Total Supply of Tokens"
spl-token supply $token_address --url localhost