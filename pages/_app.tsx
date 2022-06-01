import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import { makeStore, wrapper } from "../modules/store";
import '../styles/globals.css'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <>
    {/* <Provider store={makeStore()}> */}
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    {/* </Provider> */}
  </>
};

export default wrapper.withRedux(MyApp);
