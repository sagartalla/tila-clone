import { Grid } from 'react-bootstrap';
import HeaderBar from '../HeaderBar/index';
import './search.styl';
import CategoriesAndFacets from './CategoriesAndFacets';
import SearchResults from "./SearchResults";

const Search = () => ( 
    <div>
        <HeaderBar />
        <Grid>
            <div>
                <div>
                    <CategoriesAndFacets />
                </div>
            </div>
            <div>
                <div>
                    <SearchResults />
                </div>
            </div>
        </Grid>
    </div>
)

export default Search;