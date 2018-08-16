import Document, { Head, Main, NextScript } from 'next/document';
import Meta from '../components/helpers/Meta';
import Script from '../components/helpers/Script';

export default class MyDocument extends Document {
  render() {
    const { props } = this;
    const {buildManifest, pathname} = props;
    const { css } = buildManifest;
    return (
      <html>
        <Head>
          {
            props.__NEXT_DATA__.query.language === 'ar'
              ?
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-rtl/3.4.0/css/bootstrap-rtl.css" />
              :
              null
          }
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
