const hre = require("hardhat");
const fs = require("fs");

async function main() {
  await resetNetwork();
  const kaizenTokenContract = await hre.ethers.getContractFactory(
    "KaizenToken"
  );

  console.log("Deploying KaizenToken...");

  const kaizenToken = await kaizenTokenContract.deploy();
  await kaizenToken.waitForDeployment();
  const kaizenTokenAddress = await kaizenToken.getAddress();

  console.log("KaizenToken deployed to:", kaizenTokenAddress);

  const abiFile = fs.readFileSync(
    "./artifacts/contracts/KaizenToken.sol/KaizenToken.json",
    "utf8"
  );
  const abi = JSON.parse(abiFile).abi;

  fs.writeFileSync(
    "./frontend/src/contractData.json",
    JSON.stringify(
      {
        address: kaizenTokenAddress,
        abi: abi,
      },
      null,
      2
    )
  );
}

async function resetNetwork() {
  await network.provider.request({
    method: "hardhat_reset",
    params: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
