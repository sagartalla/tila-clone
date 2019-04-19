import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { languageDefinations } from '../../../utils/lang';
import { Tabs, Tab } from 'react-bootstrap';

import Review from './Reviews';
import SVGCompoent from '../../common/SVGComponet';


const { PDP_PAGE } = languageDefinations();

import lang from '../../../utils/language';

import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


const ReviewsTab = ({ tabs }) => {
  return (
    <div>
      <Tabs defaultActiveKey={1}>
        <Tab eventKey={1} id="All Reviews" title={PDP_PAGE.ALL_REVIEWS}>
          <Review />
        </Tab>
        <Tab eventKey={2} id="Expert Reviews" title={PDP_PAGE.EXPERT_REVIEWS}>
          <Review />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ReviewsTab;
