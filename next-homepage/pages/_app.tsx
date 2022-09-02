import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Script from "next/script";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Layout from "../components/Layout";
import { store, wrapper } from "../modules/store";

import "../styles/globals.scss"

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
};

export default wrapper.withRedux(MyApp)

