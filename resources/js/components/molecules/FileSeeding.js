import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteFile } from './../../redux/actions/download';

function FileSeeding (props) {
  const [ isLoading, setLoading ] = useState(false);

  function deleteFile (e) {
    setLoading(true);
    
    props.deleteFile(props.file.name)
      .catch(e => {
        setLoading(false);
        console.log('Something happend', e);
      })
  }

  return (
    <div className="download-box complete mb-2">
      <div className="download-info">
        <div className="info-header">
          <i className="fas fa-check fa-lg text-success mx-2"/>
          <label>{props.file.name}</label>
        </div>
      </div>
      <div className="download-actions">
        {!isLoading ? (
          <FontAwesomeIcon icon="trash-alt" size="lg" onClick={deleteFile} />
        ) : (
          <FontAwesomeIcon icon="sync-alt" size="lg" spin />
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteFile: (name) => dispatch(deleteFile(name)),
});

export default connect(null, mapDispatchToProps)(FileSeeding);
