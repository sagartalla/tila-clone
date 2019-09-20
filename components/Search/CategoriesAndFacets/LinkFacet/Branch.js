import React, { Component } from 'react';
import Cookie from 'universal-cookie';

import { Link } from '../../../../routes';
import Tree from './Tree';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const cookies = new Cookie();

const language = cookies.get('language') || 'ar';

class Branch extends Component {
  constructor(props) {
    super(props);
    const { category, sidParams } = props;
    this.state = {
      active: sidParams ? sidParams.includes(category.id.toString()) : false,
    };
  }

  toggle = () => {
    const { active } = this.state;
    this.setState({
      active: !active,
    });
  }

  render() {
    const {
      first, category, queryString, sid, sidParams, showSiblings, categoryQuery,
    } = this.props;
    const { active } = this.state;
    let isValid = true;
    if (sidParams) {
      sid.split(',').slice(0, sidParams.length).forEach((n) => {
        if (!sidParams.includes(n)) isValid = false;
      });
    }
    if (!isValid) return null;
    // if ((sidParams && !sidParams.includes(category.id.toString()))) return null;
    return (
      <li key={category.id} className={categoryQuery === category.canonicalId ? styles['main-sub-list'] : styles['category-sub-list-inn']}>
        {category.children.length > 0 && <span className={`${styles.pointer} ${styles['fs-12']}`} onClick={this.toggle}>{active ? 'v ' : '> '}</span>}
        <Link route={`/${language}/search/${category.canonicalId}/${queryString}`}><a className={`${styles['fs-12']}`}>{category.name}</a></Link>
        {
          category.children
            ?
              active && <Tree filter={category} sid={sid} categoryQuery={categoryQuery} />
            :
            null
        }
      </li>
    );
  }
}

export default Branch;

/*
  <ul className={`${styles['category-sub-order-list']} ${styles['pl-15']}`}>
    {
    category.children.map((subcategory) => {
      return (
        <li key={subcategory.id} className={styles['category-sub-list-inn']}>
          <Link
            route={`/srp/${category.canonicalId}-${category.id}/
            ${subcategory.canonicalId}-${subcategory.id}/${window.location.search}`}
          >
            {subcategory.name}
          </Link>
        </li>
      )
    })
    }
  </ul>
*/
