require("@reef-defi/hardhat-reef");

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
      url: "ws://localhost:9944",
      scanUrl: "http://api:8000"
    },
    reef_testnet: {
      url: "wss://rpc-testnet.reefscan.com/ws",
      scanUrl: "https://testnet.reefscan.com",
      seeds: {
        testnet_account: process.env.MNEMONIC,
      },
    },
    reef_mainnet: {
      url: "wss://rpc.reefscan.com/ws",
      scanUrl: "wss://reefscan.com",
      seeds: {
        mainnet_account: process.env.MNEMONIC,
      },
    },
  },
};
