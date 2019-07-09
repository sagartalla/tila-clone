import React, { Component } from 'react';
import { searchPlaceHolder, productPlaceHolder, couponPlaceHolder, cartPlaceHolder, camProfileHolder } from './skeletonPlaceHolder';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class SkeletonLoader extends Component {
  getPlaceHolder = (pathname) => {
    if (pathname.split('?')[0] === `/${country}/${language}/search`) {
      return searchPlaceHolder;
    } else if (pathname.split('?')[0] === `/${country}/${language}/product`) {
      return productPlaceHolder;
    } else if (pathname.split('?')[0] === `/${country}/${language}/srp`) {
      return searchPlaceHolder;
    } else if (pathname.split('?')[0] === `/${country}/${language}/cam/mycoupons`) {
      return couponPlaceHolder;
    } else if (pathname.split('?')[0] === `/${country}/${language}/cart`) {
      return cartPlaceHolder;
    } else if (pathname.split('?')[0] === `/${country}/${language}/payment`) {
      return cartPlaceHolder;
    } else if (pathname.split('?')[0] === `/${country}/${language}/cam/profile`) {
      return camProfileHolder;
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
