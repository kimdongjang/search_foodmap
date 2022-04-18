/** @type {import('next').NextConfig} */


// /* production, develop */
// const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require("next/constants");


// const nextEnv = require("next-env");
// const dotenvLoad = require("dotenv-load");

// dotenvLoad();

// const withEnv = nextEnv();
const withImages = require('next-images')
module.exports = withImages()

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.dog.ceo'],
  },  
  env: {
    BASE_URL: process.env.BASE_URL,
  },
}


module.exports = [
  nextConfig, 
  withImages(),
  // {
  //   publicRuntimeConfig: {
  //     apiUrl: process.env.NODE_ENV === 'development'
  //       ? 'http://localhost:3000/api' // development api
  //       : 'http://localhost:3000/api' // production api
  //   }
  // }
]
