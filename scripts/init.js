const fs = require('fs')
const child_process = require('child_process')
const { generate } = require('../libs/address_generator')
const argv = require('minimist')(process.argv.slice(2));

let environment = 'local'

if (argv._ !== undefined && argv._[0] !== undefined) {
    environment = argv._[0]
}

async function run() {
    try {
        if (fs.existsSync(process.env.CONFIG)) {
            const configs = JSON.parse(fs.readFileSync(process.env.CONFIG).toString())
            const signers = await hre.reef.getSigners();
            const signer = signers[0]
            console.log('--')
            console.log("Using address:", signer._substrateAddress)
            configs.substrate_address = signer._substrateAddress
            fs.writeFileSync(process.env.CONFIG, JSON.stringify(configs, null, 4))
            console.log('Saved successfully!')
            process.exit()
        } else {
            console.log("Config file doesn't exists!")
        }
    } catch (e) {
        console.log(e.message)
        process.exit()
    }
}

if (!fs.existsSync('./configs/local.json')) {
    fs.cpSync('./configs/example.json', './configs/local.json')
}
run();