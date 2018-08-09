import Document, { Head, Main, NextScript } from 'next/document';
import Meta from '../components/helpers/Meta';
import Script from '../components/helpers/Script';
import apm from '../store/helper/apmInstance';

export default class MyDocument extends Document {
  render() {
    const {buildManifest, pathname} = this.props;
    const {css} = buildManifest;
    return (
      <html>
        <Head>
          {css.map((file) => {
            return <link rel="stylesheet" href={`/_next/${file}`} key={file} />
          })}
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
