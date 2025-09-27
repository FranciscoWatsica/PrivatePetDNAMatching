const hre = require("hardhat");

async function main() {
  console.log("Deploying TestPetDNAMatching contract...");

  // Deploy the contract
  const TestPetDNAMatching = await hre.ethers.getContractFactory("TestPetDNAMatching");
  const contract = await TestPetDNAMatching.deploy();

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("TestPetDNAMatching deployed to:", contractAddress);

  // Test basic functionality
  console.log("Testing contract functions...");

  try {
    const totalPets = await contract.getTotalPets();
    console.log("Total pets:", totalPets.toString());

    const owner = await contract.owner();
    console.log("Contract owner:", owner);

    const matchingCost = await contract.matchingCost();
    console.log("Matching cost:", hre.ethers.formatEther(matchingCost), "ETH");

    console.log("✅ Contract deployment and basic tests successful!");
    console.log("🎯 Use this address in your frontend:", contractAddress);

  } catch (error) {
    console.error("❌ Contract test failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});