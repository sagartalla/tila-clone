import React from 'react';
import Input from '../commonInput/index';
import Rectangle from '../commonInput/RectangleShape';
import Round from '../commonInput/roundShape';


import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './loader_en.styl';
import styles_ar from './loader_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

export const searchPlaceHolder = (
  <div className={`${styles.flex}`}>
    {/* <div className={`${styles.container}`} /> */}
    <div
      className={
        `${styles['filter-panel']} ${styles['border-radius4']}
          ${styles['bg-white']} col-md-2`
      }
    >
      <Input style={{ height: 80 }} />
      <div style={{ marginBottom: '5px' }} />
      {
          [0, 1, 2, 3, 4, 5, 6, 7].map((el, i) => (
            <div>
              <div key={`rect_${i}`}>
                <Input />
              </div>
              <div style={{marginBottom: '5px' }} />
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
                height: '2em', width: '30%',
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
                height: '2em', width: '30%',
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
  <div style={{ display: 'flex' }}>
    {/* <div className={
    `${styles.container}`
  }
    /> */}
    <div className="col-md-8">
      <div style={{
        display: 'flex', alignItems: 'center', padding: 20, width: '100%',
        }}
      >
        {
          [0, 1, 2].map((el, i) => (
            <div style={{
                height: '3em', width: '50%', padding: '10px', backgroundColor: '#fff', marginRight: '20px',
            }}
            >
              <Input
                key={`rect_${i}`}
                style={{
                      height: '1.5em', width: '100%', backgroundColor: '#f7f5f5',
                  }}
              />
            </div>
              ))
          }
      </div>
      <div style={{width: '100%', height: '85%', backgroundColor: '#fff', padding: '20px'}}>
        <Rectangle
          style={{
                    width: '100%', height: '100%', backgroundColor: '#f7f5f5',
                    }}
        />
      </div>
      <div className={`${styles.flx} ${styles['align-center']}`}>
        {
          [0, 1, 2].map((el, i) => (
            <div style={{
              width: 400, marginBottom: 20, marginRight: 20, height: 76, marginTop: 20, padding: 10, backgroundColor: '#fff',
            }}
            >
              <Rectangle
                key={`rect_${i}`}
                style={{
                    width: '100%', height: '100%', backgroundColor: '#f7f5f5',
              }}
              />
            </div>
              ))
          }
      </div>
    </div>
    <div className="productPlaceHolder col-md-4">
      <div style={{
            padding: 20, marginTop: '15%',
          }}
      >
        {
          [0, 1, 2].map((el, i) => (
            <div style={{
              width: 400, height: '200px', backgroundColor: '#fff', padding: '20px',
            }}
            >
              <Rectangle
                key={`rect_${i}`}
                style={{
                    width: '360px', height: '160px', backgroundColor: '#f7f5f5',
                    }}
              />
            </div>
              ))
          }
      </div>
    </div>
  </div>
);


export const cartPlaceHolder = (
  <div className={`${styles.flex} ${styles.relative}`} style={{
      //position: 'fixed',
      zIndex: 26,
      width: '100vw',
      height: '100vh',
      top: 0,
      left: 0,
      // background: '#fff',
      // paddingTop: '130px',
    }}>
    {/* <div className={`${styles.container}`} /> */}
    <div className={`${styles.flex} ${styles['p-20']} ${styles.width100}`}>
      <div style={{ width: '75%' }} className={`${styles.flex} ${styles['flex-colum']} ${styles.width63} ${styles['mr-20']}`}>
        <div style={{
              width: '100%', height: '300px', backgroundColor: '#fff', padding: '20px', marginBottom: '20px',
          }}
        >
          <Rectangle
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f7f5f5',
            }}
          />
        </div>
        <div style={{
              width: '100%', height: '100px', backgroundColor: '#fff', padding: '20px', marginBottom: '20px',
          }}
        >
          <Rectangle
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f7f5f5',
            }}
          />
        </div>
      </div>
      <div style={{
              width: '25%', height: '600px', backgroundColor: '#fff', padding: '20px', marginBottom: '20px',
          }}
      >
        <Rectangle
          style={{
            width: '100%', height: '100%', backgroundColor: '#f7f5f5',
          }}
        />
      </div>
    </div>
  </div>
);

