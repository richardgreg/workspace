const { join } = require('path');

require('dotenv').config();

const workspace = join(__dirname, '..');

module.exports = {
  target: 'serverless',
  env: {
    CHAIN_ID: process.env.CHAIN_ID,
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    PATCH_API_KEY: process.env.PATCH_API_KEY,
    RPC_URL: process.env.RPC_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    INFURA_MAINNET_ENDPOINT: process.env.INFURA_MAINNET_ENDPOINT,
    INFURA_PROJECT_SECRET: process.env.INFURA_PROJECT_SECRET,
    INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
  },
  poweredByHeader: false,
  webpack: (config, options) => {
    /** Allows import modules from packages in workspace. */
    //config.externals = { ...config.externals, electron: 'electron' };
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [workspace],
          exclude: /node_modules/,
          use: options.defaultLoaders.babel,
        },
      ],
    };
    return config;
  },
};
