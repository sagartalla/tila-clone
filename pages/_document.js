import Document, { Head, Main, NextScript } from 'next/document';
import Meta from '../components/helpers/Meta';
import Script from '../components/helpers/Script';
import apm from '../store/helper/apmInstance';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
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
