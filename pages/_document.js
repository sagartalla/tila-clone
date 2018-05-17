import Document, { Head, Main, NextScript } from 'next/document';
import Meta from '../components/Meta';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          {/* TODO: SF-1 */}
          <link rel="stylesheet" href="/static/vendor/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          {/* END TODO: SF-1 */}
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