import React, { Component } from 'react';
import Cookie from 'universal-cookie';

import { Link } from '../../../../routes';
import SVGCompoent from '../../../common/SVGComponet';
import { Panel, Heading, Body, Title } from 'react-bootstrap';

import lang from '../../../../utils/language';

import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const MaxItems = 3;

class Tree extends Component {
  constructor(props){
    super(props);
    const { filter } = props;
    this.state = {
      maxRows: MaxItems,
      isMoreButtonRequired: filter.children.length > MaxItems,
    };
    this.toggleMore = this.toggleMore.bind(this);
  }

  toggleMore() {
    const { filter } = this.props;
    this.setState({
      maxRows: this.state.maxRows === filter.children.length ? MaxItems : filter.children.length
    });
  }

  render() {
    const { filter, first } = this.props;
    let queryString = window.location.search;
    return (
      <ul className={`${styles['category-sub-list']} ${styles['pl-20']} ${styles['lne-ht2']}`}>
        {
          filter
            ?
            filter.children.slice(0, this.state.maxRows).map((category) => {
              if(queryString.indexOf('sid') !== -1) {
                queryString = queryString.replace(/sid=.*/, `sid=${category.id}`);
              } else {
                queryString = `${queryString}&sid=${category.id}`;
              }
              return (
                <li key={category.id} className={ first ? styles['main-sub-list'] : styles['category-sub-list-inn']}>
                  <Link route={`/${country}/${language}/srp/${category.canonicalId}/${queryString}&categoryFacet=true`}><a className={`${styles['fs-12']}`}>{category.name}</a></Link>
                  {/*<ul className={`${styles['category-sub-order-list']} ${styles['pl-15']}`}>
                    {
                      category.children.map((subcategory) => {
                        return (
                          <li key={subcategory.id} className={styles['category-sub-list-inn']}>
                            <Link route={`/srp/${category.canonicalId}-${category.id}/${subcategory.canonicalId}-${subcategory.id}/${window.location.search}`}>{subcategory.name}</Link>
                          </li>
                        )
                      })
                    }
                  </ul>*/}
                  {
                    category.children
                      ?
                      <Tree filter={category} />
                      :
                      null
                  }
                </li>
              );
            })
            :
            null
        }
        {
          this.state.isMoreButtonRequired ? <li onClick={this.toggleMore}><a>{this.state.maxRows === filter.children.length ? '- show less' : ' + show more'}</a></li> : null
        }
      </ul>
    );
  }
}

export default Tree;
