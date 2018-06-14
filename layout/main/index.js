// import styles from './main.styl';
import { ModalContainer } from 'react-router-modal';
import Country from './country';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('');

const Layout = ({ children }) => (
	<div>
		<Country />
		<div className={styles['main-layout']}>
			{children}
		</div>
		<ModalContainer />
	</div>
);

export default Layout;
