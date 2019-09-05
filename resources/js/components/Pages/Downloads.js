import React, { useState, useEffect } from 'react';
import { getFilesFromEvent } from './../../redux/actions/events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DownloadList from './../organisms/DownloadList';
import SeedingList from './../organisms/SeedingList';
import { connect } from 'react-redux';

function Downloads (props) {
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {
    props.getFilesFromEvent(props.event._id).then(() => setLoading(false));
  }, [])

  if (isLoading) {
    return (
      <div className="abs-center">
        <FontAwesomeIcon icon="sync" size="lg" spin />
      </div>
    );
  }

  return (
    <div>
      <DownloadList files={props.files.downloading} />
      <SeedingList files={props.files.existing} />
    </div>
  );
}

const mapStateToProps = state => ({
  event: state.events.current,
  files: state.events.files
});

const mapDispatchToProps = dispatch => ({
  getFilesFromEvent: (eventId) => dispatch(getFilesFromEvent(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Downloads);
