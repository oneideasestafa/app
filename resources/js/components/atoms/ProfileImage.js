import React from 'react';
import camera from './../../../images/camera.jpg';

function ProfileImage (props) {
  const { size, image } = props;
  const background = image ? (
    {
      background: `#fff url(${image}) no-repeat center center`,
      backgroundSize: `${size}px`,
    }
  ):(
    {
      background: `#fff url(${camera}) no-repeat center center`,
      backgroundSize: `${size}px`,
    }
  );

  return (
    <div 
      className="oneshow-avatar" 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        ...background
      }}
    >
    </div>
  );
}

export default ProfileImage;