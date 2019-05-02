import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Layout from '../layout/main';
import Help from '../components/Help';
import makeStore from '../store';

class HelpPage extends Component {
  pageName = 'HELP';

  render() {
    return (
      <div>
        <Layout>
          <Help query={this.props.url.query}/>
        </Layout>
      </div>
    );
  }
}

export default withRedux(makeStore, null, null)(HelpPage);

