import React from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import {Grid, Row, Col} from 'react-bootstrap';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const Catalog = ({ catalog }) => {
  return (
    <div>
      {
        _.map(catalog, (group, groupName) => <div key={groupName} className={`${styles['c-group-countainer']}`}>
          <h4 className={`${styles['c-grp-title']}`}><span className={`${styles['thick-bdr-rgt']} ${styles['pl-15']} ${styles['fontW600']} ${styles['fs-20']}`}>{groupName}</span></h4>
          <div className={`${styles['c-grp-details']} ${styles['pt-5']} ${styles['pb-10']} ${styles['lne-ht2']} ${styles['pl-20']}`}>
            {
              group.map((attributes) => {
                return (
                  <Row key={attributes.display_string}>
                    <Col xs={4} md={3}>{attributes.display_string}</Col>
                    <Col xs={8} md={9}>{attributes.attribute_values.map((av) => av.value).join(', ')}</Col>
                  </Row>
                )
              })
            }
          </div>
        </div>)
      }
    </div>
  );
}

Catalog.propTypes = {
  catalog: PropTypes.object.isRequired
}


export default Catalog;
