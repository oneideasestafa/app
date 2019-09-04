import React, { useState, useEffect } from 'react';
import Progress from '../atoms/Progress';
import WebTorrent from 'webtorrent';

function FileDownload (props) {
  const [ isReady, setReady ] = useState(false);
  const [ isDownloaded, setDownloaded ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ info, setInfo ] = useState({ progress: 0, size: 0 });
  const client = new WebTorrent();

  useEffect(() => {
    if (!props.file.magnetURI)
      return;
    
    const torrent = client.add(props.file.magnetURI);
    
    torrent.on('ready', () => setReady(true));
    
    torrent.on('error', error => setError(error));
    
    torrent.on('download', bytes => {
      setInfo({
        progress: torrent.progress * 100,
        downloaded: Math.round(torrent.downloaded / 1000),
        downloadSpeed: Math.round(torrent.downloadSpeed / 1000),
      })
    });

    torrent.on('done', () => setDownloaded(true));

  }, [props.file.magnetURI]);

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

export default FileDownload;