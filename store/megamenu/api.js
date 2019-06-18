import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

//TODO accept params
const getMegamenu = () => axios.get(`${constants.CATEGORYTREE_API_URL}/mega-menu/tree?countryCode=${cookies.get('country') || 'SAU'}&lang=${cookies.get('language')}&isListed=false`);
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
const getMegamenu = () => axios.get(`${constants.CATEGORYTREE_API_URL}/mega-menu/tree?fl=itemColor&countryCode=${cookies.get('country') || 'SAU'}&lang=${cookies.get('language')}&isListed=false`);

export default { getMegamenu,track };
