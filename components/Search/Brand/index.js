import Slider from 'react-slick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';

import { actionCreators, selectors } from '../../../store/landing';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './brand_en.styl';
import styles_ar from './brand_ar.styl';


const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let sliderTBS;

// const tbs = [{
//   img: `/static/img/landing-home/${lang === 'en' ? 'main-Armani' : 'main-Armani-ar'}.png`,
//   title: 'Armani Sunglasses',
//   key: 'Armani Sunglasses',
// }, {
//   img: `/static/img/landing-home/${lang === 'en' ? 'main-Charger' : 'main-Charger-ar'}.png`,
//   title: 'Baseus Charger',
//   key: 'Baseus Charger',
// }, {
//   img: `/static/img/landing-home/${lang === 'en' ? 'main-Joyroom' : 'main-Joyroom-ar'}.png`,
//   title: 'Joyroom',
//   key: 'Joyroom',
// }, {
//   img: `/static/img/landing-home/${lang === 'en' ? 'main-LDNIO' : 'main-LDNIO-ar'}.jpg`,
//   title: 'Ldnio',
//   key: 'Ldnio',
// }, {
//   img: `/static/img/landing-home/${lang === 'en' ? 'main-RAYBAN' : 'main-RAYBAN-ar'}.jpg`,
//   title: 'Rayban',
//   key: 'Rayban',
// }];

const subTypes = {
  CAROUSEL: 'carousel',
  FLEX_3: 'flex-3'
}


const Brand = ({ pageData }) => {
  const { page_content } = pageData;
  return (<>
  {
    page_content.map((item) => {
      switch (item.sub_type) {
        case subTypes.CAROUSEL:
          return (
            <Slider
              dots
              autoplay
              asNavFor={sliderTBS}
              ref={slider => (sliderTBS = slider)}
              lazyLoad={false}
              className={styles['ht-100per']}
              customPaging={(i) => {
                return <span></span>;
              }}
            >
              {
                item.data[lang].map(i => (
                  <div>
                    <a href={i.link}>
                      <div className="item" key={i.display_name}>
                        <img src={i.img} />
                      </div>
                    </a>
                  </div>
                ))
              }
            </Slider>
          );
          break;
        case subTypes.FLEX_3:
          return (
            <Row className={`${styles['mt-40']} ${styles['mb-40']}`}>
              {item.data[lang].map(col => (
                <Col md={4} xs={4} sm={4} className={`${styles['pl-10']} ${styles['pr-10']}`}>
                  <a href={col.link} key={col.title}>
                    <img src={col.img} alt={col.title} className={styles['img-responsive-in']} />
                  </a>
                </Col>
              ))}
            </Row>
          );
        default:

      }
    })
  }
  </>)
}


const mapStateToProps = store => ({
  pageData: selectors.getPage(store)
});


export default connect(mapStateToProps, null)(Brand);
