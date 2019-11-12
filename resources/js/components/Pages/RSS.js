import React from 'react';
import swal from "sweetalert2";
import { connect } from 'react-redux';
import { request } from './../../config/axios';
import { appStartedLoading, appFinishLoading } from '../../redux/actions/auth';
import { setCurrentPage } from '../../redux/actions/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RSS extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      image: '',
      success: false,
      errors: null,
      description: '',
      imagenCodificada: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.chooseImageSource = this.chooseImageSource.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccessfulUpload = this.handleSuccessfulUpload.bind(this);
    this.handleErrorOnUpload = this.handleErrorOnUpload.bind(this);

    this.registrarPublicacion = this.registrarPublicacion.bind(this);
    this.volverALaPaginaDelShow = this.volverALaPaginaDelShow.bind(this);
    this.revelarImagen = this.revelarImagen.bind(this);

    this.transferId = 1;
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  chooseImageSource (e) {
    Cordova.exec(buttonIndex => {
      if (buttonIndex === 0)
        return;
      
      const source = buttonIndex === 2 ? (
        navigator.camera.PictureSourceType.PHOTOLIBRARY
      ) : (
        navigator.camera.PictureSourceType.CAMERA
      );

      navigator.camera.getPicture(imageData => {
        window.resolveLocalFileSystemURL(imageData, fileEntry => {
          this.setState({
            image: fileEntry.toInternalURL(),
          })
        }, console.log);
      }, console.log, {
        sourceType: source,
        allowEdit: true,
        madiaType: navigator.camera.MediaType.PICTURE,
        saveToPhotoAlbum: true,
      });
    }, null, 'Notification', 'confirm', [
      '¿De donde desea tomar la imagen?',
      'Buscar Foto',
      ['Tomar Foto', 'Galería']
    ]);
  }

  handleSubmit (e) {
    e.preventDefault();

    const { image, description } = this.state;
    const { eventId, accessToken } = this.props;

    this.setState({ 
      success: false,
      errors: null 
    });

    this.props.appStartedLoading();

    if (image !== '') {
      /**
       * I use this syntax because of a bug where the
       * FileTransfer constructor is undefined
       */
      Cordova.exec(this.handleSuccessfulUpload, this.handleErrorOnUpload,
        'FileTransfer',
        'upload',
        [
          image, // filePath
          `${process.env.MIX_APP_URL}/api/event/${eventId}/rss`, // Server
          'image', // fileKey
          image.substr(image.lastIndexOf('/') + 1), // fileName
          '', // mimeType
          { description }, // params
          false, // trustAllHost
          false, // chunckedMode
          { 
            Authorization: `Bearer ${accessToken}`,
            'X-Requested-With': 'XMLHttpRequest'
          }, // headers
          this.transferId, // _id
          'POST', // httpMethod
        ]
      );
    } else {

      request.post(`/api/event/${eventId}/rss`, { description }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(res => this.handleSuccessfulUpload({ 
        response: JSON.stringify(res.data),
        responseCode: res.status
      }))
      .catch(e => this.handleErrorOnUpload({
        http_status: e.response.status,
        body: JSON.stringify(e.response.data),
      }));
    }
  }

  handleSuccessfulUpload (res) {
    console.log('res', res);
    if (res.responseCode) {
      
      this.setState({
        description: '',
        image: '',
        success: true,
        errors: null,
      }, () => this.props.appFinishLoading());

      this.transferId += 1;    
    }
  }

  handleErrorOnUpload (err) {
    console.log('err', err);
    if (err.http_status === 422) {
      const body = JSON.parse(err.body);
      let errors = [];

      Object.keys(body.errors).forEach(key => {
        errors = errors.concat(body.errors[key]);
      });

      this.setState({
        success: false,
        errors
      });

    } else {
      this.setState({
        success: false,
        errors: 'Algo ha ocurrido, intentalo nuevamente.',
      })
    }

    this.props.appFinishLoading();
  }

  /**
   * Mostrar la imagen capturada por la camara
   * 
   * @param {string} imagenCodificada
   * @return {void}
   */
  revelarImagen(imagenCodificada) {
    this.setState({ imagenCodificada }, () => (
      document.getElementById('imagenCapturada').src = 'data:image/png;base64,' + imagenCodificada
    ))
  }

  /**
   * Registrar publicacion RSS
   * 
   * @return {void}
   */
  registrarPublicacion() {

    if (!document.getElementById("descripcion").value) {
        swal(
            'Sin información',
            'Ingresa un estado a compartir',
            'warning',
            'sweet'
        );

        return
    }

    this.setState({ estaCargando: true });
    
    let datosDelFormulario = new FormData();
    datosDelFormulario.append("eventoId", this.props.eventId);
    datosDelFormulario.append("descripcion", document.getElementById("descripcion").value);
    datosDelFormulario.append("rutaDeImagen", (this.state.imagenCodificada) ? this.state.imagenCodificada : null);

    request.post('api/event/RSS', datosDelFormulario, {
        headers: {
            Authorization: `Bearer ${this.props.accessToken}`
        },
    }).then(() => {
        swal(
            'Éxito',
            'Publicación enviada',
            'success',
            'sweet'
        );

        this.volverALaPaginaDelShow();
    });
    
  }

  /**
   * Regresar a la seccion del Show
   * 
   * @return {void}
   */
  volverALaPaginaDelShow() {
    this.props.setCurrentPage('Show');
    this.props.history.push('/show');
  }

  render () {
    return (
      <div className="container-fluid">
        {this.state.image !== '' &&
          <div className="row">
            <div className="col">
              <img src={this.state.image} className="img-fluid" />
            </div>
          </div>
        }
        {this.state.success &&
            <div className="alert alert-success">
              Publicación realizada correctamente
            </div>
          }
        {this.state.errors !== null &&
            <div className="alert alert-danger">
              {typeof this.state.errors === 'string' ? (
                this.state.errors
              ) : (
                <ul style={{ margin: 0, paddingInlineStart: '20px' }}>
                  {this.state.errors.map((err, i) => (
                    <li key={i}>
                      {err}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          }
        <div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <textarea
                  rows="3"
                  name="description"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.description}
                  placeholder="¿Qué estas pensando?"
                  style={{
                    marginTop: '0.5rem',
                    color: '#000 !important',
                    backgroundColor: '#fff !important',
                  }}
                >
                </textarea>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-1">
              <button
                type="button"
                className="btn btn-rojo btn-box-index"
                onClick={this.chooseImageSource}
              >
                <FontAwesomeIcon icon="camera" size="lg" />
              </button>
            </div>
            <div className="col-6 offset-3">
              <button
                type="button"
                className="btn btn-rojo btn-box-index"
                onClick={this.handleSubmit}
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current: state.navigation.current,
  eventId: state.events.current._id,
  accessToken: state.auth.accessToken
});

const mapDispatchToProps = dispatch => ({
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  appStartedLoading: () => dispatch(appStartedLoading()),
  appFinishLoading: () => dispatch(appFinishLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RSS);