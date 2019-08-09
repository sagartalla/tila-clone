import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Modal, Col } from 'react-bootstrap';
import Button from '../../../common/CommonButton';
import lang from '../../../../utils/language';
import RenderFilterBar from './searchInput';
import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const alphabetList = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
class SelectBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAlphabet: '',
      selectedIndex: 0,
      alphabets: alphabetList,
    };
  }

  setSelectedAlphabet = (e) => {
    this.setState({
      selectedAlphabet: e.target.innerText,
      searchValue: '',
    });
  }

  filterItems = (value) => {
    this.setState({
      selectedAlphabet: '',
      searchValue: value,
    });
  }

  selectedFromList = () => {
    const { searchValue, selectedAlphabet } = this.state;
    return brandsList.filter((brand) => {
      if (searchValue) {
        return brand.search(new RegExp(searchValue, 'i')) > -1;
      } else if (selectedAlphabet === '#') {
        return /^\d/.test(brand);
      } return brand.startsWith(selectedAlphabet);
    });
  };

  showBrandsData = () => {
    this.setState({
      active: true,
    });
  }

  resetSelectedFilters = () => {
    alert('as');
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
    } = this.state;
    return (
      <div className={`${styles.flex} ${styles['align-center']}`}>
        {showPopup &&
          <div className={`${styles.width100}`}>
              <div className={`${styles['m-25']}`}>
                <div>
                  <div className={`${styles['flex-center']} ${styles['main-popup']} ${styles['justify-between']}`}>
                    <RenderFilterBar
                      onFilterData={this.onFilterData}
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
                      onClick={this.props.closePopup}
                      className={`${styles['border-left']}`}
                    />
                    <span className={`${styles['fs-30']} ${styles.pointer}`} onClick={this.props.closePopup}>&times;</span>
                  </div>
                  <div>
                    <a
                      href="javascript: void(0);"
                      onClick={this.handleDataPrev}
                    >
                      {/* <img src={Images.CHEVRONPREV} alt="PREV" /> */}
                    </a>
                  </div>
                  <div className={`${styles['brands-list']}`}>
                    <div className={`${styles['select-checkbox-width']}`}>
                      {selectedItems && selectedItems.length > 0 &&
                      <span>
                        <span className={`${styles.fontW800} ${styles['fs-12']}`}>MY SELECTIONS</span>
                        <span className={`${styles.fontW600} ${styles['ml-30']} ${styles['text-blue']} ${styles['fs-12']}`} onClick={this.resetSelectedFilters}>RESET</span>
                      </span>
                          }
                    </div>
                    <React.Fragment >
                      {selectedItems && selectedItems.length > 0 && selectedItems.map(val => (
                        <React.Fragment>
                          <div className={`${styles['checkbox-material']} ${styles['select-check-mate']} ${styles['mt-10']} ${styles['select-checkbox-width']}`}>
                            <input id={val} type="checkbox" checked />
                            <label className={`${styles['fs-12']} ${styles['category-label']}`}>
                                  <span className={`${styles['category-span']} ${styles.fontW700}`}>{val}
                                    </span>
                                </label>
                          </div>

                        </React.Fragment>
                                ))}
                      {
                          filteredItems.map(childFitler => (
                              alphabets.map(alphabet => (
                                  (alphabet === (childFitler.name.startsWith(alphabet) ? alphabet : childFitler.name.match(/^\d/) ? '#' : '')) &&
                                  <React.Fragment>
                                    <div className={`${styles['label-gry-clr']} ${styles.fontW600} ${styles['select-checkbox-width']}`}>{alphabet}</div>
                                    <div className={`${styles['checkbox-material']} ${styles['select-check-mate']} ${styles['select-checkbox-width']}`}>
                                      <input id={childFitler.param} type="checkbox" checked={selectedItems && selectedItems.length > 0 && selectedItems.indexOf(childFitler.name) !== -1} />
                                      <label htmlFor={childFitler.param} className={`${styles['fs-12']} ${styles['category-label']}`}>
                                        <span className={(childFitler.name.startsWith(selectedAlphabet !== '' && selectedAlphabet)) || (selectedAlphabet === '#' && childFitler.name.match(/^\d/)) ? `${styles.fontW800} ${styles['category-span']}` : `${styles['category-span']} ${styles.fontW700}`}>{childFitler.name}
                                          <span className={styles['thick-gry-clr']}>{childFitler.count ? `(${childFitler.count})` : ''}</span>
                                        </span>
                                      </label>
                                    </div>
                                  </React.Fragment>
                               ))
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

SelectBrand.propTypes = {
  data: PropTypes.instanceOf(Array),
  handleSelectedData: PropTypes.func.isRequired,
};

SelectBrand.defaultProps = {
  data: [],
};

export default SelectBrand;
