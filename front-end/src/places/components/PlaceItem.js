import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import './PlaceItem.css';
import Map from '../../shared/components/UIElements/Map';


function PlaceItem(props) {
    const [showMap,setShowMap]=useState(false);
    const [showDeleteModal,setShowDeleteModal]=useState(false);
    // const [deleteConfirmation,setDeleteConfirmation]=useState(false);

   

    const openMap=()=>{
        console.log("openMap called");
        setShowMap(true);
    }
    const closeMap=()=>{
        console.log("closeMap called");
        setShowMap(false);
    }
    const onDeletePlaceHandler=()=>{
        console.log("[PlaceItem.js] onDeletePlaceHandler");
        setShowDeleteModal(true);
        
    }
    const onCancelDeletePlaceHandler=()=>{
        setShowDeleteModal(false);
    }
    const onConfirmDeletePlaceHandler= ()=>{
        setShowDeleteModal(false);
        props.deletePlace(props.id);
    }
  return (
      <>
        <Modal
            header={props.address}
            show={showMap}
            footer={<Button onClick={closeMap}>Close</Button>}
            footerClass='place-item__modal-actions'
            contentClass='place-item__modal-content'
            onClose={closeMap}
        >
            <div className='map-container'>
                <Map center={props.cordinate} zoom={16}/>
            </div>
        </Modal>
         <Modal
        header="Are you sure?"
            show={showDeleteModal}
            footer={<React.Fragment>
                <Button inverse onClick={onCancelDeletePlaceHandler}>CANCEL</Button>
                <Button onClick={onConfirmDeletePlaceHandler}>DELETE</Button>
            </React.Fragment>}
            footerClass='place-item__modal-actions'
            contentClass='place-item__modal-content'
            onClose={onCancelDeletePlaceHandler}
        >
                <p>Please confirm to delete this post!!</p>
        </Modal>
        
      <li >
          <Card className='place-item'>
              <div className='place-item__image'>
                  <img src={props.image} alt={props.title}/>
              </div>
              <div className='place-item__info'>
                  <h2>{props.title}</h2>
                  <h3>{props.address}</h3>
                  <p>{props.description}</p>
              </div>
                <div className='place-item__actions'>
                    <Button inverse onClick={openMap}>VIEW ON MAP</Button>
                    <Button to={`/places/${props.id}`}>EDIT</Button>
                    <Button danger onClick={onDeletePlaceHandler}>DELETE</Button>
                </div>
          </Card>
      </li>
    
      </>
  )
}

export default PlaceItem