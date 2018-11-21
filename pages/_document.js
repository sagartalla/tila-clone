import Document, { Head, Main, NextScript } from 'next/document';
import Meta from '../components/helpers/Meta';
import Script from '../components/helpers/Script';

export default class MyDocument extends Document {
  render() {
    const { props } = this;
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
          <script type='text/javascript' src='//service.maxymiser.net/api/eu/fptechscience.com/3a077f/mmapi.js'> </script>
          <script type='text/javascript' src='/static/fb.js'></script>
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
