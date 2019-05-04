import React, { Component, Fragment } from 'react';
import { Grid } from 'react-bootstrap';
import Cookie from 'universal-cookie';

import Menu from './Menu';
import routes, { Link } from '../../../../routes';
import lang from '../../../../utils/language';

import styles_en from '../../header_en.styl';
import styles_ar from '../../header_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';


class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubCategory: props.subMenuItems[0].id
    };
    this.onHover = this.onHover.bind(this);
  }

  onHover(e) {
    const id = e.currentTarget.getAttribute('data-id');
    this.setState({
      ...this.state,
      selectedSubCategory: id,
    })
  }

  render() {
    const { subMenuItems, onLinkClick, colorScheme, parentID } = this.props;
    const { selectedSubCategory } = this.state;
    const selectedSubCategoryTree = _.find(subMenuItems, { id: parseInt(selectedSubCategory) });
    return (
      <Fragment>
        <div className={styles['submenu-head-wrap']}>
          <Grid>
            <ul className={styles['submenu-head']} >
              {
                subMenuItems.map((subMenuItem) => (
                  <li key={subMenuItem.id} data-id={subMenuItem.id} onMouseOver={this.onHover} className={`${styles['float-l']} ${styles['ml-5']} ${styles['mr-5']} ${styles['p-10']}`}>
                    <Link route={`/${country}/${language}/srp/${subMenuItem.displayName.split(' ').join('-').toLowerCase()}?categoryTree=true&isListed=false&sid=${parentID},${subMenuItem.id}`}>
                      <a className={`${styles['level-sub-item']} ${styles['white-color']}`}>{subMenuItem.displayName}</a>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </Grid>
        </div>
        {
          selectedSubCategoryTree
            ?
              <Grid>
                <Menu
                  selectedCategoryTree={selectedSubCategoryTree}
                  colorScheme={colorScheme}
                  onLinkClick={onLinkClick}
                  parentID={parentID}
                />
              </Grid>
            :
             null
        }
      </Fragment>
    );
  }
}

export default SubMenu;
