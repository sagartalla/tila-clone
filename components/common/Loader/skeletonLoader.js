import React,{Component} from 'react'

import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css';
import {searchPlaceHolder, productPlaceHolder} from './skeletonPlaceHolder';

class SkeletonLoader extends Component {

  getPlaceHolder = (pathname) => {
    switch (pathname) {
      case '/search':
        return searchPlaceHolder
        break;
      case '/product':
        return productPlaceHolder
      case '/srp':
        return searchPlaceHolder
        break;
      default:
    }
  }

  render() {
    const { loadComponent, children,pathname } = this.props;
    return (
      <div>
        <ReactPlaceholder
          customPlaceholder={this.getPlaceHolder(pathname)}
          ready={!loadComponent}
          showLoadingAnimation={true}
        >
        {children}
        </ReactPlaceholder>
      </div>
    )
  }
}
export default SkeletonLoader
