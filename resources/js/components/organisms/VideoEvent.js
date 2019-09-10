import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { 
  executeJob,
  turnShowOff,
  findFileInPhoneStorage
} from '../../redux/actions/show';

function VideoEvent (props) {
  const { video } = props;
  const tracker = { timeout: null };
  const [sweetAlert, setSweetAlert] = useState({title: '', text: '', show: false});
  
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
      props.findFileInPhoneStorage(video.current.payload).then(({ url }) => {
        window.plugins.streamingMedia.playVideo(url, {
          successCallback: () => props.turnShowOff(video.current),
          errorCallback: (err) => setSweetAlert({
            title: 'Error', 
            text: 'Algo ha ocurrido al intentar reproducir el video', 
            show: true
          }),
          controls: false,
        });
      })
      .catch(err => {
        switch (err.code) {
          case 1:
            setSweetAlert({ 
              title: `${video.current.payload} no encontrado`, 
              text: 'Vaya a la pestaña de descargas y obtenga el archivo', 
              show: true 
            });
          break;
        }
      });
    }   
  }, [video.running]);
  
  return (
    <div>
      <SweetAlert
        type="error"
        show={sweetAlert.show}
        title={sweetAlert.title}
        text={sweetAlert.text}
        onConfirm={() => setSweetAlert({title: '', text: '', show: false})}
      />
    </div>
  );
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