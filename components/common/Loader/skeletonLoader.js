import React, { Component } from 'react';

import 'react-placeholder/lib/reactPlaceholder.css';
import { searchPlaceHolder, productPlaceHolder } from './skeletonPlaceHolder';

class SkeletonLoader extends Component {
  getPlaceHolder = (pathname) => {
    switch (pathname) {
      case '/search':
        return searchPlaceHolder;
        break;
      case '/product':
        return productPlaceHolder;
      case '/srp':
        return searchPlaceHolder;
        break;
      default:
    }
  }

  render() {
    const { loadComponent, children, pathname } = this.props;
    return (
      <div>
        {!loadComponent ? children : this.getPlaceHolder(pathname)}
      </div>
    );
  }
}
export default SkeletonLoader;
