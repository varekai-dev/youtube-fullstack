import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />

        <meta name="theme-color" content="#cd3a42" />
        <meta name="msapplication-navbutton-color" content="#cd3a42" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#cd3a42" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
