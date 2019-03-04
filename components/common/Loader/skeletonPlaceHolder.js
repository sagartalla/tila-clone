
import 'react-placeholder/lib/reactPlaceholder.css';
import { mergeCss } from '../../../utils/cssUtil';
import Input from '../../common/commonInput/index';
import Rectangle from '../../common/commonInput/RectangleShape';

const styles = mergeCss('components/common/Loader/loader');
/* eslint-disable */
export const searchPlaceHolder = (
  <div style={{ overflow: 'hidden', maxHeight: '800px' }}>
    <div className={
    `${styles.container}`
  }
    />
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
              background: '#f7f5f5', height: '2em',
              }}
      />
        <Input
        style={{
                background: '#f7f5f5', height: '2em',
              }}
      />
      </div>
      <div style={{
            display: 'flex', padding: 20, background: '#ffff',
        }}
      >
        <Input
            style={{
              background: '#f7f5f5', width: '85%', height: '2em',
              }}
          />
        <Input
            style={{
                background: '#f7f5f5', width: '70%', height: '2em',
              }}
          />
        <div style={{ borderRight: '1px solid #f7f5f5' }} />
        <Input
            style={{
              background: '#f7f5f5', width: '65%', marginLeft: '40px', height: '2em',
              }}
          />
        <Input
            style={{
                background: '#f7f5f5', height: '2em',
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
              width: '85%', marginRight: '1.5px', background: '#f7f5f5', height: '2em',

              }}
        />
          <Input
          color="blue"
          style={{
                width: '95%', marginRight: '1.5em', background: '#f7f5f5', height: '2em',
              }}
        />
          <Input
          style={{
                width: '95%', marginRight: '1.5em', background: '#f7f5f5', height: '2em',
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
                        marginTop: 0, marginBottom: 35, marginLeft: 5, height: '1.5em', width: '75%',
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
  <div className={
    `${styles.container}`
  }
    />
  <div className="col-md-8">
    <div style={{
        display: 'flex', alignItems: 'center', padding: 20, width: '100%',
        }}
            >
              <Input
                style={{
            height: '3em', width: '70%', marginTop: 0,
            }}
              />
              <Input
                style={{
            height: '3em', width: '70%', marginTop: 0,
            }}
              />
              <Input
                style={{
            height: '3em', width: '70%', marginTop: 0,
        }}
              />
            </div>
    <div className={`${styles['display-item-wrap']}`}>
              <Rectangle
                style={{
                  width: '100%', height: '100%'
                  }}
              />
            </div>
    <div className={`${styles.flx} ${styles['align-center']}`}>
              <Rectangle
                style={{
                  width: 400, marginBottom: 20, marginRight: 20, height: 76, marginTop: 20,
        }}
              />
              <Rectangle
                style={{
                   width: 400, marginBottom: 20, marginRight: 20, height: 76, marginTop: 20,
        }}
              />
              <Rectangle
                style={{
                   width: 400, marginBottom: 20, marginRight: 20, height: 76, marginTop: 20,
              }}
              />
            </div>
  </div>
    <div className="productPlaceHolder col-md-4">
      <div style={{
            padding: 20, marginTop: '12%',
          }}
            >
              <Rectangle
                style={{
                  width: '400px', height: '200px',
                  }}
              />
              <Rectangle
                style={{
                  width: '400px', height: '200px',
                  }}
              />
             <Rectangle
                style={{
                  width: '400px', height: '200px',
                  }}
              />
            </div>
  </div>
  </div>
);
