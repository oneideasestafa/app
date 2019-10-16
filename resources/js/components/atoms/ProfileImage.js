import React from 'react';
import camera from './../../../images/camera.jpg';

function ProfileImage (props) {
  const { size, image } = props;
  const background = image ? image : camera;

  return (
    <div 
      className="oneshow-avatar" 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        background: `#fff url(${background}) no-repeat center center`,
        backgroundSize: `${size}px`,
      }}
    >
    </div>
  );
}

export default ProfileImage;