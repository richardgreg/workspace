const { join } = require('path');

require('dotenv').config();

const workspace = join(__dirname, '..');

module.exports = {
  target: 'serverless',
  env: {
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
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
