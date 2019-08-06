import React from 'react';
import NoSSR from 'react-no-ssr';
import VariantsAndSimilarProducts from './VariantsAndSimilarProducts';
import KeyFeatures from './KeyFeatures';
import SVGCompoent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang';
import SizeChart from '../includes/SizeChart/index';
import { PanelGroup, Panel } from 'react-bootstrap';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const { PDP_PAGE } = languageDefinations();

const ProductDetails = ({ details, keyfeatures, isPreview, productInfo,variantId,productId,isSearchPreview }) => {
  return (
    <div className={`${styles['product-details-main']} ${styles['border-radius4']} ${styles['mb-5']} ${styles.box}`}>
      {
        details
          ?
          <div className={styles['border-b']}>
            <PanelGroup accordion id="product-details">
              <Panel eventKey="1">
                <Panel.Heading>
                  <Panel.Title toggle className={styles['key-feature-inn']}>
                    <h4 className={`${styles['fs-12']} ${styles.fontW600} ${styles['mb-5']} ${styles['mt-0']} ${styles['flx-space-bw']}`}>
                      <span className={styles['text-uppercase']}>{PDP_PAGE.PRODUCT_DETAILS}</span>
                      <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/down-arrow/down-arrow" />
                    </h4>
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <p className={`${styles['fs-12']} ${styles.fontW300} ${styles['sub-decryption']}`}>{details}</p>
                </Panel.Body>
              </Panel>
            </PanelGroup>
          </div>
          :
          null
      }
      <NoSSR>
        {
          isPreview ? null :
          <VariantsAndSimilarProducts
            variantId={variantId}
            productId={productId}
            isSearchPreview={isSearchPreview}
          />
        }
      </NoSSR>
      {<SizeChart
        productInfo={productInfo}
      />}
      {/*
        <div className={`${styles['flex']} ${styles['pt-10']} ${styles['pb-10']} ${styles['border-b']}`}>
          <span className={`${styles['fontW600']} ${styles['pr-20']}`}>
            <span>Body type : </span>
            <span> Hourglass</span>
          </span>
          <span>
            <span>Know your </span>
            <span className={`${styles['fontW600']} ${styles['lgt-blue']}`}>body type</span>
          </span>
        </div>
      */}
      <div className={styles['pt-10']}>
        <PanelGroup accordion defaultActiveKey="2" id="key-features">
          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle className={styles['key-feature-inn']}>
                <h4 className={`${styles['fs-12']} ${styles.fontW600} ${styles['mb-5']} ${styles['mt-0']} ${styles['flx-space-bw']}`}>
                  <span className={styles['text-uppercase']}>{PDP_PAGE.KEY_FEATURES}</span>
                  <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/down-arrow/down-arrow" />
                  {/* <span className={styles['fs-16']}>+</span> */}
                </h4>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible><KeyFeatures features={keyfeatures} /></Panel.Body>
          </Panel>

        </PanelGroup>
        {/* <Accordian
          head={
            <h4 className={`${styles['fs-12']} ${styles['fontW600']} ${styles['mb-5']} ${styles['mt-0']} ${styles['flx-space-bw']}`}>
              <span>Key features</span>
              <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
            </h4>
          }
          body={

          }
        /> */}
      </div>
    </div>
  );
}

export default ProductDetails;
