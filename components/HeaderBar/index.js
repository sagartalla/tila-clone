import { Grid, Row, Col} from 'react-bootstrap';
import NoSSR from 'react-no-ssr';

import Logo from './Logo';
import Search from './Search';
import ActionBar from './ActionBar';
import MegaMenu from './MegaMenu';
import { mergeCss } from '../../utils/cssUtil';
import publicUrls from '../../constants';
const styles = mergeCss('components/HeaderBar/header');

const HeaderBar = props => (
    <div className={styles['header-container']}>
      <Grid>
        <Row>
          <Col md={12}>
            <div className={styles['float-r']}>
              <span className={`${styles['pl-5']} ${styles['pr-5']}`}>
                <a href={publicUrls.sellerPlatform} target="_blank">Sell with Tila</a>
              </span>
              <span className={`${styles['pl-5']} ${styles['pr-5']}`}>|</span>
              <span className={`${styles['pl-5']} ${styles['pr-5']}`}>
                <a href={publicUrls.customerHelp} target="_blank">Customer Care</a>
              </span>
            </div>
          </Col>
        </Row>
        <Row className={`${styles['flex-center']}`}>
          <Col md={2}>
              <Logo />
          </Col>
          <Col md={7}>
              <NoSSR>
                  <Search />
              </NoSSR>
          </Col>
          <Col md={3}>
              <ActionBar />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
              <MegaMenu />
          </Col>
        </Row>
      </Grid>
    </div>
);

export default HeaderBar;
