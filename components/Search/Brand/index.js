import React, { Fragment } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';

import { actionCreators, selectors } from '../../../store/landing';

import lang from '../../../utils/language';
import PageData from '../../common/PageData';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './brand_en.styl';
import styles_ar from './brand_ar.styl';


const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const Brand = ({ pageData }) => {
  const { page_content, id_attribute } = pageData;
  return (
    <Fragment>
      {page_content && page_content.length > 0 &&
          page_content && page_content.map(content => content.visible &&
            <div className={`${styles['pt-20']} ${styles['land-page-mn-wdt']} container-fluid ${styles.relative}`}>
             <PageData key={content} content={content} />
          </div>)      
      }
    </Fragment>
  );
};


const mapStateToProps = store => ({
  pageData: selectors.getPage(store),
});


export default connect(mapStateToProps, null)(Brand);
