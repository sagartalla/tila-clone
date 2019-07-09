import React from 'react';
import { connect } from 'react-redux';

import HeaderBar from '../HeaderBar';
import PageData from '../common/PageData';
import FooterBar from '../Footer/index';
import { selectors } from '../../store/landing';
import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './ftb_en.styl';
import styles_ar from './ftb_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class FTB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pageData } = this.props;
    if (pageData.device !== 'desktop') return null;
    return (
      <div>
        <HeaderBar />
        <div className={`${styles['pl-20']} ${styles['pr-20']}`}>
          {pageData && pageData.page_content.length > 0 &&
            pageData.page_content.map(content => <PageData key={content} content={content} />)}
        </div>
        <FooterBar />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  pageData: selectors.getPage(store),
});

export default connect(mapStateToProps, null)(FTB);
