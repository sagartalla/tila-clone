import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SVGComponent from '../../../common/SVGComponet';

import PageMaker from '../PageMaker';

import { selectors } from '';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Landing/includes/Electronics/electronics');

const Electronics = () => {
  return 'hi';
};

const mapStateToProps = (store) => ({
  productData: taskCode ? selectors.getPreview(store) : selectors.getProduct(store)
});

export default connect(mapStateToProps, null)(Electronics);
