const { ethers, utils } = require("ethers");
const fs = require('fs');

async function main() {
    const configs = JSON.parse(fs.readFileSync(process.env.CONFIG).toString())
    const signers = await hre.reef.getSigners();
    const signer = signers[0]
    if (!(await signer.isClaimed())) {
        console.log(
            "No claimed EVM account found -> claimed default EVM account:",
            await signer.getAddress()
        );
        await signer.claimDefaultAccount();
    } else {
        console.log(
            "Claimed EVM account found:",
            await signer.getAddress()
        );
    }
    console.log('--')
    console.log("Using address:", signer._substrateAddress)
    // Init contract
    const contract = await hre.reef.getContractAt(configs.contract_name, configs.contract_address, signer);
    // Run task
    const hello = await contract.sayHello("Reefer");
    console.log('--')
    console.log('Response from contract is:');
    console.log(hello);
    console.log('--')
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
