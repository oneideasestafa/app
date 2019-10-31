import React from 'react';
import classnames from 'classnames';

function Alert (props) {
  const classNames = classnames('alert', `alert-${props.type}`);
  
  const containerStyle = {
    position: 'relative',
  };

  const buttonStyle = {
    position: 'absolute',
    top: '5px',
    right: '10px',
  };

  return (
    <div className={classNames} style={containerStyle}>
      {props.children}
      <button 
        type="button" 
        className="close"
        aria-label="Close"
        style={buttonStyle}
        onClick={props.onClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default Alert;