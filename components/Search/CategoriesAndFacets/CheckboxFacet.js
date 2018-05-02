import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

class CheckboxFacet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: props.selectedFilters || [],
    };
    this.onChangeItem = this.onChangeItem.bind(this);
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

  render() {
    const { filter } = this.props;
    const { selectedItems } = this.state;
    return (
      <li>
        <div>{filter.name}</div>
        <ul>
          {
            filter.children.map((childFitler) => (
              <Checkbox
                key={childFitler.id}
                onChange={this.onChangeItem({ name: childFitler.name, param: childFitler.param })}
                checked={selectedItems.indexOf(childFitler.name) != -1}
              >
                <li>
                  {childFitler.name}&nbsp;({childFitler.count})
                </li>
              </Checkbox>
            ))
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
  selectedFilters: []
};

export default CheckboxFacet;