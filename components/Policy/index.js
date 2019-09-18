import React, { Component, Fragment } from 'react';
import lang from '../../utils/language';
import HeaderBar from '../HeaderBar';
import FooterBar from '../Footer';

const Policy = ({ query }) => {
  const url = {
    'user-terms': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/tnc/${lang}/UserTermsAndConditions.html`,
    'cancellation-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/${lang}/UserBasicPolicies.html?#cancelationPolicy`,
    'return-and-exchange-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/${lang}/UserBasicPolicies.html?#exchangePolicy`,
    'return-and-refund-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/${lang}/UserBasicPolicies.html?#returnPolicy`,
    'warranty-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/${lang}/UserBasicPolicies.html?#warrantyPolicy`,
    // sp: '/static/docs/sp.pdf#toolbar=0&navpanes=0&view=FitH',
    'privacy-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/privacy/${lang}/UserPrivacyPolicy.html`,
    'cookie-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/cookie/${lang}/UserCookiePolicies.html`,
    'customer-delivery': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/delivery/${lang}/UserShippingDelivery.html`,
  };

  return (
    <iframe src={url[query.name]} title={query.name} style={{ height: '100vh', width: '100%', border: '0' }} />
  );
};

export default Policy;
