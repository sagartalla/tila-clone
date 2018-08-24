import React from "react";
import SVGComponent from '../common/SVGComponet';
import { mergeCss } from '../../utils/cssUtil';
import Theme from '../helpers/context/theme';
const styles = mergeCss('components/HeaderBar/header');

const Logo = () => (
  <Theme.Consumer>
    {
      categoryTree => (
        <div className={`${styles['flex-center']} ${styles['logos-part']}`}>
          <a href="/" className={styles['flex']}>
            <SVGComponent clsName={`${styles['default-logo']}`} src={`icons/logos/${categoryTree}-logo`} />
          </a>
        </div>
      )
    }
  </Theme.Consumer>
);

export default Logo;
