import React from 'react'

import PlaceItem from './PlaceItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css';

function PlaceList(props) {
  
  if (props.items.length===0){
    return <Card >
    <h2>Please start adding place</h2>
    <Button to="/places/new">ADD PLACE</Button>
    </Card>
}
    const placeList=props.items.map(place=><PlaceItem key={place.id} id={place.id} image={place.imageURL} address={place.address} description={place.description} deletePlace={props.deletePlace} cordinate={place.location} creator={place.creator}/>)

  return (
    <ul className='place-list'>
        {placeList}
    </ul>
  )
}

export default PlaceList