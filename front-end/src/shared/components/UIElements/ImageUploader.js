import React, { useEffect, useRef, useState } from "react";

import Button from "../FormElements/Button";
import "./ImageUploader.css";

function ImageUploader(props) {
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [isValid, setIsValid] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    if (!image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  const openImageUploader = () => {
    imageRef.current.click();
  };
  const pickHandler = (e) => {
    console.log(e.target.files);
    let file;
    let fileIsValid;
    if (e.target.files && e.target.files.length === 1) {
      file = e.target.files[0];
      setImage(file);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(file,fileIsValid,props.id);
  };
  return (
    <div>
      <input
        id={props.id}
        type="file"
        className="invisible"
        ref={imageRef}
        accept=".png,.jpg,.jpeg"
        onChange={pickHandler}
      />

      <div className="image-upload">
        <div className="image-upload__preview">
          {imagePreview && <img src={imagePreview} alt="Preview" />}
          {!imagePreview && <img src="" alt="Please add a file" />}
        </div>

        <Button type="button" onClick={openImageUploader}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorMsg || "Please add a valid Image!"}</p>}
    </div>
  );
}

export default ImageUploader;
