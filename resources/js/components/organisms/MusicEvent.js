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
  const tracker = { timeout: null };
  const [sweetAlert, setSweetAlert] = useState({title: '', text: '', show: false});
  let media = null;
  
  useEffect(() => {    
    if (audio.current) {
      clearTimeout(tracker.timeout);

      let now = new Date();
      let delay = audio.current.startTime - now.getTime();

      if (delay > 0) {
        tracker.timeout = setTimeout(props.executeJob, delay, audio.current.type);
      } else {
        props.executeJob(audio.current.type);
      }
    } else {
      clearTimeout(tracker.timeout);
    }

    return () => {
      if (media) {
        media.release();
      }
    }
  }, [audio.current]);

  useEffect(() => {
    if (audio.running) {
      props.findFileInPhoneStorage(audio.current.payload).then(({ url }) => {
        media = new Media(url, () => props.turnShowOff(audio.current), (err) => setSweetAlert({
          title: 'Error', 
          text: 'Algo ha ocurrido al intentar reproducir el audio', 
          show: true
        }));
        
        media.play();
      })
      .catch(err => {
        switch (err.code) {
          case 1:
            setSweetAlert({ 
              title: `${audio.current.payload} no encontrado`, 
              text: 'Vaya a la pestaña de descargas y obtenga el archivo', 
              show: true 
            });
          break;
        }
      })
    } else {
      if (media)
        media.release();
    }

    return () => {
      if (media) {
        media.release();
      }
    }
  }, [audio.running]);  
  
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
  audio: state.show.audio
});

const mapDispatchToProps = dispatch => ({
  executeJob: (type) => dispatch(executeJob(type)),
  turnShowOff: (job) => dispatch(turnShowOff(job)),
  findFileInPhoneStorage: (fileName) => dispatch(findFileInPhoneStorage(fileName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);