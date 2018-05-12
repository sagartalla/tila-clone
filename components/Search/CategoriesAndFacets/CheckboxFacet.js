import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

const MaxItems = 3;

class CheckboxFacet extends Component {
  constructor(props) {
    super(props);
    const { filter } = props;
    this.state = {
      selectedItems: props.selectedFilters || [],
      maxRows: MaxItems,
      isMoreButtonRequired: filter.children.length > MaxItems,
    };
    this.onChangeItem = this.onChangeItem.bind(this);
    this.toggleMore = this.toggleMore.bind(this);
  }

  onChangeItem(value) {
    return (e) => {
      const newSelectedItem = [...this.state.selectedItems];
      if (e.target.checked) {
        newSelectedItem.push(value.name);
      } else {
        newSelectedItem.splice(newSelectedItem.indexOf(value.name), 1);
      }
      this.setState({
        selectedItems: newSelectedItem,
      });
      this.props.onChangeHandle(value, e);
    };
  }

  toggleMore() {
    const { filter } = this.props;
    this.setState({
      maxRows: this.state.maxRows === filter.children.length ? MaxItems : filter.children.length
    });
  }

  render() {
    const { filter } = this.props;
    const { selectedItems } = this.state;
    return (
      <li>
        <div>{filter.name}</div>
        <ul>
          {
            filter.children.slice(0, this.state.maxRows).map(childFitler => (
              <li>
                <Checkbox
                  key={childFitler.id}
                  onChange={this.onChangeItem({ name: childFitler.name, param: childFitler.param })}
                  checked={selectedItems.indexOf(childFitler.name) !== -1}
                >
                  {childFitler.name}&nbsp;({childFitler.count})
                </Checkbox>
              </li>
            ))
          }
          {
            this.state.isMoreButtonRequired ?  <li onClick={this.toggleMore}><a>{this.state.maxRows === filter.children.length ? '- show less' : ' + show more'}</a></li> : null
          }
        </ul>
      </li>
    );
  }
}

CheckboxFacet.propTypes = {
  selectedFilters: PropTypes.array,
  onChangeHandle: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
};

CheckboxFacet.defaultProps = {
  selectedFilters: [],
};

export default CheckboxFacet;
