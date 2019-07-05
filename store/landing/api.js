import axios from 'axios';

import constants from '../helper/constants';

// const getPage = ({page, id}) => axios.get(`${constants.PCM_URL}/cms/${page}`);
const getPage = ({ page, id, published = true }) => axios.get(`${constants.PCM_URL}/cms/${page}?id_attribute=${id}&published=${published}`);

export default { getPage };
