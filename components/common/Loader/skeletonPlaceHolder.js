import {TextBlock,MediaBlock,TextRow,RectShape,RoundShape}
from
'react-placeholder/lib/placeholders';
import 'react-placeholder/lib/reactPlaceholder.css';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/Loader/loader')

export const searchPlaceHolder = (
  <div className= 'search-placeholder container'>
    <div
    className =
      {
        `${styles['filter-panel']} ${styles['border-radius4']}
          ${styles['bg-white']} ${styles['col-md-2']}`
      }
      >
      <TextBlock color='#E0E0E0' style={{padding:20}} rows={1} />
      <TextBlock color='#E0E0E0' style={{borderRadius:4}} rows={8} />
    </div>
    <div className={`${styles['search-results']} ${styles['p-0']} ${styles['col-md-10']}`}>
      <div className="flx-space-bw items-list-show">
        <TextRow color='#f7f5f5' />
        <TextRow color='#f7f5f5' />
      </div>
      <div className=
      {
        `${ styles['flx']}
         ${ styles['flex-center']} ${styles['mb-20']}
         ${styles['border-radius4']} suggested-tags`
      }     >
        <div style={{display:'flex',alignItems:'center', padding:20,width:'100%'}}>
          <TextRow color='#f7f5f5' style={{height:'2em',width:'25%',marginRight:'1.5em',marginTop:0}}/>
          <TextRow color='#f7f5f5' style={{height:'2em',width:'25%',marginRight:'1.5em',marginTop:0}}/>
          <TextRow color='#f7f5f5' style={{height:'2em',width:'25%',marginRight:'1.5em',marginTop:0}}/>
        </div>
      </div>
      <div className={`${styles['grid-cont']} ${styles['flex-wrp']} ${styles['flx']} result-box`} >
        {
          [0,1,2,3].map(() => {
            return [0,1,2,3].map((el,i) =>  (
              <div key={'rect_'+i}>
                <RectShape
                  style={{width:268,marginBottom:20,marginRight:8,height:276,background:'#f7f5f5'}}
                />
                <TextRow
                  color='#f7f5f5'
                  style={{marginTop:0,marginBottom:5,marginLeft:5,height:'2em',width:'86%'}}
                />
                <TextRow
                  color='#f7f5f5'
                  style={{marginTop:0,marginBottom:10,marginLeft:5,height:'1.5em',width:'75%'}}
                />
              </div>
              ))
            })
          }
      </div>
    </div>
  </div>
)

export const productPlaceHolder = (
  <div className="productPlaceHolder col-md-8">
    <div style={{display:'flex',alignItems:'center', padding:20,width:'100%'}}>
      <TextRow color='#f7f5f5' style={{height:'2em',width:'10%',marginRight:'1.5em',marginTop:0}}/>
      <TextRow color='#f7f5f5' style={{height:'2em',width:'10%',marginRight:'1.5em',marginTop:0}}/>
      <TextRow color='#f7f5f5' style={{height:'2em',width:'10%',marginRight:'1.5em',marginTop:0}}/>
    </div>
    <div className={`${styles['display-item-wrap']}`}>
      <RectShape
        color='#f7f5f5'
        style={{width:268,marginBottom:20,margin:'0 auto',height:350,background:'#f7f5f5',objectFit:'contain'}}
      />
    </div>
    <div className={`${styles['flx']}`}>
    <RectShape
      color='#f7f5f5'
      style={{width:68,marginBottom:20,marginRight:20,height:76,background:'#f7f5f5'}}
    />
    <RectShape
      color='#f7f5f5'
      style={{width:68,marginBottom:20,marginRight:20,height:76,background:'#f7f5f5'}}
    />
    <TextRow color='#f7f5f5' style={{height:'2em',width:'10%',marginRight:'2.5em',marginTop:25}}/>
    <TextRow color='#f7f5f5' style={{height:'2em',width:'10%',marginRight:'2.5em',marginTop:25}}/>
    </div>
  </div>
)
// export default searchPlaceHolder
