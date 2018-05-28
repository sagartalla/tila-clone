import _ from 'lodash';
import { categoryServiceInstance } from '../helper/services';
//TODO accept params
const getMegamenu = () => categoryServiceInstance.get('/master/1.0.3/ANY/mega-menu?lang=EN');

export default { getMegamenu };
