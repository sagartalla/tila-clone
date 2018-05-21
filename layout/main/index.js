import styles from './main.styl';

const Layout = ({children}) => (
    <div className={styles['main-layout']}>
        {children}
    </div>
);

export default Layout;