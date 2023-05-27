require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/RHdGs9ktuyeQf6ZsFoDsjKpm8uIus3Yr',
      accounts: ['0x81b324d5a7082842f2d09b00515f2680c0b66749d9b13adac3caea89c2def3b9']
    }
  }
}
