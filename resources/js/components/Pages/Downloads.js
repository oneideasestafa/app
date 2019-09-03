import React, { useState, useEffect } from 'react';
import { getFilesFromEvent } from './../../redux/actions/events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FileDownload from './../molecules/FileDownload';
import { connect } from 'react-redux';

function Downloads (props) {
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {
    props.getFilesFromEvent(props.event._id).then(() => setLoading(false));
  }, [])

  const files = props.downloads.map(file => (
    <FileDownload key={file.id} file={file}>
      {file.name}
    </FileDownload>
  ));

  if (isLoading) {
    return (
      <div className="abs-center">
        <FontAwesomeIcon icon="sync" size="lg" spin />
      </div>
    );
  }

  return (
    <div className="m-3">
      {files}
    </div>
  );
}

const mapStateToProps = state => ({
  event: state.events.current,
  downloads: state.events.downloads
});

const mapDispatchToProps = dispatch => ({
  getFilesFromEvent: (eventId) => dispatch(getFilesFromEvent(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Downloads);
