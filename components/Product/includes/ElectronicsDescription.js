import React from 'react';
import PropTypes from "prop-types";
import { Grid, Row, Col } from 'react-bootstrap';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

import constants from '../../../constants';

const renderVideoImage = (url) => ({
  IMAGE: <img
    src={`${constants.mediaDomain}/${url}`}
    className='img-responsive' /> ,
  VIDEO: <video
     src={`${constants.mediaDomain}/${url}`}
     className='img-responsive' controls />
})

const displayDescription = (count, el, index) => {
  return (
    <Col key={'desc_'+index} className={`${styles['elt-description-column']}`} md={ count === 3 ? 4 : count === 2 ? 6 : 12 }>
      <Row>
        <Col className={styles['mb-5']} md={ count === 3 || count === 2 ? 12 : 8 }>
          {renderVideoImage(el.media.url)[el.media.type]}
        </Col>
        <Col md={count === 3  || count === 2 ? 12 : 4 }>
          <h4>{el.title}</h4>
          <p className={styles['fs-16']}>{el.body}</p>
        </Col>
      </Row>
    </Col>
  )
}

const Description = ({ productDescription }) => {
  const productDescription2 = [...productDescription];
  if(productDescription2.length === 0) return null;
  const first = productDescription2.splice(0, 1)[0];
  const d = productDescription2.length % 3 === 0 ? 3 : 2;
  const productDescription3 = productDescription2.reduce((acc, val, index) => {
    const inn = Math.floor(index/d);
    acc[inn] = acc[inn] || [];
    acc[inn].push(val);
    return acc;
  }, [])
  productDescription3.splice(0, 0, [first]);
  return (
    <div
      className={`${styles['elt-description-main']} ${styles['pt-30']} ${styles['pb-30']}`}>
        <div>
          {/*<div
            key={'desc_0'}
            className={`${styles['flex']} ${styles['elt-description-titleInfo']}`}
            >
            {
              first.media.url
                ?
                <Col md={8}>
                  <div>
                    {renderVideoImage(first.media.url)[first.media.type]}
                  </div>
                </Col>
                :
                null
            }
            <Col md={first.media.url ? 4 : 12}>
              <div>
                <h4>{first.title}</h4>
                <p className={styles['fs-16']}>{first.body}</p>
              </div>
            </Col>
          </div>*/}
          {
            productDescription3.map((val, index) => {
              return (<Row key={index}>
                {
                  val.map(displayDescription.bind(this, val.length))
                }
              </Row>)
            })
          }
        </div>
    </div>
  );
}
export default Description;
