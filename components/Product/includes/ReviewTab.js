import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { languageDefinations } from '../../../utils/lang';
import { Tabs, Tab } from 'react-bootstrap';

import Review from './Reviews';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';

const { PDP_PAGE } = languageDefinations();

const styles = mergeCss('components/Product/product');

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
