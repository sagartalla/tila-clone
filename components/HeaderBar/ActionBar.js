import { connect } from 'react-redux';
import { Modal } from 'react-router-modal';
import styles from './header.styl';
import { getCookie } from '../../components/Overlay/Login/CookieMethods';
import Login from '../Login';

export default class ActionBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false
        }
    }

    toggleLoginModal = (e, toggle) => {
        this.setState({
            showLogin: toggle
        })
    }

    postLogin = () => {
        this.toggleLoginModal(null, false);
    }

    render() {
        return (
            <div className={styles['actionbar-wrapper']}>
                {getCookie('access_token') ? 
                    <div className={styles['action-item']}>Logged In</div>
                :
                    <div className={styles['action-item']} onClick={(e) => this.toggleLoginModal(e, true)}>Login</div>
                }
                <div className={styles['action-item']}></div>
                <div className={styles['action-item']}></div>
                <div className={styles['action-item']}></div>
                {this.state.showLogin ?
                <Modal onBackdropClick={(e) => this.toggleLoginModal(e,false)}>
                    <Login postLogin={this.postLogin}/>
                </Modal>
                : ''
                }
            </div>
        )
    }
}

