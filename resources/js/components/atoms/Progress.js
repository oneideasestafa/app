import React from 'react';

function Progress(props) {
  return (
    <div className="progress">
      <div 
        className="progress-bar bg-success" 
        role="progressbar" 
        style={{width: `${props.progress}%`}}
        aria-valuenow={`${props.progress}`}
        aria-valuemin="0" 
        aria-valuemax="100">
      </div>
    </div>
  );
}

export default Progress;