import React, { Component } from 'react';

import 'react-placeholder/lib/reactPlaceholder.css';
import { searchPlaceHolder, productPlaceHolder } from './skeletonPlaceHolder';

class SkeletonLoader extends Component {
  getPlaceHolder = (pathname) => {
    if (pathname.split('/')[1] === 'search') {
      return searchPlaceHolder;
    } else if (pathname.split('/')[1] === 'product') {
      return productPlaceHolder;
    } else if (pathname.split('/')[1] === 'srp') {
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
