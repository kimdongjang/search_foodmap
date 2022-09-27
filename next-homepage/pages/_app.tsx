import { NextPage } from "next";
import { AppProps } from "next/app";
import AppLayout from "../components/AppLayout";
import { store, wrapper } from "../modules/store";
import "../styles/globals.scss"

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const MyComponent = Component as any;
  return (
    <AppLayout>
      <MyComponent {...pageProps} />
    </AppLayout>
  )
};

export default wrapper.withRedux(MyApp)
