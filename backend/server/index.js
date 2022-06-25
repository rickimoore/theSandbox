const express = require("express");

const PORT = process.env.PORT || 3001;

/* import moralis */
const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = "https://xbsoskbphjaq.usemoralis.com:2053/server";
const appId = process.env.MORALIS_APP_ID;
const masterKey = process.env.MORALIS_MASTER_KEY;

const app = express();

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.get("/price/:address/:amount", async (req, res) => {
    await Moralis.start({ serverUrl, appId, masterKey });

    const {usdPrice} = await Moralis.Web3API.token.getTokenPrice({
        address: req.params.address,
        exchange: 'Uniswapv3'
    });

    res.json({ price: usdPrice * req.params.amount });
});


app.post("/get-nft-tokens", async (req, res) => {
    await Moralis.start({ serverUrl, appId, masterKey });
    let page = 0;
    const nextPage = req.body.nextPage;

    const options = {
        address: req.body.address || '',
        chain: req.body.chain || 'eth',
        limit: 100
    };

    let data = await Moralis.Web3API.token.getAllTokenIds(options);

    if(nextPage) {
        while (page < nextPage){
            data = await data.next();
            page++;
        }
        res.json(data);
    } else {
        res.json(data);
    }
});



app.get("/nft-search", async (req, res) => {
    await Moralis.start({ serverUrl, appId, masterKey });

    const options = { q: "Robotos", chain: "eth", filter: "name", limit: 10 };
    const nfts = await Moralis.Web3API.token.searchNFTs(options);

    res.json({ nfts });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});