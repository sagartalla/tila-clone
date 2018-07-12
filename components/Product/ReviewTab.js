import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';

import Review from './Reviews';
import SVGCompoent from '../common/SVGComponet';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const ReviewsTab = ({ tabs }) => {
  return (
    <div>
      <Tabs defaultActiveKey={1}>
        <Tab eventKey={1} title="All Reviews">
          <Review />
        </Tab>
        <Tab eventKey={2} title="Expert Reviews">
          <Review />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ReviewsTab;