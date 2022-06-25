require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

// If you are using MetaMask, be sure to change the chainId to 1337

const ALCHEMY_RINKEBY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_RINKEBY_KEY;
const ALCHEMY_GOERLI_KEY = process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_KEY;
const MUMBAI_PRIVATE_KEY = process.env.NEXT_PUBLIC_MUMBAI_PRIVATE_KEY;
const RINKEBY_PRIVATE_KEY = process.env.NEXT_PUBLIC_RINKEBY_PRIVATE_KEY;
const GOERLI_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOERLI_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const ALCHEMY_MUMBAI_KEY = process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.7.3",
      },
      {
        version: "0.8.9"
      }
    ]
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_MUMBAI_KEY}`,
      accounts: [MUMBAI_PRIVATE_KEY]
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_RINKEBY_KEY}`,
      accounts: [RINKEBY_PRIVATE_KEY]
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
