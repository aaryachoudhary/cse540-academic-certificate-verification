const hre = require("hardhat");

async function main() {
  console.log("Deploying CertificateRegistry contract...");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Get account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy the contract
  // The constructor requires an admin address - we'll use the deployer as admin
  const CertificateRegistry = await hre.ethers.getContractFactory("CertificateRegistry");
  const certificateRegistry = await CertificateRegistry.deploy(deployer.address);

  await certificateRegistry.waitForDeployment();
  const address = await certificateRegistry.getAddress();

  console.log("\n✅ CertificateRegistry deployed to:", address);
  console.log("\n📝 Next steps:");
  console.log("1. Update backend/.env with CONTRACT_ADDRESS=" + address);
  console.log("2. The deployer address is set as admin:", deployer.address);
  console.log("3. You can now add issuers using the addIssuer() function");

  // Wait for a few block confirmations
  console.log("\n⏳ Waiting for block confirmations...");
  await certificateRegistry.deploymentTransaction()?.wait(3);
  
  console.log("\n✅ Deployment confirmed!");

  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


