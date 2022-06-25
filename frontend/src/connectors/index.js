import { InjectedConnector } from '@web3-react/injected-connector'

export const SUPPORTED_CHAINS = [
    1, // mainnet
    3, // ropsten
    4, // rinkeby
    5, // goerli
    42, // kovan
    137, // matic
    31337, // hardhat
    80001, // matic testnet
    // 100, // xdai
    // 42161, // arbitrum
];

const MetaMask = new InjectedConnector({
    supportedChainIds: SUPPORTED_CHAINS,
});

// activate(MetaMask)

export const connectors = { MetaMask }