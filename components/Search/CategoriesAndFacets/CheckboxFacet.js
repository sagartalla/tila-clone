import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

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

  componentWillReceiveProps() {
    const { filter } = this.props;
    this.setState({
      isMoreButtonRequired: filter.children.length > MaxItems,
    });
  }
 
  render() {
    const { filter } = this.props;
    const { selectedItems } = this.state;
    return (
      <li className={`${styles['category-list']}`}>
        <div className={`${styles['category-list-title']} ${styles['black-color']} ${styles['fontW600']} ${styles['p-10-20']} ${styles['flx-spacebw-alignc']}`}>
          {filter.name}
          <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
        </div>
        <ul className={`${styles['category-sub-list']}`}>
          {
            filter.children.slice(0, this.state.maxRows).map(childFitler => (
              <li key={childFitler.id} className={styles['category-sub-list-inn']}>
                {/* <Checkbox
                  onChange={this.onChangeItem({ name: childFitler.name, param: childFitler.param })}
                  checked={selectedItems.indexOf(childFitler.name) !== -1}
                >
                  <span><span>{childFitler.name}</span><span>({childFitler.count})</span></span>
                </Checkbox> */}
                <div className={styles['checkbox-material']}>
                  <input id={childFitler.name} type="checkbox" onChange={this.onChangeItem({ name: childFitler.name, param: childFitler.param })} checked={selectedItems.indexOf(childFitler.name) !== -1}/> 
                  <label for={childFitler.name} className={styles['fs-12']}> {childFitler.name} <span>({childFitler.count})</span> </label>
                </div>
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
