import React from 'react';
import camera from './../../../images/camera.jpg';

function ProfileImage (props) {
  const { size, image } = props;
  const background = image ? (
    `#fff url(${image}) no-repeat center center`
  ):(
    `#fff url(${camera}) no-repeat center center`
  );

  return (
    <div 
      className="oneshow-avatar" 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        background,
        backgroundSize: `${size}px`,
      }}
    >
    </div>
  );
}

export default ProfileImage;