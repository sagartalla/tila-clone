import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SVGComponent from '../../../common/SVGComponet';

import PageMaker from '../PageMaker';

import { selectors } from '../../../../store/landing';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Landing/includes/Electronics/electronics');

const Electronics = (props) => {
  return (
    <div className={styles['electronics']}>
      <PageMaker data={props.pageData}/>
    </div>
  );
};

const mapStateToProps = (store) => ({
  pageData: selectors.getElectronicsPage(store)
});

export default connect(mapStateToProps, null)(Electronics);
