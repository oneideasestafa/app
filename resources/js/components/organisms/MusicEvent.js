import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  executeJob,
  turnShowOff,
  findFileInPhoneStorage
} from '../../redux/actions/show';

function MusicPlayer (props) {
  const { audio } = props;
  const tracker = { timeout: null };
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
      console.log('media in tracker', media);
      if (media) {
        media.release();
      }
    }
  }, [audio.current]);

  useEffect(() => {
    if (audio.running) {
      requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
        const { Empresa_id, _id } = props.event;
        const name = audio.current.payload;
        const path = `${Empresa_id}/${_id}/${name}`;

        fs.root.getFile(path, { create: false }, fe => {
          media = new Media(fe.toInternalURL(), () => props.turnShowOff(audio.current));
          
          media.play();

        }, err => console.log('getFile', err))
      })
    } else {
      console.log('media in player', media);
      if (media)
        media.release();
    }
  }, [audio.running]);  
  
  return null;
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