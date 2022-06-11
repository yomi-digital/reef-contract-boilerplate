require("@reef-defi/hardhat-reef");
console.log('Using provider:', process.env.PROVIDER)
module.exports = {
  solidity: "0.8.6",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  defaultNetwork: "reef",
  networks: {
    reef: {
      url: process.env.PROVIDER,
      scanUrl: "http://api:8000"
    },
    testnet: {
      url: process.env.PROVIDER || "wss://rpc-testnet.reefscan.com/ws",
      scanUrl: "https://testnet.reefscan.com",
      seeds: {
        testnet_account: process.env.MNEMONIC,
      },
    },
    mainnet: {
      url: process.env.PROVIDER || "wss://rpc.reefscan.com/ws",
      scanUrl: "wss://reefscan.com",
      seeds: {
        mainnet_account: process.env.MNEMONIC,
      },
    },
  },
};
