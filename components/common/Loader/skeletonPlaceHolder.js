import React from 'react';
import Input from '../../common/commonInput/index';
import Rectangle from '../../common/commonInput/RectangleShape';


import lang from '../../../utils/language';

import styles_en from './loader_en.styl';
import styles_ar from './loader_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;
export const searchPlaceHolder = (
  <div className={`${styles['skeletonLoader']}`}>
    {/* <div className={`${styles.container}`} /> */}
    <div
      className={
        `${styles['filter-panel']} ${styles['border-radius4']}
          ${styles['bg-white']} col-md-2`
      }
    >
      <Input style={{ height: 80 }} />
      <div style={{ borderBottom: '1px solid #f7f5f5', marginBottom: '5px' }} />
      {
          [0, 1, 2, 3, 4, 5, 6, 7].map((el, i) => (
            <div>
              <div key={`rect_${i}`}>
                <Input />
              </div>
              <div style={{ borderBottom: '1px solid #f7f5f5', marginBottom: '5px' }} />
            </div>
              ))
          }
    </div>
    <div className={`${styles['search-results']} ${styles['p-0']} col-md-10`}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', padding: 20,
        }}
      >
        <Input
        style={{
              height: '2em', width: '30%',
              }}
      />
        <Input
        style={{
                height: '2em',  width: '30%',
              }}
      />
      </div>
      <div style={{
            display: 'flex', padding: 20, background: '#ffff',
        }}
      >
        <Input
            style={{
              width: '20%', height: '2em', marginRight: '20px',
              }}
          />
        <Input
            style={{
                width: '15%', height: '2em', marginRight: '30px',
              }}
          />
        <div style={{ borderRight: '1px solid #f7f5f5' }} />
        <Input
            style={{
              width: '10%', marginLeft: '25px', height: '2em', marginRight: '20px',
              }}
          />
        <Input
            style={{
                height: '2em', width: '30%'
              }}
          />
      </div>
      <div className={
        `${styles.flx}
         ${styles['flex-center']} ${styles['mb-10']}
         ${styles['border-radius4']} suggested-tags`
      }
      >
        <div style={{
        display: 'flex', alignItems: 'center', padding: 20, width: '100%',
        }}
        >
          <Input
          style={{
              width: '15%', marginRight: '15px', height: '2em',

              }}
        />
          <Input
          color="blue"
          style={{
                width: '20%', marginRight: '1.5em', height: '2em',
              }}
        />
          <Input
          style={{
                width: '20%', marginRight: '1.5em', height: '2em',
              }}
        />
        </div>
      </div>
      <div className={`${styles['grid-cont']} ${styles['flex-wrp']} ${styles.flx} result-box`} >
        {
          [0, 1, 2, 3].map(() => [0, 1, 2, 3].map((el, i) => (
            <div key={`rect_${i}`}>
              <Rectangle />
              <Input
                style={{
                        marginTop: 0, marginBottom: 5, marginLeft: 5, height: '2em', width: '86%',
                        }}
              />
              <Input
                style={{
                        marginTop: 0, marginBottom: 35, marginLeft: 5, width: '75%',
                        }}
              />
            </div>
              )))
          }
      </div>
    </div>
  </div>
);
export const productPlaceHolder = (
  <div className={`${styles['skeletonLoader']}`}>
  {/* <div className={
    `${styles.container}`
  }
    /> */}
  <div className="col-md-8">
    <div style={{
        display: 'flex', alignItems: 'center', padding: 20, width: '100%',
        }}>
        {
          [0, 1, 2].map((el, i) => (
                <Input
                  style={{
                    height: '3em', width: '50%', marginRight: '20px',
                }}
              />
              ))
          }
            </div>
            <Rectangle
                style={{
                  width: '100%', height: '85%'
                  }}
              />
    <div className={`${styles.flx} ${styles['align-center']}`}>
          {
          [0, 1, 2].map((el, i) => (
                <Rectangle
                style={{
                  width: 400, marginBottom: 20, marginRight: 20, height: 76, marginTop: 20,
             }}
              />
              ))
          }
            </div>
  </div>
    <div className="productPlaceHolder col-md-4">
      <div style={{
            padding: 20, marginTop: '15%',
          }}>
               {
          [0, 1, 2].map((el, i) => (
                <Rectangle
                style={{
                  width: '400px', height: '200px',
                  }}
              />
              ))
          }
            </div>
  </div>
  </div>
);


export const cartPlaceHolder = (
  <div className={`${styles.flex} ${styles['pt-40']} ${styles.relative} ${styles['skeletonLoader']}`}>
    {/* <div className={`${styles.container}`} /> */}
    <div className={`${styles.flex} ${styles['p-20']} ${styles.width100}`}>
      <div style={{ width: '75%' }} className={`${styles.flex} ${styles['flex-colum']} ${styles.width63} ${styles['mr-20']}`}>
        <Rectangle
          style={{
            width: '100%',
            height: '300px',
            marginBottom: '20px',
          }}
        />
        <Rectangle
          style={{
            width: '100%',
            height: '100px',
          }}
        />
      </div>
      <Rectangle
        style={{
          width: '25%', height: '600px',
        }}
      />
    </div>
  </div>
);
