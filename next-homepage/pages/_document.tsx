import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import React from "react";
import { ServerStyleSheet } from "styled-components";

/**
 * _document는 _app 다음에 실행되며,
 * 공통적으로 활용할 <head> (Ex. 메타 태그)나 <body> 태그
 * 안에 들어갈 내용들을 커스텀할때 활용합니다.
 */
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          initialProps.styles,
          ///////// 여기서부터 /////////

          ///////// 여기까지 추가 ////////
          sheet.getStyleElement(),
        ],
        // styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&libraries=services`}>
          </script>
        </body>
      </Html>
    );
  }
}