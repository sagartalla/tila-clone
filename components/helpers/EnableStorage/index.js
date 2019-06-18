import lang from '../../../utils/language';

import styles_en from './enableStorage_en.styl';
import styles_ar from './enableStorage_ar.styl';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const EnableStorage = () => {
  return (
    <div className={styles['fs-16']}>
      Please Enable Cookies and <a href="javascript:location.reload();">Reload</a>.
    </div>
  )
}


export default EnableStorage;
