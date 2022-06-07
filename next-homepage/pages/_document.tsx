import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";
import { useEffect } from 'react';
import Script from 'next/script'

export default function Document() {
 
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}