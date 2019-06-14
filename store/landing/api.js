import _ from 'lodash';
import {pimServiceInstance} from '../helper/services';
import axios from 'axios';
import constants from '../helper/constants';

const getPage = ({page, id}) => axios.get(`${constants.PCM_URL}/cms/brandPage`);

export default { getPage };
