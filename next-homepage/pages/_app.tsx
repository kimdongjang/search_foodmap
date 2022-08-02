import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Script from "next/script";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Layout from "../components/Layout";
import { makeStore, wrapper } from "../modules/store";

import "../styles/globals.scss"

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  // return <>
  //   {/* <Provider store={store}> */}
  //   <SessionProvider >
  //     <Layout>
  //       <Component {...pageProps} />
  //     </Layout>
  //   </SessionProvider>
  //   {/* </Provider> */}
  // </>
  return (
    // <Provider store={makeStore()}>
    <SessionProvider >
      <Layout>
        <Component {...pageProps} />        
      </Layout>
    </SessionProvider>
    ///* </Provider> */
  )
};

export default wrapper.withRedux(MyApp)

