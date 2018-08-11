import Document, { Head, Main, NextScript } from 'next/document';
import Meta from '../components/Meta';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-rtl/3.4.0/css/bootstrap-rtl.css" />
          <Meta />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}