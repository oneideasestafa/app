import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { 
  executeJob,
  turnShowOff,
  findFileInPhoneStorage
} from '../../redux/actions/show';

function MusicPlayer (props) {
  const { audio } = props;
  // const tracker = { timeout: null };
  const [sweetAlert, setSweetAlert] = useState({title: '', text: '', show: false});
  let playing = '';
  let media = null;
  
  // useEffect(() => {    
  //   if (audio.current) {
  //     clearTimeout(tracker.timeout);

  //     let now = new Date();
  //     let delay = audio.current.startTime - now.getTime();

  //     if (delay > 0) {
  //       tracker.timeout = setTimeout(props.executeJob, delay, audio.current.type);
  //     } else {
  //       props.executeJob(audio.current.type);
  //     }
  //   } else {
  //     clearTimeout(tracker.timeout);
  //   }

  //   return () => {
  //     if (media) {
  //       media.release();
  //     }
  //   }
  // }, [audio.current]);

  useEffect(() => {
    if (audio.current) {
      if (playing !== audio.current.payload) {
        props.findFileInPhoneStorage(audio.current.payload).then(({ url }) => {
          media = new Media(url, () => null, (err) => {
            if (process.env.NODE_ENV === 'development') {
              setSweetAlert({
                type: 'error', 
                title: 'Error', 
                text: 'Algo ha ocurrido al intentar reproducir el audio', 
                show: true
              })
            }
        });

          media.play()
          
          playing = audio.current.payload;
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
        })
      } else {
        media.stop();
        media.play();
      }      
    } else {
      if (media)
        media.release();
    }
  }, [audio.current]);  
  
  return (
    <div>
      <SweetAlert
        type={sweetAlert.type}
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
  audio: state.show.audio
});

const mapDispatchToProps = dispatch => ({
  executeJob: (type) => dispatch(executeJob(type)),
  turnShowOff: (job) => dispatch(turnShowOff(job)),
  findFileInPhoneStorage: (fileName) => dispatch(findFileInPhoneStorage(fileName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);