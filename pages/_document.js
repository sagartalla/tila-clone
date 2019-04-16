import Document, { Head, Main, NextScript } from 'next/document';
import Meta from '../components/helpers/Meta';
import Script from '../components/helpers/Script';

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
          <script src="//assets.adobedtm.com/launch-ENc0358fe6617e4066a1c1c0ecff96f2e5-development.min.js" async></script>
          {/*<!-- End Adobe Launch Tags -->*/}
          {/*<script type='text/javascript' src='//service.maxymiser.net/api/eu/fptechscience.com/3a077f/mmapi.js'> </script>*/}
          {/* <script type='text/javascript' src='/static/fb.js'></script> */}
          <script type='text/javascript' src='/static/sociallogin.js'></script>
          <Meta />
          <script src="/static/scripts/dataLayer.js"></script>

          <script src="//assets.adobedtm.com/launch-ENf3bacf30d8974e6a81eeec612ff12c02-development.min.js" async></script>
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
