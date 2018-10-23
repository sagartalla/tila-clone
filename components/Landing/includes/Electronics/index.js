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
    <PageMaker data={props.pageData}/>
  );
};

const mapStateToProps = (store) => ({
  pageData: selectors.getPages(store)
});

export default connect(mapStateToProps, null)(Electronics);
