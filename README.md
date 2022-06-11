# REEF - Smart Contract Boilerplate

This is a simple boilerplate for [REEF](https://reef.io) contract, written in Solidity.

Since REEF is not a "classic" EVM we need to make some changes on our environment and tools we use to test the contract.

## Install Reef Node
To work locally we need the Reef Node, you can download latest release from [here](https://github.com/reef-defi/reef-chain/releases), pick up the `reef-node` file and download it in your computer.
At the moment of writing last release is v8, so we can run following commands to download and run the node:
```
wget https://github.com/reef-defi/reef-chain/releases/download/v8/reef-node
chmod 777 ./reef-node
./reef-node purge-chain --dev -y
./reef-node --dev
```

Compliments! You have now a local node up and running!

## Setup environment
Now it's time to setup our config file, usually we want fresh keys when working with different smart contracts, so we have a simple script that generates our config file.
If we're using `local` network instead we'll read keys from local node (so we're 100% sure keys are funded) and we don't need to run this command.

Just run following commands:
```
yarn start testnet
```

## Deploying on local node
To deploy on local node you need to run following command:
```
yarn task deploy local
```

You should be able to see something like:
```
Balance is: 99999858009756410579649191n
Deploying contract..
Contract deployed to: 0xe381a3D153293a81Dd26C3E6EAd18C74979e5Eb5
All done, exiting!
```

And you'll notice that `local.json` file was automatically updated with contract address.

## Deploying on testnet
First be sure you have your testnet configuration file first, so run:
```
yarn task start testnet
```

To get initial REEF tokens on the testnet, visit [dev Matrix chat](https://app.element.io/#/room/#reef:matrix.org) and use the following command:
```
!drip REEF_ADDRESS
```

Then you'll be albe to run:

```
yarn task deploy testnet
```

## Make tests

Tests are written using `.js` and you can run them by calling:
```
yarn task test local
```

Where `test` is our `scripts/test.js` file and `local` refers to network (can be also `testnet` or `mainnet`).

You should be able to see something like this in console:
```
--
Using address: 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
--
Response from contract is: Hello Donald!
Hello Donald!
--
All done, exiting!
```
