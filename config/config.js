const path = require('path');

const rootPath = path.normalize(`${__dirname}/..`);
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'maps-api',
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/store-locator-uci',
  },

  test: {
    root: rootPath,
    app: {
      name: 'maps-api',
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/store-locator-uci',
  },

  production: {
    root: rootPath,
    app: {
      name: 'maps-api',
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/store-locator-uci',
  },
};

module.exports = config[env];
