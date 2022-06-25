export const CHAIN_ID = {
    MAINNET: 1,
    RINKEBY : 4,
    GOERLI: 5,
    TESTNET : 31337,
    POLYGON: 137,
    MUMBAI: 80001,
};

export const GREETER_CHAR_LIMIT = 280;
export const GREETING_PAGE_SIZE = 4;
export const AUCTION_PAGE_SIZE = 7;
export const BID_PAGE_SIZE = 5;

export const CACHED_WEB3_CONNECTOR = 'CACHED_WEB3_CONNECTOR';
export const WEB3_CONNECTORS = {
    METAMASK: 'METAMASK'
};


export const DEFAULT_CHAIN_ID = process.env.NEXT_PUBLIC_DEFUALT_CHAIN_ID;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const BENEFICIARY_ACCOUNT = '0x93016855B557c151d1BdDd21FE07EffC18BB445B'
export const MATIC_CONTRACT_ADDRESS = '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0';

export const IPFS_GATEWAY = 'https://gateway.moralisipfs.com/ipfs';

export const CHAIN_PARAMS = {
    [CHAIN_ID.POLYGON]: {
        chainId: '0x89',
        chainName: 'Matic(Polygon) Mainnet',
        nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: [
            'https://rpc-mainnet.matic.network',
            'https://matic-mainnet.chainstacklabs.com',
            'https://rpc-mainnet.maticvigil.com',
            'https://rpc-mainnet.matic.quiknode.pro',
            'https://matic-mainnet-full-rpc.bwarelabs.com',
        ],
        blockExplorerUrls: [
            'https://polygonscan.com',
            'https://explorer-mainnet.maticvigil.com',
        ],
        gasStations: [
            'https://polygonscan.com/gastracker',
            'https://gasstation-mainnet.matic.network',
        ],
        faucets: ['https://matic.supply'],
    },
    [CHAIN_ID.MUMBAI]: {
        chainId: '0x13881',
        chainName: 'Mumbai-Testnet',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: [
            'https://nd-622-214-640.p2pify.com/e5981fb9579526eefd3126c763e63655',
            'https://rpc-mumbai.matic.today',
            'https://rpc-mumbai.maticvigil.com',
            'https://matic-testnet-archive-rpc.bwarelabs.com',
        ],
        blockExplorerUrls: [
            'https://mumbai.polygonscan.com',
            'https://mumbai-explorer.matic.today',
            'https://backup-mumbai-explorer.matic.today',
        ],
        gasStations: ['https://gasstation-mumbai.matic.today'],
        faucets: ['https://faucet.polygon.technology'],
    },
    [CHAIN_ID.GOERLI]: {
        chainId: 5,
        chainName: 'Goerli',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: [],
        blockExplorerUrls: [
            'https://goerli.etherscan.io/'
        ],
        gasStations: [],
        faucets: [],
    },
}

export const CHAIN_NAMES = {
    [CHAIN_ID.POLYGON]: 'Polygon',
    [CHAIN_ID.MUMBAI]: 'Mumbai'
}

export const GREETING_INPUT_VIEW = {
    FORM_FILL: 'FORM_FILL',
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED'
}

export const CARD = {
    height: 300,
    width: 300
}

export const EXPLORER_NETWORKS = [
    'eth'
]

export const DEFAULT_NFT_CONTRACTS = [
    '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'
]

export const AUCTION_PERIOD = {
    OVER: 'OVER',
    COMING: 'COMING',
    LIVE: 'LIVE'
}