import React, { Component, Fragment } from 'react';
import Menu from './Menu';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');

class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const { subMenuItems, onLinkClick } = this.props;
    const { selectedSubCategory } = this.state;
    const selectedSubCategoryTree = _.find(subMenuItems, { id: parseInt(selectedSubCategory) });
    return (
      <Fragment>
        <ul className={styles['submenu-head']} >
          {
            subMenuItems.map((subMenuItem) => (
              <li key={subMenuItem.id} data-id={subMenuItem.id} onMouseOver={this.onHover} className={`${styles['float-l']} ${styles['ml-5']} ${styles['mr-5']} ${styles['p-10']}`}>{subMenuItem.displayName}</li>
            ))
          }
        </ul>
        {
          selectedSubCategoryTree
            ?
              <Menu
                selectedCategoryTree={selectedSubCategoryTree}
                colorScheme=""
                onLinkClick={onLinkClick}
              />
            :
             null
        }
    </Fragment>
    );
  }
}


export default SubMenu;