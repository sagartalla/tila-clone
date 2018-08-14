import { languageDefinations } from '../../utils/lang';
const { PDP_PAGE } = languageDefinations();

const TABS = {
  ALL: {
    label: PDP_PAGE.REVIEW_ALL_TAB,
    id: 'ALL',
    param: 'all',
  },
  EXPERT: {
    label: PDP_PAGE.REVIEW_EXPERT_TAB,
    id: 'EXPERT',
    param: 'expert',
  },
  MOST_HELPFUL: {
    label: PDP_PAGE.REVIEW_MOST_HELPFUL_TAB,
    id: 'MOST_HELPFUL',
    param: 'mostRelevant',
  },
  MOST_RECENT: {
    label: PDP_PAGE.REVIEW_MOST_RECENT_TAB,
    id: 'MOST_RECENT',
    param: 'mostRecent',
  }
}

export { TABS };
