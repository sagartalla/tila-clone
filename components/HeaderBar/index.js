import { Grid, Row, Col} from 'react-bootstrap';
import NoSSR from 'react-no-ssr';

import Logo from './Logo';
import Search from './Search';
import ActionBar from './ActionBar';
import MegaMenu from './MegaMenu';
import styles from './header.styl'

const HeaderBar = props => (
    <div className={styles['header-container']}>
      <Grid>
        <Row>
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
