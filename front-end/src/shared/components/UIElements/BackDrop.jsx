import React from 'react';
import ReactDOM from 'react-dom';

import './BackDrop.css';

function BackDrop(props) {
  
    const content= <div className='BackDrop' onClick={props.onClick}></div>;

    return ReactDOM.createPortal(content,document.getElementById('backdrop-hook'))
  
}

export default BackDrop