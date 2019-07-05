import React from 'react';
import { connect } from 'react-redux';

import HeaderBar from '../HeaderBar';
import PageData from '../common/PageData';
import FooterBar from '../Footer/index';
import { selectors } from '../../store/landing';

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
        <div>
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
