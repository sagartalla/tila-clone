import Slider from 'react-slick';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';


const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let sliderTBS;

const tbs = [{
  img: `/static/img/landing-home/${lang === 'en' ? 'main-Armani' : 'main-Armani-ar'}.png`,
  title: 'Armani Sunglasses',
  key: 'Armani Sunglasses',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'main-Charger' : 'main-Charger-ar'}.png`,
  title: 'Baseus Charger',
  key: 'Baseus Charger',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'main-Joyroom' : 'main-Joyroom-ar'}.png`,
  title: 'Joyroom',
  key: 'Joyroom',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'main-LDNIO' : 'main-LDNIO-ar'}.jpg`,
  title: 'Ldnio',
  key: 'Ldnio',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'main-RAYBAN' : 'main-RAYBAN-ar'}.jpg`,
  title: 'Rayban',
  key: 'Rayban',
}];


const Brand = () => {
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
      {tbs.map(i => (
        <div>
          <a href="">
            <div className="item" key={i}>
              <img src={i.img} />
            </div>
          </a>
        </div>
      ))}
    </Slider>
  );
}

export default Brand;
