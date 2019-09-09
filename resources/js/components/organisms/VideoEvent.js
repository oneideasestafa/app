import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  executeJob,
  turnShowOff,
  findFileInPhoneStorage
} from '../../redux/actions/show';

function VideoEvent (props) {
  const { video } = props;
  const tracker = { timeout: null };
  
  /**
   * Time Tracker
   */
  useEffect(() => {
    if (video.current) {
      clearTimeout(tracker.timeout);

      let now = new Date();
      let delay = video.current.startTime - now.getTime();

      if (delay > 0) {
        tracker.timeout = setTimeout(props.executeJob, delay, video.current.type);
      } else {
        props.executeJob(video.current.type);
      }      
    } else {
      clearTimeout(tracker.timeout);
    }

    return () => clearTimeout(tracker.timeout);
  }, [video.current]);

  /**
   * If a video is running, play the video
   */
  useEffect(() => {
    if (video.running) {
      props.findFileInPhoneStorage(video.current.payload).then(url => {
        window.plugins.streamingMedia.playVideo(url, {
          successCallback: () => props.turnShowOff(video.current),
          errorCallback: (err) => console.log('Error', err),
          controls: false,
        });
      })
      .catch(err => console.log('Video error', err));
    }   
  }, [video.running]);
  
  return null;
}

const mapStateToProps = state => ({
  event: state.events.current,
  video: state.show.video
});

const mapDispatchToProps = dispatch => ({
  executeJob: (type) => dispatch(executeJob(type)),
  turnShowOff: (job) => dispatch(turnShowOff(job)),
  findFileInPhoneStorage: (fileName) => dispatch(findFileInPhoneStorage(fileName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoEvent);