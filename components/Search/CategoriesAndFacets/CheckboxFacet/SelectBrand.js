import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import { Checkbox, Modal, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { decode, encode, addUrlProps, replaceInUrlQuery } from 'react-url-query';
import { bindActionCreators } from 'redux';
import Button from '../../../common/CommonButton';
import { actionCreators, selectors } from '../../../../store/search';
import lang from '../../../../utils/language';
import RenderFilterBar from './searchInput';
import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';
import { languageDefinations } from '../../../../utils/lang';

const { SEARCH_PAGE } = languageDefinations();

/* eslint-disable */
const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const alphabetList = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
class SelectBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAlphabet: '',
      alphabets: alphabetList,
      filterParam: '',
      newFilteredList: [],
      requiredData: {},
      selectedItems: props.selectedItems,
      submitQuery: null,
    };
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.resetSelectedFilters = this.resetSelectedFilters.bind(this); 
  }

  componentDidMount() {
    const { filteredItems } = this.props;
    const { alphabets, requiredData } = this.state;
      filteredItems.length > 0 && filteredItems.forEach(childfilter => {
        const letter = childfilter.name.match(/^\d/) ? '#' : childfilter.name[0].toUpperCase()
        if (!requiredData[letter]) {
          requiredData[letter] = [];
        }
        requiredData[letter].push(childfilter);
      });
      this.setState({
        requiredData,
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      requiredData: {},
    }, () => {
      const { filteredItems } = this.props;
      const { alphabets, requiredData } = this.state;
        filteredItems.length > 0 && filteredItems.forEach(childfilter => {
          const letter = childfilter.name.match(/^\d/) ? '#' : childfilter.name[0].toUpperCase()
          if (!requiredData[letter]) {
            requiredData[letter] = [];
          }
          requiredData[letter].push(childfilter);
        });
        this.setState({
          requiredData,
        });
    })
  }

  setSelectedAlphabet = (e) => {
    let hashval = e.target.getAttribute('href');
    let target = document.querySelector(hashval);
    target !== null && target.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
    })
    history.pushState(null, null, hashval);
    e.preventDefault();
    this.setState({
      selectedAlphabet: e.target.innerText,
    });
  }

  filterItems = (value) => {
    this.setState({
      selectedAlphabet: '',
    });
  }

  applyFilters = () => {
    const { submitQuery } = this.state;
    this.props.onChangeFacets(submitQuery);
    this.submitQuery(submitQuery);
    this.props.closePopup();    
  }

  submitQuery(params) {
    this.props.getSearchResults(this.props.getFacetfilters(params));
  }

  
  onChangeCheckbox = (value) => (e) => {
    const { filter } = this.props;
    const newSelectedItem = [...this.state.selectedItems];
    if (e.target.checked) {
      newSelectedItem.push(value.name);
    } else {
      newSelectedItem.splice(newSelectedItem.indexOf(value.name), 1);
    }
    this.setState({
      selectedItems: newSelectedItem,
    });
    this.onHandleChange(value, e, filter);
  }

  onHandleChange(value, e, filter) {
    const { facets } = this.props;
    const params = facets;
    params[filter.attributeName] = params[filter.attributeName] || [];
    digitalData.filter.leftnavfilters = `${filter.attributeName}:${value.name}`;
    if (e.target.checked) {
      params[filter.attributeName].push(value.name);
    } else {
      params[filter.attributeName] = params[filter.attributeName].filter((item) => item !== value.name)
      if (!params[filter.attributeName].length) { delete params[filter.attributeName]; }
    }
    this.setState({
      submitQuery: params,
    });
  }


  resetSelectedFilters() {
    const { facets } = this.props;
    const { filter } = this.props;
    const params = facets || {};
    delete params[filter.attributeName];
    this.setState({
      submitQuery: params,
      selectedItems: [],
    });
  }

  render() {
    const {
      showPopup,
      filteredItems,
      filter,
    } = this.props;
    const {
      selectedAlphabet,
      alphabets,
      filterParam,
      requiredData,
      selectedItems,      
    } = this.state;
    return (
      <div className={`${styles.flex} ${styles['align-center']}`}>
        {showPopup &&
          <div className={`${styles.width100}`}>
            <div className={`${styles['m-30']}`}>
              <div>
                  <div className={`${styles['flex-center']} ${styles['main-popup']} ${styles['justify-between']}`}>
                    <RenderFilterBar
                      onFilterData={this.props.onFilterData}
                      placeName={`Search ${filter.name}`}
                    />
                    <div className={`${styles.flex} ${styles['align-center']}`}>
                      {alphabets.map(alphabet => (
                        <div className={`${styles['ml-5']} ${styles['label-gry-clr']} ${styles.fontW600}`}>
                          <a
                            href={`#${alphabet === '#' ? 'A' : alphabet}`}
                            style={{ 'text-decoration': 'none', color: '#666' }}
                            onClick={this.setSelectedAlphabet}
                            className={`${selectedAlphabet === alphabet && styles.active}`}
                          >
                            {alphabet}
                          </a>
                        </div>
                      ))}
                    </div>
                    <Button
                      btnText={SEARCH_PAGE.APPLY_FILTERS}
                      onClick={this.applyFilters}
                      className={`${styles['border-left']} ${styles['width15']}`}
                    />
                    <span className={`${styles['fs-30']} ${styles.pointer}`} onClick={this.props.closePopup}>&times;</span>
                  </div>
                  <div className={`${styles['brands-list']}`}>
                    <div className={selectedItems && selectedItems.length > 0 && `${styles['select-checkbox-width']} ${styles['mt-10']}`}>
                      {showPopup && selectedItems && selectedItems.length > 0 &&
                      <span>
                        <span className={selectedItems && selectedItems.length > 0 && `${styles.fontW800} ${styles['fs-12']}`}>MY SELECTIONS</span>
                        <span param={filterParam} className={`${styles.fontW600} ${styles['ml-30']} ${styles['text-blue']} ${styles['fs-12']}`} onClick={this.resetSelectedFilters}>RESET</span>
                      </span>
                          }
                    </div>
                    <React.Fragment >
                      {showPopup && selectedItems && selectedItems.length > 0 && selectedItems.map(val => (
                        <React.Fragment>
                          {filteredItems.length > 0 && filteredItems.map((childfilter, index) => (
                            childfilter.name === val &&
                            <div className={`${styles['checkbox-material']} ${styles['select-check-mate']} ${styles['select-checkbox-width']} ${styles['mt-10']}`}>
                              <input id={childfilter.name} type="checkbox" onChange={this.onChangeCheckbox({ name: childfilter.name, param: childfilter.param })} checked={selectedItems && selectedItems.length > 0 && selectedItems.indexOf(childfilter.name) !== -1} />
                              <label htmlFor={childfilter.name} className={`${styles['fs-12']} ${styles['category-label']} ${styles['label-ellipsis']}`} title={childfilter.name}>
                                <span className={`${styles['category-span']} ${styles.fontW700}`}>{val}
                              </span>
                              </label>
                            </div>

                          ))}
                        </React.Fragment>
                                ))}
                      {
                          Object.keys(requiredData).map(val => (
                            <React.Fragment>
                            <div id={`${val === '#' ? 'A' : val}`} className={selectedAlphabet === val ? `${styles['mt-10']} ${styles['select-checkbox-width']} ${styles.fontW800}` : `${styles['mt-10']} ${styles['select-checkbox-width']} ${styles['thick-gry-clr']} ${styles.fontW600}` }>{val}</div>
                            {requiredData[val].map((newVal, index) => (
                              <div className={`${styles['mt-10']} ${styles['checkbox-material']} ${styles['select-check-mate']} ${styles['select-checkbox-width']}`}>
                              <input id={newVal.name} type="checkbox" onChange={this.onChangeCheckbox({ name: newVal.name, param: newVal.param })} checked={selectedItems && selectedItems.length > 0 && selectedItems.indexOf(newVal.name) !== -1} />
                              <label htmlFor={newVal.name} className={`${styles['fs-12']} ${styles['category-label']} ${styles['label-ellipsis']}`} title={newVal.name}>
                                <span className={(newVal.name.toLowerCase().startsWith(selectedAlphabet !== '' && selectedAlphabet.toLowerCase())) || (selectedAlphabet === '#' && newVal.name.match(/^\d/)) ? `${styles.fontW800} ${styles['category-span']}` : `${styles['category-span']} ${styles['thick-gry-clr']} ${styles.fontW700}`}>{newVal.name}
                                  <span className={styles['thick-gry-clr']}>{newVal.count ? `(${newVal.count})` : ''}</span>
                                </span>
                              </label>
                              </div>
                            ))}                        
                          </React.Fragment>
                          ))
                        }
                    </React.Fragment>
                  </div>
                </div>
            </div>
          </div>}
      </div>
    );
  }
}


const mapStateToProps = store => ({
  facetData: selectors.facetData(store),
  getFacetfilters: selectors.getFacetfilters(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
    },
    dispatch,
  );

SelectBrand.propTypes = {
  data: PropTypes.instanceOf(Array),
  handleSelectedData: PropTypes.func.isRequired,
};

SelectBrand.defaultProps = {
  data: [],
};

function mapUrlToProps(url, props) {
  return {
    facets: decode(d => JSON.parse(d || '{}'), url.facets),
  };
}

const mapUrlChangeHandlersToProps = props => ({
  onChangeFacets: value => replaceInUrlQuery('facets', encode((e) => JSON.stringify(e || {}), value)),
});

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(connect(mapStateToProps, mapDispatchToProps)(SelectBrand));

