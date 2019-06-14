import Document, { Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';

import Meta from '../components/helpers/Meta';
import Script from '../components/helpers/Script';
import adobeTags from '../constants/adobeLinks';


const config = getConfig();
const env = config.publicRuntimeConfig.env;

export default class MyDocument extends Document {
  render() {
    const { props } = this;
    return (
      <html>
        <Head>
          {/*<!-- Google Tag Manager -->*/}
          <script src="/static/scripts/googleTagManager.js"></script>
          {/*<!-- End Google Tag Manager -->*/}
          {/*<!-- Adobe Launch Tags -->*/}
          <script src={adobeTags[env]} async></script>
          {
            props.__NEXT_DATA__.query.language === 'ar'
              ?
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-rtl/3.4.0/css/bootstrap-rtl.css" />
              :
              null
          }
          <script type='text/javascript' src='/static/sociallogin.js'></script>
          <Meta />
          <script src="/static/scripts/dataLayer.js"></script>

        </Head>
        <body>
          {
            props.__NEXT_DATA__.query.language === 'ar'
              ?
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-rtl/3.4.0/css/bootstrap-rtl.css" />
              :
              null
          }
          {/*<!-- Google Tag Manager (noscript) -->*/}
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M68MT36"
          height="0" width="0" style={{display:'none', visibility:'hidden'}}></iframe></noscript>
          {/*<!-- End Google Tag Manager (noscript) -->*/}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
