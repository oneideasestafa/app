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
  // const tracker = { timeout: null };
  const [sweetAlert, setSweetAlert] = useState({title: '', text: '', show: false});
  const [isBrightnessAtMax, setBrightness] = useState(false);
  
  useEffect(() => {
    if (video.current && !isBrightnessAtMax) {
      setBrightness(true);
      
      Cordova.exec(prevBright => {
        Cordova.exec(() => {
          console.log('Brightness change');
        }, e => console.log(e), 'Brightness', 'setBrightness', [1]);      

      }, e => console.log(e), 'Brightness', 'getBrightness', []);
    } else if (video.current === null) {
      setBrightness(false);
    }

    if (video.current && video.current.vibrate) {
      navigator.vibrate(250);
    }
  }, [video.current]);

  /**
   * Time Tracker
   */
  // useEffect(() => {
  //   if (video.current) {
  //     clearTimeout(tracker.timeout);

  //     let now = new Date();
  //     let delay = video.current.startTime - now.getTime();

  //     if (delay > 0) {
  //       tracker.timeout = setTimeout(props.executeJob, delay, video.current.type);
  //     } else {
  //       props.executeJob(video.current.type);
  //     }      
  //   } else {
  //     clearTimeout(tracker.timeout);
  //   }

  //   return () => clearTimeout(tracker.timeout);
  // }, [video.current]);

  /**
   * If a video is running, play the video
   */
  useEffect(() => {
    if (video.current) {
      props.findFileInPhoneStorage(video.current.payload).then(({ url }) => {
        window.plugins.streamingMedia.playVideo(url, {
          successCallback: () => props.turnShowOff(video.current),
          errorCallback: (err) => setSweetAlert({
            type: 'error', 
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
            if (process.env.NODE_ENV === 'development') {
              setSweetAlert({ 
                type: `info`, 
                title: ``, 
                text: '...', 
                show: true 
              });

              setTimeout(() => setSweetAlert({
                type: 'info',
                title: '',
                text: '...',
                show: false,
              }), 1000);
            }
          break;
        }
      });
    }   
  }, [video.current]);
  
  return (
    <div>
      <SweetAlert
        type={sweetAlert.type}
        show={sweetAlert.show}
        title={sweetAlert.title}
        text={sweetAlert.text}
        onConfirm={() => setSweetAlert({type: 'info', title: '', text: '', show: false})}
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