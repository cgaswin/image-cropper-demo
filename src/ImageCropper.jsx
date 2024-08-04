import React, { useState, useRef } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();
      setCroppedImage(canvas.toDataURL('image/png'));
    }
  };

  const handleDownload = () => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.href = croppedImage;
      link.download = 'cropped-image.png';
      link.click();
    }
  };

  return (
    <div>
      <form>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </form>
      {image && (
        <div>
          <Cropper
            src={image}
            ref={cropperRef}
            className="cropper"
            stencilProps={{
              width: 200,
              height: 200,
              resizable: false,
              movable: false,
            }}
            imageRestriction="stencil"
          />
          <button onClick={handleCrop}>Crop Image</button>
        </div>
      )}
      {croppedImage && (
        <div>
          <h3>Cropped Image Preview:</h3>
          <img src={croppedImage} alt="Cropped Preview" className="cropped-image-preview" />
          <button onClick={handleDownload}>Download Cropped Image</button>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
