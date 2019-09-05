import React from 'react';
import FileSeeding from './../molecules/FileSeeding';

function SeedingList (props) {
  const files = props.files.map(file => (
    <FileSeeding key={file.id} file={file} />
  ));

  if (files.length === 0)
    return null;

  return (
    <div className="m-3">
      <h5 style={{fontFamily: 'Roboto', fontWeight: 500}}>
        Archivos descargados
      </h5>
      <div>
        {files}
      </div>
    </div>
  );
}

export default SeedingList;
