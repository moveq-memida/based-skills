import { ethers } from "hardhat";

async function main() {
  console.log("Deploying BasedSkillsV2 contract...");

  const BasedSkillsV2 = await ethers.getContractFactory("BasedSkillsV2");
  const contract = await BasedSkillsV2.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`BasedSkillsV2 deployed to: ${address}`);

  console.log("\nDeployment info:");
  console.log(`  Network: ${(await ethers.provider.getNetwork()).name}`);
  console.log(`  Chain ID: ${(await ethers.provider.getNetwork()).chainId}`);
  console.log(`  Deployer: ${(await ethers.getSigners())[0].address}`);
  
  // Mint a test skill
  console.log("\nMinting test skill...");
  const tx = await contract.createSkill(
    "Weather Skill",
    "Get weather forecasts for any location",
    "Utility",
    ethers.parseEther("0.001"),
    "QmTestHash123",
    250 // 2.5% royalty
  );
  await tx.wait();
  console.log("Test skill minted!");
  
  // Get tokenURI to verify SVG
  const tokenURI = await contract.tokenURI(0);
  console.log("\nToken URI preview (first 200 chars):");
  console.log(tokenURI.slice(0, 200) + "...");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
