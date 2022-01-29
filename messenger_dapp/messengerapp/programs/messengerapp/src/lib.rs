use anchor_lang::prelude::*;

declare_id!("8d52dwwujKXFJ8h96oSTJ1Qrpa5yPs7yCEQJcyBwzLm7");

#[program]
pub mod messengerapp
{
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: String) -> ProgramResult
    {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }


    pub fn update(ctx: Context<Update>, data: String) -> ProgramResult
    {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }

}

/*
The init macro is used to create a new account owned by the current program which is our messengerapp
program. Whenever init parameter is used, we must always specify the payer or the account that will be 
paying for creation of the account on the Solana blockchain, along with the space param which is the 
space with which the new account is created.
*/

#[derive(Accounts)]// Includes Multiple Accounts in a Struct
pub struct Initialize<'info>
{
    // https://docs.rs/anchor-lang/0.18.0/anchor_lang/derive.Accounts.html
    #[account(init, payer = user, space = 64 + 64)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Update<'info>
{
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>
}

#[account]
pub struct BaseAccount
{
    pub data: String,
    pub data_list: Vec<String>
}