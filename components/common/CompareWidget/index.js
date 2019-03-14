import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';

import SVGCompoent from '../SVGComponet';
import { selectors, actionCreators } from '../../../store/compare';
import { Router } from '../../../routes';

import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/CompareWidget/compareWidget');

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class CompareWidget extends React.Component {

  componentDidMount() {
    this.props.getCompareCount();
  }

  removeData = ({ currentTarget }) => {
    this.props.removeCompareData(currentTarget.getAttribute('data-id'));
  }

  showComparePage = () => {
    Router.pushRoute(`${country}/${language}/compare`);
  }

  render() {
    const { cmpData } = this.props;
    return (cmpData.products.length > 0 &&
      <div className={styles['compare-fixed']}>
        <div className={styles['compare-container']}>
          <div className={styles['compare-icon-com']} onClick={this.showComparePage}>
            <a className={styles['compare-icon-holder']} href="javascript: void(0)">
              <SVGCompoent clsName={`${styles['compare-icon']}`} src="icons/compare" />
            </a>
          </div>
          <div className={styles['compare-items']}>
            <div style={{ width: `${cmpData.products.length * 180}px` }} className={`${styles['flex-center']} ${styles['justify-around']} ${styles['ht-240']}`}>
              {cmpData.products.map(data => (
                <div className={styles.item}>
                  <div className={styles['item-image']}>
                    <img className={styles.image} src={data.src} alt="" />
                    <div>
                      <a href="javascript: void(0)" className={`${styles.ellips} ${styles.width100}`}>
                        {data.displayName}
                      </a>
                    </div>
                  </div>
                  <div data-id={data.productId} onClick={this.removeData} className={styles.close}>
                    <span>x</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  cmpData: selectors.getCmpData(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCompareCount: actionCreators.getCompareCount,
    removeCompareData: actionCreators.removeCompareData,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(CompareWidget);
