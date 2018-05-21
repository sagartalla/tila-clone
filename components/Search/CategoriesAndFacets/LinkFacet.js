import React, { Component } from 'react';
import { Link } from '../../../routes';

const MaxItems = 3;

class LinkFacet extends Component {
  constructor(props){
    super(props);
    const { filter } = props;
    this.state = {
      maxRows: MaxItems,
      isMoreButtonRequired: filter.children.length > MaxItems,
    };
    this.toggleMore = this.toggleMore.bind(this);
  }

  toggleMore() {
    const { filter } = this.props;
    this.setState({
      maxRows: this.state.maxRows === filter.children.length ? MaxItems : filter.children.length
    });
  }

  componentWillReceiveProps() {
    const { filter } = this.props;
    this.setState({
      isMoreButtonRequired: filter.children.length > MaxItems,
    });
  }

  render() {
    const { filter } = this.props;
    return (
      <li>
        <div>{filter.name}</div>
        <ul>
          {
            filter.children.slice(0, this.state.maxRows).map((category) => {
              return (
                <li key={category.id}>
                  <Link route={`/${category.canonicalId}-${category.id}/${window.location.search}`}>{category.name}</Link>
                  <ul>
                    {
                      category.children.map((subcategory) => {
                        return (
                          <li key={subcategory.id}>
                            <Link route={`/${category.canonicalId}-${category.id}/${subcategory.canonicalId}-${subcategory.id}/${window.location.search}`}>{subcategory.name}</Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              );
            })
          }
          {
            this.state.isMoreButtonRequired ? <li onClick={this.toggleMore}><a>{this.state.maxRows === filter.children.length ? '- show less' : ' + show more'}</a></li> : null
          }
        </ul>
      </li>
    );
  }
}

export default LinkFacet;