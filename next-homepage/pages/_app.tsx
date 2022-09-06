import { NextPage } from "next";
import { AppProps } from "next/app";
import AppLayout from "../components/AppLayout";
import { store, wrapper } from "../modules/store";
import "../styles/globals.scss"

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <AppLayout>
        <Component {...pageProps} />
    </AppLayout>
  )
};

export default wrapper.withRedux(MyApp)

