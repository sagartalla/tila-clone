import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SVGCompoent from '../SVGComponet';
import { selectors, actionCreators } from '../../../store/compare';
import { Router } from '../../../routes';

import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/CompareWidget/compareWidget');

class CompareWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cmpData: [],
    };
    this.removeData = this.removeData.bind(this);
  }

  componentDidMount() {
    this.setState({
      cmpData: JSON.parse(localStorage.getItem('compare')) || [],
    });
    this.props.getCompareCount();
  }

  componentWillReceiveProps(newProps) {
    // console.log(newProps);
    const { compareCount } = this.props;
    if (compareCount !== newProps.compareCount) {
      this.setState({
        cmpData: JSON.parse(localStorage.getItem('compare')) || [],
      });
    }
  }

  removeData({ currentTarget }) {
    this.props.removeCompareData(currentTarget.getAttribute('data-id'));
  }

  showComparePage = () => {
    Router.pushRoute('/compare');
  }

  render() {
    const { cmpData } = this.state;
    return (cmpData.length > 0 &&
      <div className={styles['compare-fixed']}>
        <div className={styles['compare-container']}>
          <div className={styles['compare-icon-com']} onClick={this.showComparePage}>
            <a className={styles['compare-icon-holder']} href="javascript: void(0)">
              <SVGCompoent clsName={`${styles['compare-icon']}`} src="icons/compare" />
            </a>
          </div>
          <div className={styles['compare-items']}>
            <div style={{ width: `${cmpData.length * 180}px` }} className={`${styles['flex-center']} ${styles['justify-around']} ${styles['ht-240']}`}>
              {cmpData.map(data => (
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
  compareCount: selectors.getCompareCount(store),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCompareCount: actionCreators.getCompareCount,
      removeCompareData: actionCreators.removeCompareData,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CompareWidget);
