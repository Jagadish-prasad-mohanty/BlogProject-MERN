import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

const NewPlace = () => {
  return <form className='form'>
    <Input type='text'>Place Name :</Input>
    <Input type='text' >Place Name :</Input>
    <Input element='textarea'>Description :</Input>
    <Button type='submit'>Add Place</Button>
  </form>
};

export default NewPlace;