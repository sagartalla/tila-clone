import styles from './main.styl';
import { ModalContainer } from 'react-router-modal';

const Layout = ({ children }) => (
	<div>
		<div className={styles['main-layout']}>
			{children}
		</div>
		<ModalContainer />
	</div>
);

export default Layout;