// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
const contractsDir = __dirname + "/../frontend/src/contracts";

async function main() {
  const fs = require("fs");
  const addressFile = require(`${contractsDir}/contract-address.json`);
  let contracts = [];
  let addresses = {};

  fs.readdirSync('./contracts/').forEach(file => {
    contracts.push(file.split('.')[0])
  });

  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  await Promise.all(contracts.map(async (contract) => {
    const owner = await deployer.getAddress();
    let factory;
    const ContractFactory = await ethers.getContractFactory(contract);

    if(contract === 'BlockAuction') {
      console.log(`deploying contract: ${contract}`);
      factory = await ContractFactory.deploy(owner);
    } else {
      factory = await ContractFactory.deploy();
    }

    await factory.deployed();

    console.log(`${contract} address:`, factory.address);

    addresses[contract] = {
      address: factory.address
    };

    saveFrontendFiles(factory, contract);
  }));

  addressFile[network.name] = addresses;

  fs.writeFileSync(
      contractsDir + "/contract-address.json",
      JSON.stringify(addressFile, undefined, 2)
  );
}

function saveFrontendFiles(factory, contract) {
  const fs = require("fs");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const contractArtifact = artifacts.readArtifactSync(contract);

  fs.writeFileSync(
    contractsDir + `/${contract}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
