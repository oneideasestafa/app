import React from 'react';
import camera from './../../../images/camera.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProfileImage (props) {
  const { size, image, removable, onRemove } = props;
  const background = image ? (
    {
      background: `#fff url(${image}) no-repeat center center / 150px`,
      backgroundSize: `${size}px`,
    }
  ):(
    {
      background: `#fff url(${camera}) no-repeat center center / 150px`,
      backgroundSize: `${size}px`,
    }
  );

  return (
    <div 
      onClick={props.onClick}
      className="oneshow-avatar" 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        ...background
      }}
    >
      {removable &&
        <span className="oneshow-avatar-close">
          <FontAwesomeIcon 
            size="3x"
            color="#eb3b5a" 
            icon="times-circle" 
            onClick={props.onRemove}
          />
        </span>
      }
    </div>
  );
}

export default ProfileImage;