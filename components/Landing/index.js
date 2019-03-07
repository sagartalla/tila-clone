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
import { mergeCss } from '../../utils/cssUtil';

const config = getConfig()
const isLocal = config.publicRuntimeConfig.isLocal;

const allStyles = mergeCss('components/Landing/index');


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
let remoteComponents = {
  fashion: {
    name: 'Fashion',
    src: isLocal ? 'http://localhost:8000/Fashion/index.js' : 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/fashion/index.js',
    styles: isLocal ? 'http://localhost:8000/Fashion/style.css' : 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/fashion/style.css',
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
    src: isLocal ? 'http://localhost:8000/Electronics/index.js' : 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/electronics/index.js',
    styles: isLocal ? 'http://localhost:8000/Electronics/style.css' : 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/electronics/style.css',
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
    src: isLocal ? 'http://localhost:8000/Lifestyle/index.js' : 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/lifestyle/index.js',
    styles: isLocal ? 'http://localhost:8000/Lifestyle/style.css' : 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/lifestyle/style.css',
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
    src: isLocal ? 'http://localhost:8000/homepage/index.js' : 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/homepage/index.js',
    styles: isLocal ? 'http://localhost:8000/homepage/style.css' : 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/homepage/style.css',
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
