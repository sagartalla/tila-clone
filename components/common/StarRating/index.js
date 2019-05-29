import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Star from './Star';

export default class StarRating extends Component {
  state = {
    rating: this.props.rating,
    lastRating: this.props.rating,
    isRating: false,
  }

  onRate = rating => (e) => {
    this.setState({
      rating,
      lastRating: rating,
      isRating: false,
    });
    const { onRate: callback } = this.props;
    if (callback) callback(e, rating);
  }

  onCancelRate = () => {
    const { lastRating: rating } = this.state;
    this.setState({
      rating,
      isRating: false,
    });
  }

  willRate = rating => () => {
    this.setState({
      rating,
      isRating: true,
    });
  }

  render() {
    let {
      total, children, interactive, clsStyl, clsName, ...restProps
    } = this.props;
    const { rating, isRating } = this.state;
    children = Children.toArray(children);

    const nodes = Array(...Array(total)).map((_, i) => {
      const starProps = {
        isActive: !isRating && rating - i >= 1,
        willBeActive: isRating && i < rating,
        isDisabled: !interactive,
      };
      return (
        <div
          key={`star_${i}`}
          onClick={interactive ? this.onRate((i + 1)) : null}
          onMouseOver={interactive ? this.willRate((i + 1)) : null}
        >
          {
          children.length ? (
            React.cloneElement(children[i % children.length], starProps)
          ) : (
            <Star clsStyl={clsStyl} clsName={clsName} {...starProps} />
          )
        }

        </div>
      );
    });
    if (interactive) {
      return (
        <div
          style={{ display: 'flex' }}
          className="react-rater"
          onMouseOut={this.onCancelRate}
          {...restProps}
        >
          { nodes }
        </div>
      );
    }
    return (
      <div
        style={{ display: 'flex' }}
        {...restProps}
      >
        {nodes}
      </div>
    );
  }
}

StarRating.propTypes = {
  total: PropTypes.number,
  rating: PropTypes.number,
  onRate: PropTypes.func.isRequired,
  onRating: PropTypes.func.isRequired,
  clsStyl: PropTypes.object,
  interactive: PropTypes.bool,
};

StarRating.defaultProps = {
  total: 5,
  rating: 0,
  interactive: true,
  clsStyl: { width: '25px', marginRight: '15px' },
};
