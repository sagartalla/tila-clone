import { Grid, Row, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Logo from './Logo';
import Search from './Search';
import ActionBar from './ActionBar';
import MegaMenu from './MegaMenu';
import SearchFilters from '../common/SearchFilters';
import { mergeCss } from '../../utils/cssUtil';
import publicUrls from '../../constants';
import { actionCreators, selectors } from '../../store/search';
const styles = mergeCss('components/HeaderBar/header');

const HeaderBar = props => (
  <div className={styles['header-container']}>
    <div className={`${styles['header-container-inn']} ${ props.showFitlers ? styles['faded'] : {} }`}>
      <Grid>
        <Row className={`${styles['flex-center']} ${styles['pb-10']} ${styles['pt-10']} ${styles['border-b']}`}>
          <Col md={1}>
            <Logo />
          </Col>
          <Col md={props.showFitlers ? 6 : 7}>
            <NoSSR>
              <Search />
            </NoSSR>
          </Col>
          {
            props.showFitlers
            ?
            <Col md={4}>
              <div className={`${styles['flex-center']}`}>
                <SearchFilters />
              </div>
            </Col>
            :
            null
          }
          <Col md={props.showFitlers ? 3 : 4 }>
            <ActionBar />
          </Col>
        </Row>
      </Grid>
    </div>
    <div className={styles['header-megamenu']}>
      <div className={styles['header-megamenu-inn']}></div>
      <Grid className={styles['header-meganenu-sub']}>
        <Row>
          <Col md={12}>
            <MegaMenu />
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
);

const mapStateToProps = (store) => ({
  showFitlers: selectors.getSearchBarFilterState(store)
});
export default connect(mapStateToProps, null)(HeaderBar);
