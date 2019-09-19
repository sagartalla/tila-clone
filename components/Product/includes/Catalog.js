import React from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import {Grid, Row, Col} from 'react-bootstrap';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

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
                    <Col xs={4} md={4} className={`${!attributes.translation ? styles['direction-ir'] : ''}`}>{attributes.display_string}</Col>
                    {
                      attributes.tag === 'HTML'
                        ?
                        <Col xs={8} md={8} className={`${styles['pl-0']} ${!attributes.translation ? styles['direction-ir'] : ''}`} dangerouslySetInnerHTML={{ __html: attributes.attribute_values[0].value }}></Col>
                        :
                        <Col xs={8} md={8} className={`${styles['pl-0']} ${!attributes.translation ? styles['direction-ir'] : ''}`}>{attributes.attribute_values.map((av) => av.value + " " +(av.qualifier_unit ? av.qualifier_unit : "")).join(', ')}</Col>
                    }

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
