// import styles from './main.styl';
import { ModalContainer } from 'react-router-modal';
import { ToastContainer } from 'react-toastify';
import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('');

const Layout = ({ children }) => (
	<div>
		<div className={styles['main-layout']}>
			{children}
		</div>
		<ModalContainer />
		<ToastContainer/>
	</div>
);

export default Layout;
