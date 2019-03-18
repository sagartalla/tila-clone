import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoSSR from 'react-no-ssr';
import VariantsAndSimilarProducts from './VariantsAndSimilarProducts';
import KeyFeatures from './KeyFeatures';
import SVGCompoent from '../../common/SVGComponet';
import Accordian from '../../common/Accordian';
import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang';
import SizeChart from '../includes/SizeChart/index';
import { PanelGroup,Panel, Heading, Body, Title } from 'react-bootstrap';
const styles = mergeCss('components/Product/product');
const { PDP_PAGE } = languageDefinations();

const ProductDetails = ({ details, keyfeatures, isPreview, productInfo }) => {
  return (
    <div className={`${styles['product-details-main']} ${styles['border-radius4']} ${styles['mb-10']} ${styles['box']}`}>
      {
        details
          ?
          <div className={styles['border-b']}>
            <h4 className={`${styles['fs-12']} ${styles['fontW600']} ${styles['mb-5']} ${styles['mt-0']} ${styles['flx-space-bw']}`}>
              <span>{PDP_PAGE.PRODUCT_DETAILS}</span>
              <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
            </h4>
            <p className={`${styles['fs-12']} ${styles['fontW300']} ${styles['sub-decryption']}`}>{details}</p>
          </div>
          :
          null
      }
      <NoSSR>
        {
          isPreview ? null : <VariantsAndSimilarProducts />
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
        <PanelGroup accordion defaultActiveKey="2">
          <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle className={styles['key-feature-inn']}>
                <h4 className={`${styles['fs-12']} ${styles['fontW600']} ${styles['mb-5']} ${styles['mt-0']} ${styles['flx-space-bw']}`}>
                  <span>Key features</span>
                  {/* <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" /> */}
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
