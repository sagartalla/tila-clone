import React from "react";
import SVGComponent from '../common/SVGComponet';
import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');

const Logo = () => (
  <div className={`${styles['flex-center']} ${styles['logos-part']}`}>
    <a href="/" className={styles['flex']}><SVGComponent clsName={`${styles['default-logo']}`} src="icons/logos/logo" /></a>
  </div>
);

export default Logo;