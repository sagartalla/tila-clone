import React, { Component,Fragment } from 'react';
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

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './index_en.styl';
import styles_ar from './index_ar.styl';
import Theme from '../helpers/context/theme';

const allStyles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const config = getConfig();
const isLocal = config.publicRuntimeConfig.isLocal;
const env = config.publicRuntimeConfig.env
const random = Math.floor(Math.random()*100);

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
        switch(env) {
          case 'stage':
          case 'staging':
          case 'preprod':
              return {
                JS: 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/fashion/preprod/index.js?r=' + random,
                CSS: 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/fashion/preprod/style.css?r=' + random,
              };
        }
        break;
    case 'Electronics':
        switch(env) {
          case 'stage':
          case 'staging':
          case 'preprod':
              return {
                JS: 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/electronics/preprod/index.js?r=' + random,
                CSS: 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/electronics/preprod/style.css?r=' + random,
              };
        }
        break;
    case 'Lifestyle':
        switch(env) {
          case 'stage':
          case 'staging':
          case 'preprod':
              return {
                JS: 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/lifestyle/preprod/index.js?r=' + random,
                CSS: 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/lifestyle/preprod/style.css?r=' + random,
              };
        }
        break;
    case 'HomePage':
        switch(env) {
          case 'stage':
          case 'staging':
          case 'preprod':
              return {
                JS: 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/homepage/preprod/index.js?r=' + random,
                CSS: 'https://s3.ap-south-1.amazonaws.com/dev-catalog-imgs/tila-static-pages/homepage/preprod/style.css?r=' + random,
              };
        }

        break;
  }
}

let remoteComponents = {
  fashion: {
    name: 'Fashion',
    src: isLocal ? 'http://localhost:8000/Fashion/preprod/index.js' : getURl('Fashion').JS,
    styles: isLocal ? 'http://localhost:8000/Fashion/preprod/style.css' : getURl('Fashion').CSS,
    context: {
      React,
      Grid,
      Row,
      Col,
      Slider,
      SVGComponent,
      styles: allStyles,
      lang
    },
  },
  electronics: {
    name: 'Electronics',
    src: isLocal ? 'http://localhost:8000/Electronics/preprod/index.js' : getURl('Electronics').JS,
    styles: isLocal ? 'http://localhost:8000/Electronics/preprod/style.css' : getURl('Electronics').CSS,
    context: {
      React,
      Grid,
      Row,
      Col,
      SVGComponent,
      styles: allStyles,
      lang
    },
  },
  lifestyle: {
    name: 'Lifestyle',
    src: isLocal ? 'http://localhost:8000/Lifestyle/preprod/index.js' : getURl('Lifestyle').JS,
    styles: isLocal ? 'http://localhost:8000/Lifestyle/preprod/style.css' : getURl('Lifestyle').CSS,
    context: {
      React,
      Grid,
      Col,
      SVGComponent,
      styles: allStyles,
      lang
    },
  },
  homepage: {
    name: 'HomePage',
    src: isLocal ? 'http://localhost:8000/homepage/preprod/index.js' : getURl('HomePage').JS,
    styles: isLocal ? 'http://localhost:8000/homepage/preprod/style.css' : getURl('HomePage').CSS,
    context: {
      React,
      Grid,
      Row,
      Col,
      Slider,
      NoSSR,
      SVGComponent,
      styles: allStyles,
      lang
    },
  },
};

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { category } = this.props.query;
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
    return (
      <Theme.Provider value={query && query.category && query.category.toLowerCase()}>
        <Fragment>
        <HeaderBar query={query} />
        {
          _.map(this.state.children, (child, index) => React.createElement(child.name, _.merge(child.props, {key: index })))
        }
        <FooterBar />
      </Fragment>
      </Theme.Provider>
    );
  }
}


export default Landing;
