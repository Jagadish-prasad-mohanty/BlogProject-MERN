import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import './PlaceItem.css';
import Map from '../../shared/components/UIElements/Map';
import { useParams } from 'react-router-dom';



function PlaceItem(props) {
    const [showMap,setShowMap]=useState(false);
    const [showDeleteModal,setShowDeleteModal]=useState(false);
    // const [deleteConfirmation,setDeleteConfirmation]=useState(false);
    const currentUserId=useSelector(state=>state.auth.currentUserId);
    const userId=useParams().userId;


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
        console.log("[PlaceItem.js] onCancelDeletePlaceHandler");
        setShowDeleteModal(false);
    }
    const onConfirmDeletePlaceHandler= ()=>{
        console.log("[PlaceItem.js] onConfirmDeletePlaceHandler");
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
                <Button inverse type="submit" onClick={onCancelDeletePlaceHandler}>CANCEL</Button>
                <Button type="button" onClick={onConfirmDeletePlaceHandler}>DELETE</Button>
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
                  <img src={process.env.REACT_APP_ASSET_URL+`/${props.image}`} alt={props.title}/>
              </div>
              <div className='place-item__info'>
                  <h2>{props.title}</h2>
                  <h3>{props.address}</h3>
                  <p>{props.description}</p>
              </div>
                <div className='place-item__actions'>
                    <Button inverse onClick={openMap}>VIEW ON MAP</Button>
                    {userId===currentUserId && <Button to={`/places/${props.id}`}>EDIT</Button>}
                    {userId===currentUserId && <Button danger onClick={onDeletePlaceHandler}>DELETE</Button>}
                </div>
          </Card>
      </li>
    
      </>
  )
}

export default PlaceItem