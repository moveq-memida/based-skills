import { ethers } from "hardhat";

async function main() {
  console.log("Deploying BasedSkills contract...");

  const BasedSkills = await ethers.getContractFactory("BasedSkills");
  const basedSkills = await BasedSkills.deploy();

  await basedSkills.waitForDeployment();

  const address = await basedSkills.getAddress();
  console.log(`BasedSkills deployed to: ${address}`);

  // Log deployment info
  console.log("\nDeployment info:");
  console.log(`  Network: ${(await ethers.provider.getNetwork()).name}`);
  console.log(`  Chain ID: ${(await ethers.provider.getNetwork()).chainId}`);
  console.log(`  Deployer: ${(await ethers.getSigners())[0].address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
