import React from 'react'
import FileDownload from './../molecules/FileDownload';

function DownloadList (props) {
  const files = props.files.map(file => (
    <FileDownload key={file.id} file={file}/>
  ));

  console.log('files length', files.length);

  if (files.length === 0)
    return (
      <div className="m-5">
        <h4 className="text-center hint">
          No hay archivos pendientes por descargar en este momento
        </h4>
      </div>
    );

  return (
    <div className="m-3">
        {files}
    </div>
  )
}

export default DownloadList;