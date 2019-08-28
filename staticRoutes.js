const axios = require('axios');

const staticRoutes = (req, res) => {
  const lang = req.universalCookies.get('language');
  const urlObj = {
    'user-terms-and-conditions': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/tnc/${lang}/UserTermsAndConditions.html`,
    'cancellation-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/${lang}/UserBasicPolicies.html?#cancelationPolicy`,
    'exchange-replacement-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/${lang}/UserBasicPolicies.html?#exchangePolicy`,
    'return-refund-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/${lang}/UserBasicPolicies.html?#returnPolicy`,
    'warranty-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/basic_policies/${lang}/UserBasicPolicies.html?#warrantyPolicy`,
    'privacy-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/privacy/${lang}/UserPrivacyPolicy.html`,
    'cookie-policy': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/cookie/${lang}/UserCookiePolicies.html`,
    'customer-delivery': `https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/policies/user/delivery/${lang}/UserShippingDelivery.html`,
  };

  const urlSplit = req.originalUrl.split('/');
  axios.get(urlObj[urlSplit[urlSplit.length - 1]]).then((resp) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(resp.data);
    res.end();
  });
};


module.exports = staticRoutes;
