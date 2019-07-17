import React, { Component } from 'react';
import { searchPlaceHolder, productPlaceHolder, couponPlaceHolder, cartPlaceHolder, camProfileHolder, camOrdersHolder, homePageHolder } from './skeletonPlaceHolder';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class SkeletonLoader extends Component {
  getPlaceHolder = (pathname) => {
    switch (pathname.split('?')[0]) {
      case `/${country}/${language}/search`:
        return searchPlaceHolder
      case `/${country}/${language}/product`:
        return productPlaceHolder
      case `/search`:
        return searchPlaceHolder
      case `/${country}/${language}/srp`:
        return searchPlaceHolder
      case `/${country}/${language}/cam/mycoupons`:
        return couponPlaceHolder
      case `/product`:
        return productPlaceHolder
      case `/${country}/${language}/cart`:
        return cartPlaceHolder
      case `/${country}/${language}/payment`:
        return cartPlaceHolder
      case `/${country}/${language}/customer/profile`:
        return camProfileHolder
      case `/profile`:
          return camProfileHolder
      case `/cam`:
          return camProfileHolder
      case `/cart`:
          return cartPlaceHolder
      case `/${country}/${language}`:
        return homePageHolder
      case `/${country}/${language}/landing/electronics`:
        return homePageHolder
      case `/${country}/${language}/landing/fashion`:
        return homePageHolder
      case `/${country}/${language}/landing/lifestyle`:
        return homePageHolder
      case `/`:
        return homePageHolder
      // case `/${country}/${language}/cam/orders`:
      //   return camOrdersHolder
      //   break;
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
