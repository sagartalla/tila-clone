import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';

import HeaderBar from '../HeaderBar';
import FooterBar from '../Footer';
import Fashion from './includes/Fashion';
import Electronics from './includes/Electronics';
import Lifestyle from './includes/Lifestyle';

const Landing = ({query}) => {
  const { category } = query;
  return (
    <Fragment>
      <HeaderBar query={query} />
      {
        {
          'fashion': (<Fashion />),
          'electronics': (<Electronics />),
          'lifestyle': (<Lifestyle />),
        }[category || 'electronics']
      }
      <FooterBar />
    </Fragment>
  )
}


export default Landing;