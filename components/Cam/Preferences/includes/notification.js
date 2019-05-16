import { languageDefinations } from '../../../../utils/lang/';

const { PREFERENCES } = languageDefinations();

export const settingValues = [{
  title: 'Push Notifications',
  value: 'PUSH',
},
{
  title: 'Email Notifications',
  value: 'EMAIL',
},
{
  title: 'SMS Notifications',
  value: 'SMS',
}];

export const Preferences = {
  ACTIVITY_ALERT: {
    heading: PREFERENCES.ACTIVITY_ALERT_HEADING,
    subheading: PREFERENCES.ACTIVITY_ALERT_SUB,
  },
  TILA_NEWSLETTER: {
    heading: PREFERENCES.TILA_NEWSLETTER_HEADING,
    subheading: PREFERENCES.TILA_NEWSLETTER_SUB,
  }, 
  OFFER_AND_COUPON: {
    heading: PREFERENCES.OFFER_AND_COUPON_HEADING,
    subheading: PREFERENCES.OFFER_AND_COUPON_SUB,
  },
  SALE_EVENT_AND_CAMPAIGN_UPDATE: {
    heading: PREFERENCES.SALE_EVENT_AND_CAMPAIGN_UPDATE_HEADING,
    subheading: PREFERENCES.SALE_EVENT_AND_CAMPAIGN_UPDATE_SUB,
  },
  FEEDBACK_SURVEY_AND_PRODUCT_REVIEW: {
    heading: PREFERENCES.FEEDBACK_SURVEY_AND_PRODUCT_REVIEW_HEADING,
    subheading: PREFERENCES.FEEDBACK_SURVEY_AND_PRODUCT_REVIEW_SUB,
  },
};
