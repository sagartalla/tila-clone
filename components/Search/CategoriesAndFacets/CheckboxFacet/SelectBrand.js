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
    };
  }

  componentDidMount() {
    debugger;
    const { filteredItems } = this.props;
    const { alphabets, requiredData } = this.state;
      filteredItems.length > 0 && filteredItems.forEach(childfilter => {
          if (childfilter.name.match(/^\d/)) {
            requiredData['#'] = [childfilter];
          } else if (childfilter.name[0].toUpperCase()) {
            requiredData[childfilter.name[0]] = [childfilter];
          }
        })
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
            if (childfilter.name.match(/^\d/)) {
              requiredData['#'] = [childfilter];
            } else if (childfilter.name[0].toUpperCase()) {
              requiredData[childfilter.name[0]] = [childfilter];
            }
          })
        this.setState({
          requiredData,
        });
    })
  }

  setSelectedAlphabet = (e) => {
    this.setState({
      selectedAlphabet: e.target.innerText,
    });
  }

  filterItems = (value) => {
    this.setState({
      selectedAlphabet: '',
    });
  }

  submitQuery = (params) => {
    this.props.getSearchResults(this.props.getFacetfilters(params));
  }

  resetSelectedFilters = () => {
    const { appliedFilters } = this.props;
    appliedFilters && appliedFilters.forEach(childfilter => (
      this.setState({
        filterParam: childfilter.parentKey,
        filterName: childfilter.displayName,
      }, () => {
        const { filterParam, filterName } = this.state;
        const { facets } = this.props;
        const params = facets || {};
        params[filterParam] = [];
        if (!params[filterParam].length) { delete params[filterParam]; }
        this.props.onChangeFacets(params);
        this.submitQuery(params);
        this.props.closePopup();
      })
    ));
  }

  render() {
    const {
      showPopup,
      filteredItems,
      selectedItems,
    } = this.props;
    const {
      selectedAlphabet,
      alphabets,
      filterParam,
      requiredData,
    } = this.state;
    console.log('newFilteredList', this.state.requiredData);
    return (
      <div className={`${styles.flex} ${styles['align-center']}`}>
        {showPopup &&
          <div className={`${styles.width100}`}>
            <div className={`${styles['m-25']}`}>
              <div>
                  <div className={`${styles['flex-center']} ${styles['main-popup']} ${styles['justify-between']}`}>
                    <RenderFilterBar
                      onFilterData={this.props.onFilterData}
                      placeName="Search brands here"
                    />
                    <div className={`${styles.flex} ${styles['align-center']}`}>
                      {alphabets.map(alphabet => (
                        <div className={`${styles['ml-5']} ${styles['label-gry-clr']} ${styles.fontW600}`}>
                          <div
                            href="javascript: void(0);"
                            onClick={this.setSelectedAlphabet}
                            className={`${selectedAlphabet === alphabet && styles.active}`}
                          >
                            {alphabet}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      btnText="Apply Filters"
                      onClick={this.props.applyFilters}
                      className={`${styles['border-left']}`}
                    />
                    <span className={`${styles['fs-30']} ${styles.pointer}`} onClick={this.props.closePopup}>&times;</span>
                  </div>
                  <div className={`${styles['brands-list']}`}>
                    <div className={selectedItems && selectedItems.length > 0 && `${styles['select-checkbox-width']}`}>
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
                          {filteredItems.length > 0 && filteredItems.map(childfilter => (
                            childfilter.name === val &&
                            <div className={`${styles['checkbox-material']} ${styles['select-check-mate']} ${styles['mt-10']} ${styles['select-checkbox-width']}`}>
                              <input type="checkbox" checked={selectedItems && selectedItems.length > 0 && selectedItems.indexOf(childfilter.name) !== -1} />
                              <label className={`${styles['fs-12']} ${styles['category-label']}`}>
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
                            <div className={`${styles['label-gry-clr']} ${styles.fontW600} ${styles['select-checkbox-width']}`}>{val}</div>
                            {requiredData[val].map(newVal => (
                              <div className={`${styles['select-check-mate']} ${styles['select-checkbox-width']}`}>
                              <input type="checkbox" onChange={this.props.onChangeFilter({ name: newVal.name, param: newVal.param })} checked={selectedItems && selectedItems.length > 0 && selectedItems.indexOf(newVal.name) !== -1} />
                              <label className={`${styles['fs-12']} ${styles['category-label']}`}>
                                <span className={(newVal.name.startsWith(selectedAlphabet !== '' && selectedAlphabet)) || (selectedAlphabet === '#' && newVal.name.match(/^\d/)) ? `${styles.fontW800} ${styles['category-span']}` : `${styles['category-span']} ${styles.fontW700}`}>{newVal.name}
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
  appliedFilters: selectors.getAppliedFitlers(store),
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

