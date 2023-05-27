 import('path/to/truffle-config.js').then((config) => {
    require('dotenv').config();
 });

 const mnemonic = process.env["mnemonic"];
 const sepoliaProjectId = process.env["sepoliaProjectId"];

const HDWalletProvider = require('@truffle/hdwallet-provider');
module.exports = {
  contract_build_directory: "./src/contracts",
  networks: {
    development: {
      host: "127.0.0.1:",  //Localhost (default: none)
      port: 7545,         //Standard Ethereum port (default:none)
      network_id: "*", // Match any network id
      gas: 5000000
    },
    sepolia: {
      networkCheckTimeout: 10000,
       provider: () => new HDWalletProvider(mnemonic, 'https://eth-sepolia.g.alchemy.com/v2/${sepoliaProjectId}'),
      network_id:11155111,   //sepolia`s id mainnet id 1, 45,/       confirmations: 2,   //# of confirmatios to wait between deployments.(default: 0)
       timeoutBlocks:200,  //# of blocks before a deployment times out (minimum/default: 50)
     }

    
   },
   compilers: {
     solc: {
      version: "0.8.13",
       settings: {
         optimizer: {
           enabled: true, // Default: false
           runs: 200      // Default: 200
         },
       }
     }
       }
};
