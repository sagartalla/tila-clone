import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

//TODO accept params
const getMegamenu = () => axios.get(`${constants.CATEGORYTREE_API_URL}/mega-menu/1.0.4/KSA/tree?lang=EN`);

export default { getMegamenu };
