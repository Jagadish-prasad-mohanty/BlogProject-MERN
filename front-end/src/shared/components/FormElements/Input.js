import React from 'react'
import './Input.css';
function Input(props) {
  const element=(!props.element || props.element!=='textarea'?<input className='input' type={props.type} />:
  <textarea className='input' rows={5} cols={21} />)
  return (
    <div className='inputElement'>
        <label className='label'>{props.children}</label>
        {element}
    </div>
  )
}

export default Input