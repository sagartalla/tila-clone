import React from "react";
import SVGCompoent from '../common/SVGComponet';
import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');

const Logo = () => (
  <div className={`${styles['flex-center']} ${styles['logos-part']}`}>
    <SVGCompoent clsName={`${styles['default-logo']}`} src="icons/logos/logo" />
  </div>
);

export default Logo;