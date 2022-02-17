const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();
    
    const threshold = "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf";
    var notFound = true;
    var addressFound = null;
    while(notFound) {
      let signer = ethers.Wallet.createRandom().connect(ethers.provider);
      const address = await signer.getAddress();
      console.log("address: " + address);
      if(address.substring(0,4) == "0x00") {
        console.log("here");
        await ethers.provider.send("hardhat_setBalance", [address, "0xffffffffffffffffffff"]);
        await game.connect(signer).win();
        notFound = false;
        addressFound = address;
      }
    }
    
    // good luck

    // await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
