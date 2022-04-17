import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import { makeStore, wrapper } from "../modules/store";
import '../styles/globals.css'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <>
    {/* <Provider store={makeStore()}> */}
    <Layout>
      <Component {...pageProps} />
    </Layout>
    {/* </Provider> */}
  </>
};

export default wrapper.withRedux(MyApp);
