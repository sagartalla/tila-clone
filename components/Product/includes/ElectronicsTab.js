import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import Review from './Reviews';
import OverView from './ElectronicsOverView';
import Description from './ElectronicsDescription';
import Specification from './ElectronicsSpecifications';
import Compare from './ElectronicsCompare';
import SVGCompoent from '../../common/SVGComponet';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const ElectronicsTab = ({ tabs }) => {
  return (
    <div>
      <Tabs defaultActiveKey={1}>
        <Tab eventKey={1} title="Overview">
          <OverView />
        </Tab>
        <Tab eventKey={2} title="Description">
          <Description />
        </Tab>
        <Tab eventKey={3} title="Specifications">
          <Specification />
        </Tab>
        <Tab eventKey={4} title="Reviews">
          <Review />
        </Tab>
        <Tab eventKey={5} title="Compare">
          <Compare />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ElectronicsTab;