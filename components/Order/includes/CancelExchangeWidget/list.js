import React, { Component } from 'react';
import styles from './cancelExchangeWidget.styl';

const List = ({ items }) => items.map((item) => {
  return (
    <div className={styles['item-cont']}>
      <div className={styles['radio-cont']}></div>
      <div className={styles['img-cont']}>
        <img src={item.img} />
      </div>
      <div className={style['title-cont']}>
        <span>{item.title}</span>
      </div>
    </div>
  );
})