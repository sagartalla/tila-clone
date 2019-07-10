import React, { Component } from 'react';
import { searchPlaceHolder, productPlaceHolder, couponPlaceHolder, cartPlaceHolder, camProfileHolder } from './skeletonPlaceHolder';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class SkeletonLoader extends Component {
  getPlaceHolder = (pathname) => {
    switch (pathname.split('?')[0]) {
      case `/${country}/${language}/search`:
        return searchPlaceHolder
        break;
      case `/${country}/${language}/product`:
        return productPlaceHolder
        break;
      case `/search`:
        return searchPlaceHolder
        break;
      case `/${country}/${language}/srp`:
        return searchPlaceHolder
        break;
      case `/${country}/${language}/cam/mycoupons`:
        return couponPlaceHolder
        break;
      case `/product`:
        return productPlaceHolder
        break;
      case `/${country}/${language}/cart`:
        return cartPlaceHolder
        break;
      case `/${country}/${language}/payment`:
        return cartPlaceHolder
        break;
      case `/${country}/${language}/cam/profile`:
        return camProfileHolder
        break;
      default:

    }
    
  }

  render() {
    const { loadComponent, children, pathname } = this.props;
    return (
      <div>
        {loadComponent ? this.getPlaceHolder(pathname) : children}
      </div>
    );
  }
}
export default SkeletonLoader;
