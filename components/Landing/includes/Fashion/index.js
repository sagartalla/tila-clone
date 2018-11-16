import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SVGComponent from '../../../common/SVGComponet';
import { connect } from 'react-redux';
import PageMaker from '../PageMaker';

import { selectors } from '../../../../store/landing';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Landing/includes/Fashion/fashion');


const Fashion = (props) => {
  return (
    <div className={styles['fashion']}>
      <PageMaker data={props.pageData}/>
    </div>
  );
};

const mapStateToProps = (store) => ({
  pageData: selectors.getFashionPage(store)
});

export default connect(mapStateToProps, null)(Fashion);
