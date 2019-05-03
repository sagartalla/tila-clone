import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';
import getConfig from 'next/config';
import Slider from 'react-slick';
import NoSSR from 'react-no-ssr';

import HeaderBar from '../HeaderBar';
import FooterBar from '../Footer';
import RemoteComponent from '../common/RemoteComponent';
import SVGComponent from '../common/SVGComponet';

import lang from '../../utils/language';

import styles_en from './index_en.styl';
import styles_ar from './index_ar.styl';

const config = getConfig();
const isLocal = config.publicRuntimeConfig.isLocal;
const env = config.publicRuntimeConfig.env

const allStyles = lang === 'en' ? styles_en : styles_ar;

/*
import Fashion from './includes/Fashion';
import Electronics from './includes/Electronics';
import Lifestyle from './includes/Lifestyle';
import HomePage from './includes/HomePage';
*/

/*
var loadApp = function(children) {
  React.render(
    React.createElement(MainComponent, {children: children}),
    document.getElementById('main')
  );
};

RemoteComponent.loadRemoteComponents(remoteComponents)
.then(loadApp)
.catch(function(err) {
  console.log("Something went wrong: " + err);
});
*/
const getURl = (page) => {
  switch (page) {
    case 'Fashion':
        return {
          JS: 'https://static-dev.tila.com/tila-static-pages/fashion/index.js',
          CSS: 'https://static-dev.tila.com/tila-static-pages/fashion/style.css'
        };
        break;
    case 'Electronics':
        return {
          JS: 'https://static-dev.tila.com/tila-static-pages/electronics/index.js',
          CSS: 'https://static-dev.tila.com/tila-static-pages/electronics/style.css'
        };
        break;
    case 'Lifestyle':
        return {
          JS: 'https://static-dev.tila.com/tila-static-pages/lifestyle/index.js',
          CSS: 'https://static-dev.tila.com/tila-static-pages/lifestyle/style.css'
        };
        break;
    case 'HomePage':
        switch(env) {
          case 'stage':
          case 'staging':
              return {
                JS: 'https://static-dev.tila.com/tila-static-pages/homepage/stage/index.js',
                CSS: 'https://static-dev.tila.com/tila-static-pages/homepage/stage/style.css',
              };
              break;
          case 'preprod':
              return {
                JS: 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/homepage/preprod/index.js',
                CSS: 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/homepage/preprod/style.css',
              };
              break;
        }

        break;
  }
}

let remoteComponents = {
  fashion: {
    name: 'Fashion',
    src: isLocal ? 'http://localhost:8000/Fashion/index.js' : getURl('Fashion').JS,
    styles: isLocal ? 'http://localhost:8000/Fashion/style.css' : getURl('Fashion').CSS,
    context: {
      React,
      Grid,
      Row,
      Col,
      SVGComponent,
      styles: allStyles,
    },
  },
  electronics: {
    name: 'Electronics',
    src: isLocal ? 'http://localhost:8000/Electronics/index.js' : getURl('Electronics').JS,
    styles: isLocal ? 'http://localhost:8000/Electronics/style.css' : getURl('Electronics').CSS,
    context: {
      React,
      Grid,
      Row,
      Col,
      SVGComponent,
      styles: allStyles,
    },
  },
  lifestyle: {
    name: 'Lifestyle',
    src: isLocal ? 'http://localhost:8000/Lifestyle/index.js' : getURl('Lifestyle').JS,
    styles: isLocal ? 'http://localhost:8000/Lifestyle/style.css' : getURl('Lifestyle').CSS,
    context: {
      React,
      Grid,
      Col,
      SVGComponent,
      styles: allStyles,
    },
  },
  homepage: {
    name: 'HomePage',
    src: isLocal ? 'http://localhost:8000/homepage/stage/index.js' : getURl('HomePage').JS,
    styles: isLocal ? 'http://localhost:8000/homepage/stage/style.css' : getURl('HomePage').CSS,
    context: {
      React,
      Grid,
      Row,
      Col,
      Slider,
      NoSSR,
      SVGComponent,
      styles: allStyles,
    },
  },
};

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(newProps) {
    const { category } = newProps.query;
    RemoteComponent.loadRemoteComponents([remoteComponents[category || 'homepage']])
      .then((children) => {
        this.setState({
          children,
        });
      })
      .catch((err) => {
      console.log("Something went wrong: " + err);
    });
  }
  render() {
    const { query } = this.props;
    const { category } = query;
    return (
      <Fragment>
        <HeaderBar query={query} />
        {
          _.map(this.state.children, (child, index) => React.createElement(child.name, _.merge(child.props, {key: index})))
        }
        <FooterBar />
      </Fragment>
    );
  }
}


export default Landing;
