import React, { useState, useEffect } from 'react';
import Progress from '../atoms/Progress';
import { fileFinishedDownloading } from './../../redux/actions/download';
import { connect } from 'react-redux';

function FileDownload (props) {
  const [ isDownloading, setDownloading ] = useState(false);
  const { id, magnetURI, size, name } = props.file;
  const { progress } = props;

  useEffect(() => {
    if (props.currentId === id && magnetURI) {
      console.log('download', name);
      setDownloading(true);
    }
  }, [props.currentId]); 

  const color = 'success';

  return (
    <div className="download-box mb-2">
      <div className="download-info">
        <div className="info-header">
          <label>{name}</label>
          {!magnetURI &&
            <p>
              El archivo aún no está disponible para descargar,
              intentelo de nuevo más tarde
            </p>
          }
          {isDownloading && progress &&
            <p>
              {`${progress.downloadSpeed}Kb/s - ${progress.downloaded}Kb de ${size}`}
            </p>
          }
        </div>
        {isDownloading && progress &&
          <div className="info-progress">
            <Progress 
              color={color}
              progress={progress.progress}
            />
          </div>
        }
      </div>
      {/* <div className="download-actions">

      </div> */}
    </div>
  );
}

const mapStateToProps = state => ({
  event: state.events.current,
  progress: state.download.progress,
  currentId: state.download.current.id,
});

const mapDispatchToProps = dispatch => ({
  fileFinishedDownloading: (id) => dispatch(fileFinishedDownloading(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileDownload);