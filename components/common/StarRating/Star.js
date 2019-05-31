import React from 'react';
import SVGCompoent from '../SVGComponet';
import Theme from '../../helpers/context/theme';

const Star = ({
  isActive, willBeActive, clsStyl, clsName,
}) => (
  <Theme.Consumer>
    {
      categoryType => (
        <div
          style={clsStyl}
        >
          {
            willBeActive || isActive ?
              <SVGCompoent
                clsName={clsName}
                src={`icons/common-icon/star/${categoryType}-star`}
              /> :
              <SVGCompoent
                clsName={clsName}
                src="icons/common-icon/star-no-rating"
              />
          }
        </div>
      )
    }
  </Theme.Consumer>
);

export default Star;
