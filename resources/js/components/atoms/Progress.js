import React from 'react';
import classnames from 'classnames';

function Progress({ progress, color = 'success'}) {
  const classNames = classnames('progress-bar', `bg-${color}`);

  return (
    <div className="progress">
      <div 
        className={classNames}
        role="progressbar" 
        style={{width: `${progress}%`}}
        aria-valuenow={`${progress}`}
        aria-valuemin="0" 
        aria-valuemax="100">
      </div>
    </div>
  );
}

export default Progress;