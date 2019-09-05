import React, { useState, useEffect } from 'react';
import Progress from '../atoms/Progress';
import WebTorrent from 'webtorrent';
import { connect } from 'react-redux';

function FileDownload (props) {
  const [ isReady, setReady ] = useState(false);
  const [ isDownloaded, setDownloaded ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ info, setInfo ] = useState({});
  
  /**
   * Effect for connecting to peer and 
   * handle the download process
   */
  useEffect(() => {
    // Check if file already exists in the device before downloading
    requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
      let path = `${props.event.Empresa_id}/${props.event._id}/${props.file.name}`;
      
      fs.root.getFile(path, { create: false }, fe => console.log('Exists!'), err => {
        const client = new WebTorrent();
        const torrent = client.add(props.file.magnetURI);
        
        // Executed when the .torrent file finished downloading
        torrent.on('ready', () => setReady(true));
        
        // Executed when something happend at any time in the download process
        torrent.on('error', error => setError(error));
        
        // Executed every time a new set of bytes are downloaded
        torrent.on('download', bytes => setInfo({
          progress: torrent.progress * 100,
          downloaded: Math.round(torrent.downloaded / 1000),
          downloadSpeed: Math.round(torrent.downloadSpeed / 1000),
        }));
    
        // Executed once the files from the torrent finish downloading
        torrent.on('done', () => {
          setDownloaded(true);
          torrent.files.forEach(file => file.getBlob(saveDownloadedFile));
        });
      });
    });
  }, [props.file.magnetURI]);

  /**
   * Takes the downloaded file from torrent
   * and saves it in the phone storage
   */
  function saveDownloadedFile (err, blob) {
    if (err)
      return console.log('saveDownloadedFile:', err);
    
    requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
      const { Empresa_id, _id } = props.event;
      const { name } = props.file;

      /**
       * You have to access one directory at a time
       * to go to the path you need and then write
       * the file there
       */
      fs.root.getDirectory(Empresa_id, { create: true }, companyDir => {
        companyDir.getDirectory(_id, { create: true }, eventDir => {
          eventDir.getFile(`${name}`, { create: true, exclusive: false}, fe => {
            fe.createWriter(fw => {
              
              fw.onwriteend = () => console.log('End!!');
              fw.onerror = err => console.log('error:', err);
              fw.write(blob);
    
            }, err => console.log('createWriter:', err));
          }, err => console.log('getFile:', err));     
        }, err => console.log('getEventDirectory:', err));
      }, err => console.log('getCompanyDirectory:', err));
    }, err => console.log('requestFileSystem:', err));
  }

  const color = error ? 'danger' : 'success';

  return (
    <div className="download-box">
      <div className="download-info">
        <div className="info-header">
          <label>{props.file.name}</label>
          {!props.file.magnetURI &&
            <p>
              El archivo aún no está disponible para descargar,
              intentelo de nuevo más tarde
            </p>
          }
          {isReady &&
            <p>
              {`${info.downloadSpeed}Kb/s - ${info.downloaded}Kb de ${props.file.size}`}
              {isDownloaded &&
                <i className="fas fa-check fa-lg text-success mx-2"/>
              }
            </p>
          }
        </div>
        {props.file.magnetURI &&
          <div className="info-progress">
            <Progress 
              color={color}
              progress={info.progress}
            />
          </div>
        }
      </div>
      <div className="download-actions">

      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  event: state.events.current
});

export default connect(mapStateToProps)(FileDownload);