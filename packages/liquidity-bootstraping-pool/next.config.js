const { join } = require('path');
require('dotenv').config({ path: '../../.env' });

const workspace = join(__dirname, '..');

module.exports = {
  env: {
  },
  poweredByHeader: false,
  webpack: (config, options) => {
    /** Allows import modules from packages in workspace. */
    config.module = {
      ...config.module,
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: { svgo: false },
            },
            'file-loader',
          ],
        },
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
