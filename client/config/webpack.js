const solidityLoaderOptions = {
    network: 'development',
    // you can stop loader from automatic compile/push/upgrade
    // action by setting disabled flag to true, but it will still
    // serve .json files from file system
    disabled: false,
  };
  
  module.exports = {
    solidityLoader: {
      test: /\.sol$/,
      use: [
        { loader: 'json-loader' },
        {
          loader: '@openzeppelin/solidity-loader',
          options: solidityLoaderOptions,
        },
      ],
    },
    solidityLoaderOptions,
  };
  