const { join } = require('path');

require('../utils/src/envLoader');

const workspace = join(__dirname, '..');

module.exports = {
  target: 'serverless',
  env: {
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    PATCH_API_KEY: process.env.PATCH_API_KEY,
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
