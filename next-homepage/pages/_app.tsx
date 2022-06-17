import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import App, { AppContext, AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import { makeStore, wrapper } from "../modules/store";
import cookies from "next-cookies";

import '../styles/globals.css'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <>
    {/* <Provider store={makeStore()}> */}
    <SessionProvider >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    {/* </Provider> */}
  </>
};

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  const { ctx } = appContext;
  const allCookies = cookies(ctx);
  console.log("Cookie", allCookies)

  const accessTokenByCookie = allCookies['accessToken'];
  if (accessTokenByCookie !== undefined) {
    const refreshTokenByCookie = (allCookies["refreshToken"] || "");
    setToken(accessTokenByCookie, refreshTokenByCookie)
  }

  return { ...appProps }
}

export default wrapper.withRedux(MyApp)

