import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import { selectors } from '../../../store/search';
import Product from "./Product";
import styles from '../search.styl';

const SearchReuslts = ({ pagiantionDetails, results }) => {
  const items = results.items.map((item) => {
    return <Product key={item.id} {...item} />;
  });

  const loadMore = () => {
    console.log('loadMore', arguments);
  }

  const hasMore = () => {
    const { pageSize, pageNum } = pagiantionDetails;
    const { items, totalCount } = results;
    return ((pageNum - 1) * pageSize + items.length) !== totalCount
  }

  return (
    <div>
      <div className={styles['meta-info']}>{results.totalCount} no of items found</div>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          console.log('load more');
        }}
        hasMore={hasMore()}
        loader={<div className={styles['loader']} key={0}>Loading ...</div>}
        className={styles['grid-cont']}
      >
        {items}
      </InfiniteScroll>
    </div>
  )

}


const mapStateToProps = (store) => ({
  results: selectors.getSearchResutls(store),
  pagiantionDetails: selectors.getPaginationDetails(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchReuslts);