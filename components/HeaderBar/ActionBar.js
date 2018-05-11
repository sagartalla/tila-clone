import { connect } from 'react-redux';
import styles from './header.styl';
import { getCookie } from '../../components/Overlay/Login/CookieMethods';
import { showOverlayScreen } from '../../components/Overlay/OverlayActions';

const ActionBar = props => (
    <div className={styles['actionbar-wrapper']}>
        {getCookie('access_token') ? 
            <div className={styles['action-item']}>Logged In</div>
            :
            <div className={styles['action-item']} onClick={() => props.showOverlayScreen()}>Log In</div>
        }
        <div className={styles['action-item']}></div>
        <div className={styles['action-item']}></div>
        <div className={styles['action-item']}></div>
    </div>
);

export default connect((state) => ({showOverlay: state.OverlayReducer.showOverlay}), {showOverlayScreen})(ActionBar);