import React from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import {Grid, Row, Col} from 'react-bootstrap';

import styles from './product.styl';

const Catalog = ({ catalog }) => {
  return (
    <div>
      {
        _.map(catalog, (group, groupName) => <div key={groupName} className={styles['c-group-countainer']}>
          <div className={styles['c-grp-title']}>{groupName}</div>
          <Grid className={styles['c-grp-details']}>
            {
              group.map((attributes) => {
                return (
                  <Row key={attributes.display_string}>
                    <Col xs={12} md={4}>{attributes.display_string}</Col>
                    <Col xs={12} md={8}>{attributes.attribute_values.map((av) => av.value).join(', ')}</Col>
                  </Row>
                )   
              })
            }
          </Grid>
        </div>)
      }
    </div>
  );
}

Catalog.propTypes = {
  catalog: PropTypes.object.isRequired
}


export default Catalog;