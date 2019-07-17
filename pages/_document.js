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
          {/* <!-- Google Tag Manager --> */}
          <script src="/static/scripts/googleTagManager.js" />
          {/* <!-- End Google Tag Manager --> */}
          {/* <!-- Adobe Launch Tags --> */}
          <script src={adobeTags[env]} async />
          {
            props.__NEXT_DATA__.query.language === 'ar'
              ?
                <link rel="stylesheet" href="/static/css/fonts_ar.css" />
              :
                <link rel="stylesheet" href="/static/css/fonts_en.css" />
          }
          <script type="text/javascript" src="/static/sociallogin.js" />
          <Meta />
          <script src="/static/scripts/dataLayer.js" />
          <link rel="alternate" hrefLang="ar-SA" href="https://www.tila.com/ar/" />
          <link rel="alternate" hrefLang="en-SA" href="https://www.tila.com/en/" />
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
          <meta name="robots" content="noodp" />
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        </Head>
        <body>
          {
            props.__NEXT_DATA__.query.language === 'ar'
              ?
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-rtl/3.4.0/css/bootstrap-rtl.css" />
              :
              null
          }
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-M68MT36"
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              >
            </iframe>
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
          <inlay-oracle-chat-embedded
            class="inlay"
            id="chatInlay"
            site-url="fptsuae.widget.custhelp.com"
            inlay-hidden="true"
          />
          <script
            id="oit-loader"
            src="https://tila-en.custhelp.com/s/oit/latest/common/v0/libs/oit/loader.js"
            data-oit-theme-url="https://tila-en.custhelp.com/s/oit/latest/themes/oracle/midnight/web/theme.css"
            data-oit-increment="true"
            data-oit-group=""
            async
          />
          <script type="application/ld+json" src="/static/scripts/seoScript.js"/>
        </body>
      </html>
    );
  }
}
