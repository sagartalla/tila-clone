import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Review from './Reviews';
import OverView from './ElectronicsOverView';
import Description from './ElectronicsDescription';
// import Compare from './ElectronicsCompare';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const ElectronicsTab = ({ catalog, productDescription, catalogObj, isPreview, titleInfo }) => {
  return (
    <div>
      <Tabs defaultActiveKey={1} id="electronics-tab">
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
        {isPreview ? null :
          <Tab eventKey={4} title="Reviews">
            <Review catalogObj={catalogObj} titleInfo={titleInfo} />
          </Tab>
        }
        {/* <Tab eventKey={5} title="Compare">
          <Compare />
        </Tab> */}
      </Tabs>
    </div>
  );
}

export default ElectronicsTab;
