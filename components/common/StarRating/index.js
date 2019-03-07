import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Star from './Star';

export default class StarRating extends Component {
  state = {
    rating:this.props.rating,
    lastRating:this.props.rating,
    isRating:false
  }
  willRate = (rating) => (e) => {
    this.setState({
      rating,
      isRating:true
    })
  }
  onRate = (rating) => (e) => {
    this.setState({
      rating,
      lastRating:rating,
      isRating:false
    })
    const {onRate:callback} = this.props;
    callback && callback(e,rating)
  }
  onCancelRate = () => {
    let { lastRating:rating } = this.state
    this.setState({
        rating,
        isRating:false
      })
  }

  render() {
    let { total,children,interactive,clsStyl,  ...restProps} = this.props
    let { rating, isRating } = this.state;
    children = Children.toArray(children)

    let nodes = Array.apply(null,Array(total)).map((_,i) => {
      let starProps = {
        isActive:!isRating && rating - i >= 1,
        willBeActive:isRating && i < rating,
        isDisabled:!interactive
      }
      return (
        <div
         key={`star_${i}`}
         onClick={interactive ? this.onRate((i + 1)) : null}
         onMouseOver={interactive ? this.willRate((i + 1)):null}
        >
        {
          children.length ? (
            React.cloneElement(children[i % children.length], starProps)
          ):(
            <Star clsStyl={clsStyl} {...starProps} />
          )
        }

       </div>
      )
    })
    if(interactive) {
      return (
        <div
         style={{display:'flex'}}
         className='react-rater'
         onMouseOut={this.onCancelRate}
         {...restProps}
        >
          { nodes }
        </div>
      )
    } else {
      return (
        <div
        style={{display:'flex'}}
        {...restProps}>
          {nodes}
        </div>
      )

    }
  }
}

StarRating.PropTypes = {
  total:PropTypes.number,
  rating:PropTypes.number,
  onRate:PropTypes.func,
  onRating:PropTypes.func
}

StarRating.defaultProps = {
  total:5,
  rating:0,
  interactive:true
}
