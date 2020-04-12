require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  experimental: {
    reactMode: 'concurrent',
  },
  env: {
    RELAY_SERVER: process.env.RELAY_SERVER,
  },
};
