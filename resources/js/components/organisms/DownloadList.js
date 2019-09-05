import React from 'react'
import FileDownload from './../molecules/FileDownload';

function DownloadList (props) {
  const files = props.files.map(file => (
    <FileDownload key={file.id} file={file}/>
  ));

  return (
    <div>
        {files}
    </div>
  )
}

export default DownloadList;