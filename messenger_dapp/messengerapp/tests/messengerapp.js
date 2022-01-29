const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe("Testing our messengerapp", function(){
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Messengerapp;

  it("An Account Is Initialized", async function(){
      const baseAccount = anchor.web3.Keypair.generate();
      
      await program.rpc.initialize("First Message", {
        accounts:
        {        
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId
        },
        signers: [baseAccount]
      });

      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      console.log("Data: ", account.data);

      assert.ok(account.data === "First Message");
     _baseAccount = baseAccount;// Save the state of baseAccount in _baseAccount to check in other tests

  } )

  it("Updating Account State", async function(){
    const baseAccount = _baseAccount;

    await program.rpc.update("My Second Message", {
      accounts:
      {
          baseAccount: baseAccount.publicKey
      }
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Updates Data to => ", account.data);
    assert.ok(account.data, "My Second Message");

    console.log("All account data: ", account);
    console.log("All data: ", account.dataList);
    assert.ok(account.dataList.length === 2)
  });

} )

