import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

//TODO accept params
const getMegamenu = () => axios.get(`${constants.CATEGORYTREE_API_URL}/master/1.0.3/ANY/mega-menu?lang=EN`);

export default { getMegamenu };
