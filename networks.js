module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'pool0.eth-fork.io',
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },
  },
};
