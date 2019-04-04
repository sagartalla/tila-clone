import constants from '../store/helper/constants';
import axios from 'axios';

const generateURL = (documentId) => {
  const urlReady = new Promise((res, rej) => {
    axios.get(`${constants.TRANSFORMER_API_URL}/fpts/document-service/download/${documentId}`, {
      responseType:"blob",
      headers: {
        tenant: 'profile-service'
      }
    }).then((document) => {
      var reader = new window.FileReader();
      reader.onload = function() {
        res(reader.result);
      }
      reader.readAsDataURL(document.data);
    }, (err) => {
      rej(err);
    });
  });
  return urlReady;
}

export default generateURL;
