import preloader from '../../../assets/images/preloader.svg';
import classes from './Preloader.module.scss';
import React from 'react';

export const Preloader = () => {
  return (
    <div className={classes.preloaderWrapper}>
      <img src={preloader} alt="Loading..." className={classes.preloader} />
    </div>
  );
};

