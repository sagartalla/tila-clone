import { Grid, Row, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';

import Logo from './Logo';
import Search from './Search';
import ActionBar from './ActionBar';
import MegaMenu from './includes/MegaMenu';
// import SearchFilters from '../common/SearchFilters';
// import Betalogo from '../../components/common/beta';
import { selectors } from '../../store/search';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './header_en.styl';
import styles_ar from './header_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const HeaderBar = props => (
  <div className={`${styles['header-container']}`}>
    <div className={`${styles['header-container-inn']} ${ props.showFitlers ? styles['faded'] : {} }`}>
      <Grid>
        <Row className={`${styles['flex-center']} ${styles['pb-10']} ${styles['pt-10']} ${styles['border-b']} ${styles['header-inn-wrap']}`}>
          <Col md={1} sm={2}>
            <Logo />
          </Col>
          <Col md={7} sm={5}>
            {
              props.hideSearch
                ?
                null
                :
                <NoSSR>
                  <Search />
                </NoSSR>
            }
          </Col>
          {/* {
            props.showFitlers
            ?
            <Col md={4}>
              <div className={`${styles['flex-center']}`}>
                <SearchFilters />
              </div>
            </Col>
            :
            null
          } */}
          <Col md={4} sm={5}>
            <ActionBar hideLogin={props.hideLogin} />
          </Col>
        </Row>
      </Grid>
    </div>
    {
      props.hideMegamenu
        ?
        null
        :
        <div className={styles['header-megamenu']}>
          <div className={styles['header-megamenu-inn']}></div>
          <div className={styles['header-meganenu-sub']}>
            <Row className={styles['m-0']}>
              <Col md={12}>
                <MegaMenu query={props.query} />
              </Col>
            </Row>
          </div>
        </div>
    }

  </div>
);

const mapStateToProps = (store) => ({
  showFitlers: selectors.getSearchBarFilterState(store)
});
export default connect(mapStateToProps, null)(HeaderBar);
