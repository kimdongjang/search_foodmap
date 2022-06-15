/** @type {import('next').NextConfig} */
const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

// /* production, develop */
// const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require("next/constants");


// const nextEnv = require("next-env");
// const dotenvLoad = require("dotenv-load");

// dotenvLoad();

// const withEnv = nextEnv();

const withImages = require('next-images')
// module.exports = withImages()
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.dog.ceo'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  async rewrites() {
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          destination: process.env.DESTINATION_URL,
        }
      ]
    }
    else
      return [
        {
          destination: process.env.DESTINATION_URL,
        }
      ]
  }
}

module.exports = [
  nextConfig,
  withImages(),
  /**
   * phase는 구성이 로드되는 현재 컨텍스트
   */
  (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {      
      /* development only config options here */
      console.log("I'm in dev mode")
    }    
    if( phase === PHASE_PRODUCTION_BUILD){
      console.log("I'm in prod mode")
      
    }
  
    /* config options for all phases except development here */  
    return withEnv(defaultConfig)
  }

  // {
  //   publicRuntimeConfig: {
  //     apiUrl: process.env.NODE_ENV === 'development'
  //       ? 'http://localhost:3000/api' // development api
  //       : 'http://localhost:3000/api' // production api
  //   }
  // }
]
