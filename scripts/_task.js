const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const child_process = require('child_process')
const { generate, derive } = require('../libs/address_generator')
let configFile
let scriptFile

async function run() {
    try {
        configFile = './configs/' + argv._[1] + '.json'
        if (!fs.existsSync(configFile)) {
            // Generating new mnemonic
            if (argv._[1] !== 'local') {
                const configs = JSON.parse(fs.readFileSync('./configs/local.json').toString())
                configs.network = "reef_" + argv._[1]
                configs.contract_address = ""
                const generated = await generate()
                console.log('New mnemonic is:', generated)
                configs.owner_mnemonic = generated
                fs.writeFileSync(configFile, JSON.stringify(configs, null, 4))
            }
        } else {
            console.log("Configuration exists yet!")
        }
        const configs = JSON.parse(fs.readFileSync(configFile).toString())
        if (argv._[1] !== 'local') {
            if (
                configs.network !== undefined &&
                configs.owner_mnemonic !== undefined
            ) {
                child_process.execSync(
                    'MNEMONIC="' + configs.owner_mnemonic + '" ' +
                    'CONFIG="' + configFile + '" ' +
                    ' npx hardhat --network ' + configs.network +
                    ' run ' + scriptFile, { stdio: 'inherit' }
                )
                console.log('All done, exiting!')
                process.exit();
            } else {
                console.log('Config file missing.')
            }
        } else {
            child_process.execSync(
                'PROVIDER="' + configs.provider + '" ' +
                'CONFIG="' + configFile + '" ' +
                ' npx hardhat --network ' + configs.network +
                ' run ' + scriptFile, { stdio: 'inherit' }
            )
            console.log('All done, exiting!')
            process.exit();
        }
    } catch (e) {
        console.log(e.message)
        process.exit()
    }
}

if (argv._ !== undefined && argv._.length == 2) {
    if (fs.existsSync('./scripts/' + argv._[0] + '.js')) {
        scriptFile = './scripts/' + argv._[0] + '.js'
        run();
    } else {
        console.log('Can\'t find task: ' + './scripts/' + argv._[0] + '.js')
    }
} else {
    console.log('Can\'r run task, please use script like `yarn task deploy localhost`.')
}