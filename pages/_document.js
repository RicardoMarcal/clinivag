import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='pt-br'>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}