export const couponPlaceHolder = (
  <div style={{ overflow: 'hidden', maxHeight: '800px' }}>
    {/* <div className={`${styles.container}`} /> */}
    <div
      className={
        `${styles['filter-panel']} ${styles['border-radius4']}
          ${styles['bg-white']} col-md-2 col-sm-4`
      }
    >
      <div className={`${styles.flex} ${styles['flex-center']} ${styles['m-5']}`}>
        <Round />
        <div className={`${styles['flex-colum']} ${styles['ml-10']}`}>
          <Input style={{ height: 15, width: '100px' }} />
          <Input style={{ height: 15, width: '100px' }} />
        </div>
      </div>
      {
          [0, 1, 2, 3, 4, 5].map((el, i) => (
            <div>
              <div key={`rect_${i}`}>
                <Input style={{ height: 40 }} />
              </div>
              <div style={{marginBottom: '5px' }} />
            </div>
              ))
          }
    </div>
    <div className={`${styles['search-results']} ${styles['p-0']} col-md-10 col-sm-8`}>
      <div className={`${styles['grid-cont']} ${styles['mt-15']} ${styles['flex-wrp']} ${styles.flx} result-box`} >
        <div className={`${styles.couponHeader} ${styles['p-25']}`}>
          <div className={`${styles['flex-center']} ${styles.flex} ${styles['m-5']}`}>
            <Round style={{ backgroundColor: '#fff' }} />
            <div className={`${styles['flex-colum']} ${styles['ml-10']}`}>
              <Input style={{ height: 20, width: '300px', backgroundColor: '#fff' }} />
              <Input style={{ height: 20, width: '300px', backgroundColor: '#fff' }} />
            </div>
          </div>
          <div className={`${styles.flex} ${styles['mt-40']}`}>
            <Input style={{ height: 30, width: '150px', backgroundColor: '#fff', marginRight: '10px' }} />
            <Input style={{ height: 30, width: '150px', backgroundColor: '#fff' }} />
          </div>
        </div>
        {
          [0, 1, 2].map(() => [0, 1, 2].map((el, i) => (
            <div key={`rect_${i}`}>
              <Rectangle style={{
                 width: '500px',
                 height: '170px',
                 margin: '10px',
               }}
              />
            </div>
              )))
          }
      </div>
    </div>
  </div>
);

