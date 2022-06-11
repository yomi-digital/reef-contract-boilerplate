const fs = require('fs')
const child_process = require('child_process')
const { generate, derive } = require('../libs/address_generator')
const argv = require('minimist')(process.argv.slice(2));

let configFile
let environment = 'local'

if (argv._ !== undefined && argv._[0] !== undefined) {
    environment = argv._[0]
}

async function run() {
    try {
        console.log("Setting up environment:", environment)
        configFile = './configs/' + environment + '.json'
        if (!fs.existsSync(configFile)) {
            // Generating new mnemonic
            if (environment !== 'local') {
                const configs = JSON.parse(fs.readFileSync('./configs/local.json').toString())
                configs.network = environment
                configs.contract_address = ""
                const generated = await generate()
                console.log('New mnemonic is:', generated)
                configs.owner_mnemonic = generated
                const { addresses, keys } = await derive(configs.owner_mnemonic, 1)
                configs.owner_key = keys[0]
                configs.owner_address = addresses[0]
                fs.writeFileSync(configFile, JSON.stringify(configs, null, 4))
            }
        } else {
            console.log("Configuration exists yet!")
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