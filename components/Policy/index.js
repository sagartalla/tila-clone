import React, { Component, Fragment } from 'react';

import HeaderBar from '../HeaderBar';
import FooterBar from '../Footer';

const url = {
  tc: '/static/docs/tc.pdf#toolbar=0&navpanes=0&view=FitH',
  cp: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies-html/policies.html?#cancelationPolicy',
  re: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies-html/policies.html?#exchangePolicy',
  wp: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies-html/policies.html?#warrantyPolicy',
  sp: '/static/docs/sp.pdf#toolbar=0&navpanes=0&view=FitH',
  pp: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies-html/privacy/Pravacylatest.html?#PrivacyPolicy'
};

const Policy = ({ query }) => (
  <Fragment>
    <HeaderBar />
    <iframe src={url[query.name]} title={query.name} style={{ height: '100vh', width: '100vw', border: '0' }} />
    <FooterBar />
  </Fragment>
);

export default Policy;
