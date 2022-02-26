import React from 'react'

import PlaceItem from './PlaceItem';
import Card from '../../shared/components/UIElements/Card';
import './PlaceList.css';

function PlaceList(props) {
    if (props.items.length<=0){
        return <Card>
            <h2>Start sharing places</h2>
            <button>Share Place</button>
        </Card>
    }
    const placeList=props.items.map(place=><PlaceItem key={place.id} id={place.id} image={place.imageURL} address={place.address} description={place.desciption} cordinate={place.location} creator={place.creator}/>)
  return (
    <ul className='place-list'>
        {placeList}
    </ul>
  )
}

export default PlaceList