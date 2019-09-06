import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function MusicPlayer (props) {
  const { audio } = props;
  
  useEffect(() => {
    let media = null;
    
    if (audio.current) {
      requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
        const { Empresa_id, _id } = props.event;
        const name = audio.current.payload;
        const path = `${Empresa_id}/${_id}/${name}`;

        fs.root.getFile(path, { create: false }, fe => {
          media = new Media(fe.toInternalURL(), () => console.log('success!'));
          
          media.play();

        }, err => console.log('getFile', err))
      })
    }

    return () => {
      if (media) {
        media.release();
      }
    }
  }, [audio.current])
  
  
  return null;
}

const mapStateToProps = state => ({
  event: state.events.current,
  audio: state.show.audio
});

export default connect(mapStateToProps)(MusicPlayer);