import styles from './header.styl'

const ActionBar = (props) => (
    <div className={styles['actionbar-wrapper']}>
        <div className={styles['action-item']} onClick={() => props.showOverlayScreen()}>Login</div>
        <div className={styles['action-item']}></div>
        <div className={styles['action-item']}></div>
        <div className={styles['action-item']}></div>
    </div>
);

export default ActionBar;