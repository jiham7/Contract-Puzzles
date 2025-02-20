const { assert } = require("chai");

describe("Game3", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game3");
    const game = await Game.deploy();
    await game.deployed();

    // three addresses, three balances
    // you'll need to update the mapping to win this stage

    // hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);
    const address = await signer.getAddress();
    console.log(address);
    const signer2 = ethers.provider.getSigner(1);
    const address2 = await signer2.getAddress();
    console.log(address2);
    const signer3 = ethers.provider.getSigner(2);
    const address3 = await signer3.getAddress();
    console.log(address3);
    // to call a contract as a signer you can use contract.connect
    await game.connect(signer).buy({ value: "2" });
    await game.connect(signer2).buy({ value: "3" });
    await game.connect(signer3).buy({ value: "1" });
    // TODO: win expects three arguments
    await game.win(address, address2, address3);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
