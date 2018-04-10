import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors } from '../../../store/search'
import GenericFilterItem from "./GenericFilterItem";

const CategoriesAndFacets = ({filters}) => {
  return filters.map((filter) => {
    return <GenericFilterItem filter={filter} key={filter.id}/>
  });
};

const mapStateToProps = (store) => ({
  filters: selectors.getSearchFilters(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesAndFacets);


