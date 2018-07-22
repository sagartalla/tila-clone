import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

const addToCompare = ({ itemType, productId }) => {
  if(localStorage){
    const compareItems = JSON.parse(localStorage.getItem('compare'));
    if(compareItems.length) {
      if (compareItems[0].itemType === itemType && compareItems.length < 4) {
        localStorage.setItem('compare', JSON.stringify([ ...compareItems, {
          itemType,
          productId,
        }]));
        return Promise.resolve({
          count: compareItems + 1
        });
      } else if(compareItems.length >= 4) {
        return Promise.reject({
          error: 'Only four items can be compared at a time'
        });
      } else {
        return Promise.reject({
          error: 'Only similar item types can be compared'
        });
      }
    } else {
      localStorage.setItem('compare', JSON.stringify([{
        itemType,
        productId,
      }]));
      return Promise.resolve({
        count: 1
      });
    }
  }
}

export default { addToCompare };
