import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { Link } from '../../routes';
import { selectors, actionCreators } from '../../store/megamenu';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');

//TODO make it SEO friendly

class MegaMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null
    }
    this.onHoverCurry = this.onHoverCurry.bind(this);
    this.onHoverOut = this.onHoverOut.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
  }

  componentDidMount() {
    //TODO: should be fetched on the server side
    this.props.getMegamenu();
  }
  
  getTree(childCategory) {
    return _.map(childCategory ? childCategory.childCategories : {}, (childItem) => (
      <li key={childItem.id} onClick={this.onLinkClick}>
        <Link route={`/category/${childItem.displayName}-${childItem.id}`}>
          <a className={styles['level-1-item']}>{childItem.displayName}</a>
        </Link>
        <ul>
          {
            childItem.isLeaf ? null : this.getTree(childItem)
          }
        </ul>
      </li>
    ))
  }

  onHoverCurry(id) {
    return () => {
      this.setState({
        ...this.state,
        selectedCategory: id
      });
    }
  }

  onLinkClick() {
    this.setState({
      selectedCategory: null
    });
  }

  onHoverOut() {
    this.setState({
      selectedCategory: null
    });
  }

  render() {
    const { megamenu } = this.props;
    const { selectedCategory } = this.state;
    const selectedCategoryTree = _.find(megamenu, { id: selectedCategory });
    return (
      <div>
        <nav className={styles['megamenu-wrapper']}>
          <ul>
            {
              _.map(megamenu, (item) => (
                <li key={item.id} onMouseOver={this.onHoverCurry(item.id)}>
                  <div>
                    <Link route={`/category/${item.displayName}-${item.id}`}>
                      <a className={styles['level-1-item']}>{item.displayName}</a>
                    </Link>
                  </div>
                </li>
              ))
            }
          </ul>
        </nav>
        {
          selectedCategoryTree
          ?
            <div onMouseLeave={this.onHoverOut} className={`${styles['megamenu-dropdown']} ${styles['box']} ${styles['box-space']}`}>
              <ul>
                {
                  this.getTree(selectedCategoryTree)
                }
              </ul>
            </div>
          :
          null
        }
      </div>
    );
  }
}


const mapStateToProps = (store) => {
  return ({
    megamenu: selectors.getMegamenu(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getMegamenu: actionCreators.getMegamenu },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MegaMenu);
