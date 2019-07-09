import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import PageData from '../index';
import lang from '../../../../utils/language';
import { actionCreators, selectors } from '../../../../store/landing';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class DT extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { content, getListings } = this.props;
    if (content.data && content.data.listing_ids) {
      getListings(content.data.listing_ids[lang]);
    }
  }

  render() {
    const { listingsData, content } = this.props;
    const { config = {}, data } = content;
    const listingsArr = _.chunk(listingsData, config.listing_ids_to_be_grouped);
    console.log(listingsArr.map(l => Array.isArray(l)), 'ewfwef');

    return (
      <div>
        {listingsArr.length > 0 && listingsArr.map((listings, index) => {
          console.log('kjhv', listings, listings.map(l => l.name));
          return (
            <React.Fragment>
              <Row>
                {listings.length > 0 &&
                  listings.map(listing => (
                    <Col>
                      <div>{listing.name}</div>
                    </Col>
                  ))}
              </Row>
              {content.data.banner_set[index] && <PageData content={content.data.banner_set[index]} />}
            </React.Fragment>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  listingsData: selectors.getListings(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getListings: actionCreators.getListings,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(DT);
