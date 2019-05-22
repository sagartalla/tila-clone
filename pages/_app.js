import App,{Container} from 'next/app';
import React from 'react';
import WithLoadingBar from '../lib/hoc'
import EnableStorage from '../components/helpers/EnableStorage';

class MyApp extends App {

  static async getInitialProps(initArgs) {
    const { Component, ctx } = initArgs;
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

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      storageEnabled: navigator.cookieEnabled
    });
  }

  render() {
    const {Component,pageProps} = this.props
    const {storageEnabled} = this.state;
    if(!storageEnabled){
      return <EnableStorage />;
    }
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default WithLoadingBar(MyApp)
