import React, { Component } from 'react';
import { searchPlaceHolder, productPlaceHolder } from './skeletonPlaceHolder';
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
