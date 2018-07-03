import { languageDefinations } from '../../utils/lang';
const { PDP } = languageDefinations();

const TABS = {
  ALL: {
    label: PDP.REVIEW_ALL_TAB,
    id: 'ALL',
    param: 'all',
  },
  EXPERT: {
    label: PDP.REVIEW_EXPERT_TAB,
    id: 'EXPERT',
    param: 'expert',
  },
  MOST_HELPFUL: {
    label: PDP.REVIEW_MOST_HELPFUL_TAB,
    id: 'MOST_HELPFUL',
    param: 'mostRelevant',
  },
  MOST_RECENT: {
    label: PDP.REVIEW_MOST_RECENT_TAB,
    id: 'MOST_RECENT',
    param: 'mostRecent',
  }
}

export { TABS };
