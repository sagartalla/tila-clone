import React from 'react'
import SVGCompoent from '../SVGComponet';
import Theme from '../../helpers/context/theme';

const Star = ({isActive,willBeActive,clsStyl}) => {
  return (
    <Theme.Consumer>
    {
      categoryType => (
        <div
          style={{width:'25px', marginRight:'5px'}}
        >
          {
            willBeActive || isActive ?
            <SVGCompoent
              clsName={clsStyl}
              src={`icons/common-icon/star/${categoryType}-star`}
            /> :
            <SVGCompoent
              clsName={clsStyl}
              src='icons/common-icon/star-no-rating'
            />
          }
        </div>
      )
    }
    </Theme.Consumer>
  )
}

export default Star
