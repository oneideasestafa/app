import React from 'react';
import DownloadList from './../organisms/DownloadList';
import SeedingList from './../organisms/SeedingList';
import { getFilesFromEvent } from './../../redux/actions/download';
import { connect } from 'react-redux';

function Downloads (props) {
  const { files } = props;
  const download = files.current ? [files.current, ...files.download] : files.download;
  return (
    <div>
      <DownloadList files={download} />
      <SeedingList files={props.files.existing} />
    </div>
  );
}

const mapStateToProps = state => ({
  event: state.events.current,
  files: state.download
});

const mapDispatchToProps = dispatch => ({
  getFilesFromEvent: (eventId) => dispatch(getFilesFromEvent(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Downloads);
