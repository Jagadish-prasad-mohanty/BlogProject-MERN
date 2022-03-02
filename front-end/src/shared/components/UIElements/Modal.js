import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import BackDrop from './BackDrop';
import './Modal.css'

const ModalOverlay= (props) =>{
    const content=(
        <CSSTransition in={props.show}
        timeout={200}
        classNames='modal'
        mountOnEnter
        unmountOnExit>
        <div className={`modal ${props.className}`}>

            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit?props.onSubmit : (e)=>e.preventDefault()}>
                <div className={`modal__content ${props.contentClass}`}>{props.children}</div>
                <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
            </form>
        </div>

        </CSSTransition>
    )

    return createPortal(content,document.getElementById("modal-hook"));

}

function Modal(props) {
  return (
    <>
        {props.show && <BackDrop onClick={props.onClose}/>}
        <ModalOverlay {...props}/>
    </>
  )
}

export default Modal
