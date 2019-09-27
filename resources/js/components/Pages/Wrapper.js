import React, { useEffect } from 'react';
import SideMenu from './../organisms/SideMenu';
import Header from './../organisms/Header';
import { Switch, Route } from 'react-router-dom';
import { 
  getFilesFromEvent, 
  setDownloadProgress,
  fileFinishedDownloading 
} from './../../redux/actions/download';
import { connect } from 'react-redux';

// Pages
import CambiarDatos from './../organisms/CambiarDatos';
import Show from './Show';
import Downloads from './Downloads';
import WebTorrent from 'webtorrent';

function Wrapper (props) {
  let client = null;

  /**
   * Effect to fetch the file needed
   * for the event
   */
  useEffect(() => {
    if (props.event) {
      props.getFilesFromEvent(props.event._id)
        .catch(e => console.log('Error', e));
    }
  }, [props.event])

  /**
   * Effect for connecting to peer and 
   * handle the download process
   */
  useEffect(() => {
    if (props.download) {
      client = new WebTorrent();
      const torrent = client.add(props.download.magnetURI);
      
      // Executed every time a new set of bytes are downloaded
      torrent.on('download', bytes => props.setDownloadProgress(
        torrent.progress * 100,
        Math.round(torrent.downloaded / 1000),
        Math.round(torrent.downloadSpeed / 1000),
      ));

      // Executed once the files from the torrent finish downloading
      torrent.on('done', () => {
        torrent.files.forEach(file => file.getBlob(saveDownloadedFile));
      });
    }

    return () => {
      if (client) {
        client.destroy();
      }
    }

  }, [props.download]);

  /**
   * Takes the downloaded file from torrent
   * and saves it in the phone storage
   */
  function saveDownloadedFile (err, blob) {
    if (err)
      return console.log('saveDownloadedFile:', err);
    
    requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
      const { Empresa_id, _id } = props.event;
      const { name } = props.download;

      /**
       * You have to access one directory at a time
       * to go to the path you need and then write
       * the file there
       */
      fs.root.getDirectory(Empresa_id, { create: true }, companyDir => {
        companyDir.getDirectory(_id, { create: true }, eventDir => {
          eventDir.getFile(`${name}`, { create: true, exclusive: false}, fe => {
            fe.createWriter(fw => {
              
              fw.onwriteend = () => props.fileFinishedDownloading(props.download.id);
              fw.onerror = err => console.log('error:', err);
              fw.write(blob);
    
            }, err => console.log('createWriter:', err));
          }, err => console.log('getFile:', err));     
        }, err => console.log('getEventDirectory:', err));
      }, err => console.log('getCompanyDirectory:', err));
    }, err => console.log('requestFileSystem:', err));
  }

  return (
    <div>
      <SideMenu />
      <Header />
      <Switch>
        <Route exact path="/show" component={Show} />
        <Route exact path="/profile" component={CambiarDatos} />
        <Route exact path="/downloads" component={Downloads} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  event: state.events.current,
  download: state.download.current,
});

const mapDispatchToProps = dispatch => ({
  getFilesFromEvent: (eventId) => dispatch(getFilesFromEvent(eventId)),
  fileFinishedDownloading: (fileId) => dispatch(fileFinishedDownloading(fileId)),
  setDownloadProgress: (progress, downloaded, downloadSpeed) => dispatch(setDownloadProgress(progress, downloaded, downloadSpeed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);