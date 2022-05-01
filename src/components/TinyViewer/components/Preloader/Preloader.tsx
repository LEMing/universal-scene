import React from 'react';
import Spinner from '../Spinner';

import './Preloader.scss';

const Preloader = ({msg} : {msg: string}) => {
  return <div className="Preloader-wrapper">
    <Spinner/>
    <p className="Preloader-label">{msg}</p>
  </div>;
}

export default Preloader;
