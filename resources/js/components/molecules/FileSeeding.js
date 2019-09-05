import React from 'react';

function FileSeeding (props) {
  return (
    <div className="download-box complete">
      <div className="download-info">
        <div className="info-header">
          <i className="fas fa-check fa-lg text-success mx-2"/>
          <label>{props.file.name}</label>
        </div>
      </div>
    </div>
  );
}

export default FileSeeding;
