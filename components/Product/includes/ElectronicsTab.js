import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import Review from './Reviews';
import OverView from './ElectronicsOverView';
import Description from './ElectronicsDescription';
import Specification from './ElectronicsSpecifications';
// import Compare from './ElectronicsCompare';
import SVGCompoent from '../../common/SVGComponet';

import lang from '../../../utils/language';

import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const ElectronicsTab = ({ catalog, productDescription, catalogObj }) => {
  return (
    <div>
      <Tabs defaultActiveKey={1}>
        <Tab eventKey={1} title="Overview">
          <OverView  catalog={catalog}/>
        </Tab>
        {
          productDescription && <Tab eventKey={2} title="Description">
            <Description productDescription={productDescription} />
          </Tab>
        }
        {/*<Tab eventKey={2} title="Description">
          <Description />
        </Tab>
        <Tab eventKey={3} title="Specifications">
          <Specification />
        </Tab>*/}
        <Tab eventKey={4} title="Reviews">
          <Review catalogObj={catalogObj} />
        </Tab>
        {/* <Tab eventKey={5} title="Compare">
          <Compare />
        </Tab> */}
      </Tabs>
    </div>
  );
}

export default ElectronicsTab;
