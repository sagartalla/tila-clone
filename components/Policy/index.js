import React, { Component, Fragment } from 'react';

import HeaderBar from '../HeaderBar';
import FooterBar from '../Footer';

const url = {
  tc: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies-html/tnc/termsedited.html',
  cp: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies-html/policies/policies.html?#cancelationPolicy',
  er: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies-html/policies/policies.html?#exchangePolicy',
  re: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies-html/policies/policies.html?#returnPolicy',
  wp: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies-html/policies/policies.html?#warrantyPolicy',
  // sp: '/static/docs/sp.pdf#toolbar=0&navpanes=0&view=FitH',
  pp: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies-html/privacy/Pravacylatest.html',
};

const Policy = ({ query }) => (
  <Fragment>
    <HeaderBar />
    <iframe src={url[query.name]} title={query.name} style={{ height: '100vh', width: '100%', border: '0' }} />
    <FooterBar />
  </Fragment>
);

export default Policy;
