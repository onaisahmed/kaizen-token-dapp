const hre = require("hardhat");

async function main() {
  const kaizenTokenContract = await hre.ethers.getContractFactory(
    "KaizenToken"
  );

  console.log("Deploying KaizenToken...");

  const kaizenToken = await kaizenTokenContract.deploy();
  await kaizenToken.waitForDeployment();
  const kaizenTokenAddress = await kaizenToken.getAddress();

  console.log("KaizenToken deployed to:", kaizenTokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
