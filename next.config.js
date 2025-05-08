// next.config.js
const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: config.site.base_path !== "/" ? config.site.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: 'standalone',
  images: {
    domains: ["cdn2.thecatapi.com"],
  },
};
