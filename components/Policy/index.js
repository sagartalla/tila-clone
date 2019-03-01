import React, { Component,Fragment } from 'react';

import HeaderBar from '../HeaderBar';
import FooterBar from '../Footer';

const url = {
  tc: '/static/docs/tc.pdf',
  re:'/static/docs/re.pdf',
  wp:'/static/docs/wp.pdf',
  sp:'/static/docs/sp.pdf',
}['']

const Policy = ({query}) => {
  return (
    <Fragment>
      <HeaderBar />
      <iframe src={`/static/docs/${query.name}.pdf#toolbar=0&navpanes=0&view=FitH`} style={{ height: '100vh', width: '100vw', border: '0' }}></iframe>
      <FooterBar />
    </Fragment>
  )
};

export default Policy;
