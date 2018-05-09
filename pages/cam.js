import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';

import makeStore from '../store';

import Cam from '../components/Cam';

const CamPage = () => (
  <NoSSR>
    <Cam />
  </NoSSR>
);

export default withRedux(makeStore, null, null)(CamPage);
