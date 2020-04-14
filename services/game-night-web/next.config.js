require('dotenv').config();
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

module.exports = withPlugins([withOptimizedImages], {
  reactStrictMode: true,
  experimental: {
    reactMode: 'concurrent',
  },
  env: {
    RELAY_SERVER: process.env.RELAY_SERVER,
  },
});
