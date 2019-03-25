import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Panel, Heading, Body, Title } from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');
import {languageDefinations} from '../../../utils/lang';
const {SEARCH_PAGE} = languageDefinations()
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
    const { selectedItems } = this.state;
    return (
      <Panel eventKey={`${index + 'c'}`} key={filter.id}>
        <div className={`${styles['category-list']}`}>
          <Panel.Heading>
            <Panel.Title toggle className={`${styles['category-list-title']} ${styles['black-color']} ${styles['fontW600']} ${styles['p-10-20']} ${styles['flx-spacebw-alignc']}`}>
              {filter.name}
              <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible className={`${styles['border-b']}`}>
            <ul className={`${styles['category-sub-list']} ${styles['pl-20']} ${styles['pt-15']}`}>
              {
                filter.children.slice(0, this.state.maxRows).map(childFitler => (
                  <li key={childFitler.id} className={styles['category-sub-list-inn']}>
                    <div className={`${styles['checkbox-material']} ${styles['select-check-mate']}`}>
                      <input id={childFitler.name} type="checkbox" onChange={this.onChangeItem({ name: childFitler.name, param: childFitler.param })} checked={selectedItems.indexOf(childFitler.name) !== -1} />
                      <label htmlFor={childFitler.name} className={`${styles['fs-12']} ${styles['category-label']}`}> <span className={styles['category-span']}>{childFitler.name}</span> <span>{childFitler.count ? `(${childFitler.count})` : ''}</span> </label>
                    </div>
                  </li>
                ))
              }
              {
                this.state.isMoreButtonRequired ? <li onClick={this.toggleMore}><a>{this.state.maxRows === filter.children.length ? `-${SEARCH_PAGE.SHOW_LESS}` : `+ ${SEARCH_PAGE.SHOW_MORE}`}</a></li> : null
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
