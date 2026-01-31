import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x35Ea7772481CF5fBd1795Bd75A799CCcA0D24009";
  
  const BasedSkills = await ethers.getContractAt("BasedSkills", contractAddress);
  
  console.log("Minting Weather Skill...");
  
  const tx = await BasedSkills.createSkill(
    "QmWeatherSkillHash123", // contentHash (IPFS hash placeholder)
    "Utility",               // category
    ethers.parseEther("0.001"), // price: 0.001 ETH
    250,                     // royaltyBps: 2.5%
    "ipfs://QmWeatherSkillMetadata123" // tokenURI
  );
  
  console.log("Transaction sent:", tx.hash);
  
  const receipt = await tx.wait();
  console.log("Transaction confirmed!");
  
  // Get token ID from event
  const event = receipt?.logs.find((log: any) => {
    try {
      const parsed = BasedSkills.interface.parseLog({ topics: log.topics as string[], data: log.data });
      return parsed?.name === "SkillCreated";
    } catch { return false; }
  });
  
  if (event) {
    const parsed = BasedSkills.interface.parseLog({ topics: event.topics as string[], data: event.data });
    console.log("\n✅ Skill minted!");
    console.log("Token ID:", parsed?.args.tokenId.toString());
    console.log("Creator:", parsed?.args.creator);
    console.log("Price:", ethers.formatEther(parsed?.args.price), "ETH");
  }
  
  // Get total supply
  const totalSupply = await BasedSkills.totalSupply();
  console.log("\nTotal skills:", totalSupply.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
