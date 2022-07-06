/** @type {import('next').NextConfig} */
const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withPlugins = require('next-compose-plugins');
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");
const path = require('path')

// /* production, develop */
// const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require("next/constants");


// const nextEnv = require("next-env");
// const dotenvLoad = require("dotenv-load");

// dotenvLoad();

// const withEnv = nextEnv();

const withImages = require('next-images');
const { redirect } = require('next/dist/server/api-utils');
  // images: {
  //   domains: ['images.dog.ceo'],
  // },
  // env: {
  //   BASE_URL: process.env.BASE_URL,
  // },

module.exports = (phase, { defaultConfig }) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  /**
   * 보안상 api를 숨겨서 보내기 위해 rewrites 함수 사용
   * 요청 경로를 다른 목적지 경로로 매핑해주는, 설정 객체를 배열로 가지는 속성
   * soruce에 요청이 오면 destination으로 엔드포인트 전달
   * @returns 
   */   
  const rewrites = () => {
    return [
      {
        source: '/redis/:path*',
        destination: "http://127.0.0.1:4949/redis/:path*",
      },
      {
        source: '/auth/:path*',
        destination: "http://127.0.0.1:4949/auth/:path*",
      },
    ];
  }
  const nextConfig = {    
    env:{
      SERVER_DOMAIN: (() => {
        if (isDev) return 'http://127.0.0.1:4949/'
        if (isProd) return 'http://127.0.0.1:4949/'      
        if (isStaging) return 'http://127.0.0.1:4949/'
        return 'http://localhost:4949/'
      })(),
      NEXT_PUBLIC_KAKAOMAP_APPKEY: (() =>{
        if(isDev) return "d9a3db1e42a00573356be3ef55e95c9e"
      })()
    },
    images: {
      domains: ['images.dog.ceo'],
    },
    
    // sass 사용 여부
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },

    reactStrictMode: true,

    // 빌드시 환경 변수 사용을 명시하며, 런타임 구성을 설정
    publicRuntimeConfig: {
      // Will be available on both server and client
      backendUrl: process.env.DESTINATION_URL,
    },
  }
      
  // next.config.js object
  return { nextConfig,rewrites }
}

// module.exports = {
//   const isDev = phase === PHASE_DEVELOPMENT_SERVER
//   const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
//   const isStaging =
//     phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

//   console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

// },
//   // const env = withImages();
//   const env = {
//     SERVER_DOMAIN: (() => {
//       if(isDev) return "127.0.0.1:4949"
//       if(isProd) return "172.12.0.1:4949"
//     })(),
//   }
  
//   // next.config.js object
//   return {env};
// }
// module.exports = [
//   nextConfig,
//   withImages(),
//   /**
//    * phase는 구성이 로드되는 현재 컨텍스트
//    */
//   (phase, { defaultConfig }) => {
    
    

//     if (phase === PHASE_DEVELOPMENT_SERVER) {
//       /* development only config options here */
//       console.log("I'm in dev mode")
//     }
//     if (phase === PHASE_PRODUCTION_BUILD) {
//       console.log("I'm in prod mode")

//     }

//     /* config options for all phases except development here */
//     return withEnv(defaultConfig)
//   }

//   // {
//   //   publicRuntimeConfig: {
//   //     apiUrl: process.env.NODE_ENV === 'development'
//   //       ? 'http://localhost:3000/api' // development api
//   //       : 'http://localhost:3000/api' // production api
//   //   }
//   // }
// ]