export const ftbSkeletonLoader = (
  <div className={`${styles['grid-cont']} ${styles['flex-wrp']} ${styles.flx} result-box`} >
    {[0, 1, 2, 3].map(() => [0, 1, 2, 3].map((el, i) => (
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
);

export const camProfileHolder = (
  <div className={`${styles.flex}`} style={{ overflow: 'hidden', maxHeight: '800px', }}>
    {/* <div className={`${styles.container}`} /> */}
    <div
      className={
        `${styles['filter-panel']} ${styles['border-radius4']}
          ${styles['bg-white']} col-md-2 col-sm-4`
      }
    >
      <div className={`${styles.flex} ${styles['flex-center']} ${styles['m-5']}`}>
        <Round />
        <div className={`${styles['flex-colum']} ${styles['ml-10']}`}>
          <Input style={{ height: 15, width: '100px' }} />
          <Input style={{ height: 15, width: '100px' }} />
        </div>
      </div>
      {
          [0, 1, 2, 3, 4, 5].map((el, i) => (
            <div>
              <div key={`rect_${i}`}>
                <Input style={{ height: 40 }} />
              </div>
              <div style={{marginBottom: '5px' }} />
            </div>
              ))
          }
    </div>
    <div className={`${styles['search-results']} ${styles['p-0']} col-md-10 col-sm-8`}>
      <div className={`${styles['grid-cont']} ${styles['mt-15']} ${styles['flex-wrp']} ${styles.flx} result-box`} >
        <div style={{ height: '100%' }} className={`${styles.couponHeader} ${styles['p-25']}`}>
          <div className={`${styles['flex-center']} ${styles.flex} ${styles['m-5']}`}>
            <Round style={{ backgroundColor: '#fff' }} />
            <div className={`${styles['flex-colum']} ${styles['ml-10']}`}>
              <Input style={{ height: 20, width: '300px', backgroundColor: '#fff' }} />
              <Input style={{ height: 20, width: '300px', backgroundColor: '#fff' }} />
            </div>
          </div>
          <div className={`${styles.flex} ${styles['mt-40']}`}>
            <Input style={{ height: 30, width: '150px', backgroundColor: '#fff', marginRight: '10px' }} />
            <Input style={{ height: 30, width: '150px', backgroundColor: '#fff' }} />
          </div>
          <div className={`${styles.flex} ${styles['mt-40']}`}>
            <Input style={{ height: 30, width: '150px', backgroundColor: '#fff', marginRight: '10px' }} />
            <Input style={{ height: 30, width: '150px', backgroundColor: '#fff' }} />
          </div>
          <div className={`${styles.flex} ${styles['mt-40']}`}>
            <Input style={{ height: 30, width: '150px', backgroundColor: '#fff', marginRight: '10px' }} />
            <Input style={{ height: 30, width: '150px', backgroundColor: '#fff' }} />
          </div>
          <div className={`${styles.flex} ${styles['mt-40']}`}>
            <Input style={{ height: 30, width: '150px', backgroundColor: '#fff', marginRight: '10px' }} />
            <Input style={{ height: 30, width: '150px', backgroundColor: '#fff' }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const camOrdersHolder = (
  <div style={{ overflow: 'hidden', maxHeight: '800px' }}>
    {/* <div className={`${styles.container}`} /> */}
    <div
      className={
        `${styles['filter-panel']} ${styles['border-radius4']}
          ${styles['bg-white']} col-md-2 col-sm-4`
      }
    >
      <div className={`${styles.flex} ${styles['flex-center']} ${styles['m-5']}`}>
        <Round />
        <div className={`${styles['flex-colum']} ${styles['ml-10']}`}>
          <Input style={{ height: 15, width: '100px' }} />
          <Input style={{ height: 15, width: '100px' }} />
        </div>
      </div>
      {
          [0, 1, 2, 3, 4, 5].map((el, i) => (
            <div>
              <div key={`rect_${i}`}>
                <Input style={{ height: 40 }} />
              </div>
              <div style={{ marginBottom: '5px' }} />
            </div>
              ))
          }
    </div>
    <div className={`${styles['search-results']} ${styles['p-0']} col-md-10 col-sm-8`}>
      <div className={`${styles['grid-cont']} ${styles['mt-15']} ${styles['flex-colum']} ${styles.flx} result-box`} >
        {/* <div style={{ height: '100%' }} className={`${styles.couponHeader} ${styles['p-25']}`}> */}
          {
            [0, 1, 2].map(() => [0, 1, 2].map((el, i) => (
              <div key={`rect_${i}`}>
                <Rectangle style={{
                 width: '100%',
                 height: '170px',
               }}
                />
              </div>
            )))
          }
        {/* </div> */}
      </div>
    </div>
  </div>
);

export const homePageHolder = (
  <div style={{ overflow: 'hidden', maxHeight: '800px' }}>
    {/* <div className={`${styles.container}`} /> */}

    <div className={`${styles['p-0']} col-md-12 col-sm-12`}>
      <div className={`${styles['grid-cont']} ${styles['mt-20']} ${styles['flex-wrp']} ${styles.flx} result-box`} >
        <div style={{ height: '200px' }} className={`${styles.couponHeader} ${styles['p-25']}`}>
        </div>
      </div>
      <div className={`${styles['grid-cont']} ${styles['mt-20']} ${styles.flx} result-box`}>
        <div style={{ height: '200px', width: '45%'}} className={`${styles.couponHeader} ${styles['p-25']}`}>
        </div>
        <div style={{ height: '200px', width: '45%'}} className={`${styles.couponHeader} ${styles['p-25']}`}>
        </div>
      </div>
      <div className={`${styles['grid-cont']} ${styles['mt-20']} ${styles.flx} result-box`}>
        <div style={{ height: '200px', width: '30%'}} className={`${styles.couponHeader} ${styles['p-25']}`}>
        </div>
        <div style={{ height: '200px', width: '30%'}} className={`${styles.couponHeader} ${styles['p-25']}`}>
        </div>
        <div style={{ height: '200px', width: '30%'}} className={`${styles.couponHeader} ${styles['p-25']}`}>
        </div>
      </div>
    </div>
  </div>
);
