import React, { useRef ,useState} from 'react'

import Button from '../FormElements/Button';
import "./ImageUploader.css";

function ImageUploader(props) {
    const [image,setImage]= useState();
    // const [] = useState();
    const [isValid,setIsValid]=useState();
    const imageRef= useRef();
    const openImageUploader=()=>{
        imageRef.current.click();
    }
    const pickHandler= (e)=>{
        setImage(e.target.value);
        console.log(e.target.files);
        if (e.target.files && e.target.files.length!==0){
            
        }
    }
  return (
    <div>
        <input id={props.id} 
        type="file" 
        className="invisible" 
        ref={imageRef} 
        accept=".png,.jpg,.jpeg"
        onChange={pickHandler}
        />

        <div className='image-upload'>
        <div className='image-upload__preview'>
        <img src={image} alt='Preview'/>
        </div>
            
        <Button type="button" onClick={openImageUploader}>Pick Image</Button>
        </div>
    </div>
  )
}

export default ImageUploader;