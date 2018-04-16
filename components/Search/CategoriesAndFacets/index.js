import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors } from '../../../store/search'
import CheckboxFacet from './CheckboxFacet';
import LinkFacet from './LinkFacet';


const CategoriesAndFacets = ({ filters }) => {
  return (<ul>
    {
      filters.category.map((filter) => {
        return <LinkFacet filter={filter} key={filter.id} />
      })
    }
    {
      filters.facets.map((filter) => {
        return <CheckboxFacet filter={filter} key={filter.id} />
      })
    }
  </ul>);
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


