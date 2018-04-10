import styles from './header.styl'

const ActionBar = () => (
    <div className={styles['actionbar-wrapper']}>
        <div className={styles['action-item']}></div>
        <div className={styles['action-item']}></div>
        <div className={styles['action-item']}></div>
        <div className={styles['action-item']}></div>
    </div>
);

export default ActionBar;