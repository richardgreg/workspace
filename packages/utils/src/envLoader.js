require('dotenv').config({ path: require('find-config')('.env') });
require('dotenv').config({ path: require('find-config')('.environment') });

if (process.env.ENV) {
  require('dotenv').config({
    path: require('find-config')(`.env.${process.env.ENV}`),
  });
}
