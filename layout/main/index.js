// import styles from './main.styl';
import { ModalContainer } from 'react-router-modal';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('');

const Layout = ({ children }) => (
	<div>
		<div className={styles['main-layout']}>
			{children}
		</div>
		<ModalContainer />
	</div>
);

export default Layout;
