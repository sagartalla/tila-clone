import React, { Component, Fragment } from 'react';

import HeaderBar from '../HeaderBar';
import FooterBar from '../Footer';

const url = {
  'user-terms-and-conditions': 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/tnc/en/UserTermsAndConditions.html',
  'cancellation-policy': 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/en/UserBasicPolicies.html?#cancelationPolicy',
  'exchange-replacement-policy': 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/en/UserBasicPolicies.html?#exchangePolicy',
  'return-refund-policy': 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/en/UserBasicPolicies.html?#returnPolicy',
  'warranty-policy': 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/en/UserBasicPolicies.html?#warrantyPolicy',
  // sp: '/static/docs/sp.pdf#toolbar=0&navpanes=0&view=FitH',
  'privacy-policy': 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/privacy/en/UserPrivacyPolicy.html',
  'cookie-policy': 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/cookie/en/UserCookiePolicies.html',
};

const Policy = ({ query }) => (
  <Fragment>
    <HeaderBar />
    <iframe src={url[query.name]} title={query.name} style={{ height: '100vh', width: '100%', border: '0' }} />
    <FooterBar />
  </Fragment>
);

export default Policy;
