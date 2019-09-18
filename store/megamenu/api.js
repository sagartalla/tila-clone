import axios from 'axios';
import Cookies from 'universal-cookie';
import constants from '../helper/constants';

const cookies = new Cookies();

// TODO accept params
const getMegamenu = () => axios.get(`${constants.CATEGORYTREE_API_URL}/mega-menu/tree?fl=itemColor,sid&countryCode=${cookies.get('country') || 'SAU'}&lang=${cookies.get('language')}&isListed=true`).catch(() => ({
  data: [],
}));

const track = (params) => {
    window.appEventData.push({
      event: params.eventName,
      product: [
        {
          productInfo: {
            // "pageName":params.titleInfo.title,
            tree: params,
          },
        },
      ],
    });
  };

export default { getMegamenu , track };
