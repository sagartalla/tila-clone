import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Modal } from 'react-bootstrap';
import Button from '../../../common/CommonButton';
import lang from '../../../../utils/language';
import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

// import Images from '../../Images/index';

const brandsList = ['123', 'Ashok', 'Add', 'Balu', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const alphabetList = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
class SelectBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      showPopup: false,
      active: false,
      searchValue: '',
      selectedAlphabet: '#',
      selectedIndex: 0,
      alphabets: alphabetList,
    };
  }

  setSelectedAlphabet = ({ target }) => {
    this.setState({
      selectedAlphabet: target.text,
      searchValue: '',
    });
  }

  cancelSearch = () => {
    this.setState({
      selectedAlphabet: '',
      searchValue: null,
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

  handleDataNext = () => {
    const { selectedIndex, alphabets } = this.state;
    if (alphabets.length !== selectedIndex + 1) {
      this.setState({
        selectedAlphabet: alphabets[selectedIndex + 1],
        selectedIndex: selectedIndex + 1,
      });
    }
  };

  handleDataPrev = () => {
    const { selectedIndex, alphabets } = this.state;
    if (selectedIndex !== 0) {
      this.setState({
        selectedAlphabet: alphabets[selectedIndex - 1],
        selectedIndex: selectedIndex - 1,
      });
    }
  };

  handleChange = (event) => {
    this.setState({ checked: event.target.checked, active: false });
  };

  showBrandsData = () => {
    this.setState({
      active: true,
    });
  }

  disableBrandsData = () => {
    this.setState({
      active: false,
    });
  }

  render() {
    const {
      showPopup,
      filteredItems,
    } = this.props;
    const {
      selectedAlphabet,
      alphabets,
      data,
    } = this.state;
    console.log('filteredItems', filteredItems);
    return (
      <div className={`${styles['mb-0']} ${styles['mt-20']}`}>
        {/* <Title title="Select Brands" /> */}
        <div className={`${styles.flex} ${styles['align-center']}`}>
          <div>
            {showPopup &&
            <div className={`${styles.width100}`}>
            {/* <div className={`${styles['mb-20']}`}>
                  <div>asasasa</div>
                </div>
                <div>
                  <div className={`${styles.brandlist}`}>
                    {data.map(listedBrands =>
                      (
                        <span className={`${styles.brands}`}>
                          {<span>{listedBrands}</span>}
                        </span>
                      ))}
                  </div>
                </div> */}
            <div className={` ${styles['mt-20']} ${styles.width100}`}>
                  <div container className={styles.brandsdata}>
              <div className={`${styles['m-25']}`}>
                  <div>
                    <div className={`${styles['flex-center']} ${styles['main-popup']} ${styles['justify-between']}`}>
                      <input
                        type="text"
                        placeholder=" Search brands here"
                        style={{
                        width: '200px',
                        border: '1px solid #c8c7cc',
                        boxShadow: 'none',
                        borderRadius: '0px',
                      }}
                        onChange={this.filterItems}
                        onCancelSearch={this.cancelSearch}
                      />
                      <div className={`${styles.flex} ${styles['align-center']}`}>
                        {alphabets.map(alphabet => (
                          <div className={`${styles['ml-5']}`}>
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
                    <div className={`${styles.flex} ${styles['align-center']}`}>
                      <div>
                        <a
                          href="javascript: void(0);"
                          onClick={this.handleDataPrev}
                        >
                          {/* <img src={Images.CHEVRONPREV} alt="PREV" /> */}
                        </a>
                      </div>
                      <div className={`${styles['m-40']}`}>
                        {
                filteredItems.map(childFitler => (
                  <div className={styles['category-sub-list-inn']}>
                    <div className={`${styles['checkbox-material']} ${styles['select-check-mate']}`}>
                      <input id={childFitler.param} type="checkbox" />
                      <label htmlFor={childFitler.param} className={`${styles['fs-12']} ${styles['category-label']}`}> <span className={styles['category-span']}>{childFitler.name}</span> <span className={styles['thick-gry-clr']}>{childFitler.count ? `${childFitler.count}` : ''}</span> </label>
                    </div>
                  </div>
                ))
              }
                      </div>
                      <div>
                        <a
                          href="javascript: void(0);"
                          className={`${styles['c-p']}`}
                          onClick={this.handleDataNext}
                        >
                          {/* <img src={Images.CHEVRONNEXT} alt="PREV" /> */}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
                </div>

          </div>}
          </div>
        </div>
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
