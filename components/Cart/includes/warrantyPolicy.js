import React from 'react';
import { Row, Col, PanelGroup, Panel } from 'react-bootstrap';
import moment from 'moment';
import Cookie from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/cart';
import { Link } from '../../../routes';
import Warranty from '../../Product/includes/Warranty';
import CartStepper from './CartStepper';
import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang/';
import constants from '../../../constants';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../cart_en.styl';
import styles_ar from '../cart_ar.styl';
/* eslint-disable */

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { PDP_PAGE, CART_PAGE, ORDER_PAGE, DELIVERY_ADDR_PAGE } = languageDefinations();

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const warrantyPolicy = [{
    'extended_warranty': {
     
    },
    'damage_protection': {
        
    }
}]
class warrantyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  render() {
    return (
      <div>
          nn
      </div>
    )
}
}

