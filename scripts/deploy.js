const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const configs = JSON.parse(fs.readFileSync(process.env.CONFIG).toString())
  
  const signers = await hre.reef.getSigners();
  const signer = signers[0]
  console.log("Using address:", signer._substrateAddress)

  let balance = await signer.getBalance()
  console.log('Balance is:', balance)
  if (balance.toBigInt() === 0) {
    console.log("Binding coins to EVM..")
    await signer.claimDefaultAccount()
    balance = await signer.getBalance()
  }
  if (balance.toBigInt() > 0) {
    console.log("Deploying contract..")
    const factory = await hre.reef.getContractFactory(configs.contract_name, signer);
    const contract = await factory.deploy(configs.constructor_arguments);

    console.log("Contract deployed to:", contract.address);
    configs.contract_address = contract.address
    fs.writeFileSync(process.env.CONFIG, JSON.stringify(configs, null, 4))

    if (configs.network !== 'reef') {
      console.log('Verifying..')
      await hre.reef.verifyContract(contract.address, configs.contract_name, configs.constructor_arguments);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
