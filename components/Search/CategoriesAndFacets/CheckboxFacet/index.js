import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Panel, Heading, Body, Title } from 'react-bootstrap';
import SVGCompoent from '../../../common/SVGComponet';

import {languageDefinations} from '../../../../utils/lang';
import RenderFilterBar from './searchInput';

const {SEARCH_PAGE} = languageDefinations()
const MaxItems = 3;

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


class CheckboxFacet extends Component {
  constructor(props) {
    super(props);
    const { filter } = props;
    this.state = {
      selectedItems: props.selectedFilters || [],
      maxRows: MaxItems,
      isMoreButtonRequired: filter.children.length > MaxItems,
      filterItems: props.selectedFilters.length > 0 ?
      this.sortSelectedItems(props.selectedFilters): filter.children
    };

    this.onChangeItem = this.onChangeItem.bind(this);
    this.toggleMore = this.toggleMore.bind(this);
    this.onFilterData = this.onFilterData.bind(this);
  }
  sortSelectedItems(selectedItems) {
    const { filter } = this.props
    let children = filter.children.slice()
    let splicedElem = []

    children.forEach((item,index) => {
      if(selectedItems.indexOf(item.name) !== -1) {
          splicedElem.push(item)
          children.splice(index,1)
      }
    })
    return splicedElem.concat(children)
  }
  onFilterData(value) {
    const { filter } = this.props;
    let items = filter.children.filter((item) => {
      return item.name.toLowerCase().indexOf(value) !== -1
    })
    this.setState({
      filterItems:items
    })
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
      maxRows: this.state.maxRows === filter.children.length ? MaxItems : filter.children.length,
      filterItems:this.sortSelectedItems(this.state.selectedItems)
    });
  }

  componentWillReceiveProps(nextProps) {
    const { filter, attributeName } = this.props;
    const facets = JSON.parse(decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('facets').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || '{}');
    this.setState({
      isMoreButtonRequired: filter.children.length > MaxItems,
      selectedItems: (facets[attributeName] || []).map((f) => f.name),
    });
  }

  render() {
    const { filter, index, facets } = this.props;
    const { selectedItems, maxRows,filterItems } = this.state;
    return (
      <Panel eventKey={`${index + 'c'}`} key={filter.id}>
        <div className={`${styles['category-list']}`}>
          <Panel.Heading className={styles['category-list-head']}>
            <Panel.Title toggle className={`${styles['category-list-title']} ${styles['black-color']} ${styles['fontW600']} ${styles['flx-spacebw-alignc']}`}>
              {filter.name}
              <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible className={`${styles['border-b']}`}>
            { maxRows > 8  ?
              <RenderFilterBar
                onFilterData={this.onFilterData}
                placeName={`search ${filter.name}`}
              /> :
              null
            }
            <ul className={`${styles['category-sub-list']} ${styles['pl-20']} ${styles['pt-15']}`}>
              {
                filterItems.slice(0, maxRows).map(childFitler => (
                  <li key={childFitler.id} className={styles['category-sub-list-inn']}>
                    <div className={`${styles['checkbox-material']} ${styles['select-check-mate']}`}>
                      <input id={childFitler.param} type="checkbox" onChange={this.onChangeItem({ name: childFitler.name, param: childFitler.param })} checked={selectedItems.indexOf(childFitler.name) !== -1} />
                      <label htmlFor={childFitler.param} className={`${styles['fs-12']} ${styles['category-label']}`}> <span className={styles['category-span']}>{childFitler.name}</span> <span className={styles['thick-gry-clr']}>{childFitler.count ? `${childFitler.count}` : ''}</span> </label>
                    </div>
                  </li>
                ))
              }
              {
                this.state.isMoreButtonRequired ? <li onClick={this.toggleMore}><a>{maxRows === filter.children.length ? `-${SEARCH_PAGE.SHOW_LESS}` : `+ ${SEARCH_PAGE.SHOW_MORE}`}</a></li> : null
              }
            </ul>
          </Panel.Body>
        </div>
      </Panel>
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
