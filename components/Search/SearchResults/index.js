import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash'
import Product from "./Product";
import SVGCompoent from '../../common/SVGComponet';
import { actionCreators, selectors } from '../../../store/search';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

class SearchReuslts extends Component {

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  async loadMore(){
    if (!this.props.pagiantionDetails.hasMore){
      return;
    }
    const { pageNum } = this.props.pagiantionDetails;
    const loadMore = true;
    await this.props.getSearchResults({
      pageNum: pageNum + 1
    }, loadMore);
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.ui.loading
  }

  render() {
    const { results, pagiantionDetails } = this.props;
    return (
      <div> 
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={pagiantionDetails.hasMore}
          loader={<div className={styles['loader']} key={0}>Loading ...</div>}
          className={`${styles['grid-cont']} ${styles['flex']} ${styles['flex-wrp']}`}
        >
          {results.items.map((item) => <Product key={item.id} {...item} />)}
        </InfiniteScroll>
      </div>
    );
  }
}


const mapStateToProps = (store) => ({
  results: selectors.getSearchResutls(store),
  pagiantionDetails: selectors.getPaginationDetails(store),
  ui: selectors.getUIState(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchReuslts);
