import React, { Component } from 'react';
import { searchPlaceHolder, productPlaceHolder, couponPlaceHolder, cartPlaceHolder, camProfileHolder, camOrdersHolder, homePageHolder } from './skeletonPlaceHolder';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const language = cookies.get('language') || 'ar';
const country = cookies.get('country') || 'SAU';

class SkeletonLoader extends Component {
  getPlaceHolder = (pathname) => {
    switch (pathname.split('?')[0]) {
      case `/${language}/search`:
        return searchPlaceHolder
      case `/${language}/product`:
        return productPlaceHolder
      case /pdp/.test(`/${language}/pdp`):
        return productPlaceHolder
      case `/search`:
        return searchPlaceHolder
      case `/${language}/srp`:
        return searchPlaceHolder
      case `/${language}/customer/mycoupons`:
        return couponPlaceHolder
      case `/product`:
        return productPlaceHolder
      case `/${language}/cart`:
        return cartPlaceHolder
      case `/${language}/payment`:
        return cartPlaceHolder
      case `/${language}/customer/profile`:
        return camProfileHolder
      case `/profile`:
          return camProfileHolder
      case `/customer`:
          return camProfileHolder
      case `/cart`:
          return cartPlaceHolder
      case `/${language}`:
        return homePageHolder
      case `/${language}/landing/electronics`:
        return homePageHolder
      case `/${language}/landing/fashion`:
        return homePageHolder
      case `/${language}/landing/lifestyle`:
        return homePageHolder
      case `/`:
        return homePageHolder
      // case `/${language}/customer/orders`:
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
