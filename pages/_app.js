import App,{Container} from 'next/app';
import React from 'react';
//import Loader from '../components/common/Loader/skeletonLoader';
import WithLoadingBar from '../lib/hoc'

class MyApp extends App {

  static async getInitialProps(initArgs) {
    const { Component, router, ctx } = initArgs;
    const { query } = ctx;
    let pageProps = {}
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    pageProps = {
      ...pageProps,
      url: {
          query,
      }
    }

    return { pageProps  }
  }

  render() {
    const {Component,pageProps} = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default WithLoadingBar(MyApp)
