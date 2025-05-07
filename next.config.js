// next.config.js
const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: 'standalone',
  images: {
    domains: [
      "cdn2.thecatapi.com",  // imágenes de The Cat API
    ],
  },
};

module.exports = nextConfig;