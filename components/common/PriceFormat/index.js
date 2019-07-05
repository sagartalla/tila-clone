import React from 'react';

let showPriceValue = '';
let strickedPriceValue = '';
const displayLogic = (showPrice, strickedPrice) => {
    if(showPrice.indexOf('.00') !== -1 && strickedPrice.indexOf('.00') !== -1){
        showPriceValue = Math.floor(showPrice);
        strickedPriceValue = Math.floor(strickedPrice);
        return { showPriceValue, strickedPriceValue };
    }else{
        showPriceValue = showPrice;
        strickedPriceValue = strickedPrice;
        return { showPriceValue, strickedPriceValue };
    }
}

export const StrickedPriceFormat = (props) => {
    const { showPrice, strickedPrice } = props
    const { strickedPriceValue } = displayLogic(showPrice, strickedPrice);
    return (
        <span>{strickedPriceValue}</span>
    );
}

export const ShowPriceFormat = (props) => {
    const { showPrice, strickedPrice } = props
    const { showPriceValue } = displayLogic(showPrice, strickedPrice);
    return (
        <span>{showPriceValue}</span>
    );
}
