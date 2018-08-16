import React, { Component } from 'react';
import { Panel, Heading, Body, Title } from 'react-bootstrap';

import { Link } from '../../../../routes';
import SVGCompoent from '../../../common/SVGComponet';
import { mergeCss } from '../../../../utils/cssUtil';

import Tree from './Tree';

const styles = mergeCss('components/Search/search');


class LinkFacet extends Component {

  render() {
    const { filter } = this.props;
    return (
      <li className={`${styles['category-list']} `}>
        <Panel.Heading>
          <Panel.Title toggle className={`${styles['category-list-title']} ${styles['black-color']} ${styles['fontW600']} ${styles['p-10-20']} ${styles['flx-spacebw-alignc']}`}>
            {filter.name}
            <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          {
            filter
              ?
              <Tree filter={filter} first={true} />
              :
              null
          }
        </Panel.Body>
      </li>
    );
  }
}

export default LinkFacet;
