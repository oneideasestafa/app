import React from 'react';
import Progress from '../atoms/Progress';

function FileDownload (props) {
  return (
    <div className="download-box">
      <div className="download-info">
        <div className="info-header">
          <label>{props.file.name}</label>
        </div>
        <div className="info-progress">
          <Progress progress={50}/>
        </div>
      </div>
      <div className="download-actions">

      </div>
    </div>
  );
}

export default FileDownload;