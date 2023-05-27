// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [buyer, owner, borrower, investor] = await ethers.getSigners()

  // Deploy Real Estate
  const RealEstate = await ethers.getContractFactory('RealEstate')
  const realEstate = await RealEstate.deploy()
  await realEstate.deployed()

  console.log(`Deployed Real Estate Contract at: ${realEstate.address}`)
  console.log(`Minting 3 properties...\n`)

  for (let i = 0; i < 3; i++) {
    const transaction = await realEstate.connect(seller).mint(`https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${i + 1}.json`)
    await transaction.wait()
  }

  // Deploy Ownable
  const Ownable = await ethers.getContractFactory('Ownable')
  const ownable = await Ownable.deploy(
    realEstate.address,
    owner.address,
    borrower.address,
    investor.address
  )
  await ownable.deployed()

  console.log(`Deployed Ownable Contract at: ${ownable.address}`)
  console.log(`Listing 3 properties...\n`)

  for (let i = 0; i < 3; i++) {
    // Approve properties...
    let transaction = await realEstate.connect(owner).approve(ownable.address, i + 1)
    await transaction.wait()
  }

  // Listing properties...
  transaction = await ownable.connect(seller).list(1, buyer.address, tokens(20), tokens(10))
  await transaction.wait()

  transaction = await ownable.connect(owner).list(2, buyer.address, tokens(15), tokens(5))
  await transaction.wait()

  transaction = await ownable.connect(owner).list(3, buyer.address, tokens(10), tokens(5))
  await transaction.wait()

  console.log(`Finished.`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
