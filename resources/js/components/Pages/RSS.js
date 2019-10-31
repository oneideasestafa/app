import React from 'react';
import axios from 'axios';
import swal from "sweetalert2";
import { connect } from 'react-redux';
import { request } from './../../config/axios';
import { setCurrentPage } from '../../redux/actions/navigation';
import Spinner from '../atoms/Spinner';

class RSS extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
        estilosCuadroDeComentarios: {
            'marginTop': '0.5rem',
            'color': '#000 !important',
            'backgroundColor': '#fff !important',
        },
        imagenCodificada: null,
        estaCargando: false
    }

    this.registrarPublicacion = this.registrarPublicacion.bind(this);
    this.volverALaPaginaDelShow = this.volverALaPaginaDelShow.bind(this);
    this.tomarFoto = this.tomarFoto.bind(this);
    this.revelarImagen = this.revelarImagen.bind(this);
  }

  /**
   * Tomar fotografia a publicar
   * 
   * @return {void}
   */
  tomarFoto() {

    let opcionesDeCamara = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: 1,
        encodingType: 1
    };

    navigator.camera.getPicture(
      (imagenCodificada) => {
        this.revelarImagen(imagenCodificada);
      },
      (error) => {
        console.log(error);
      }, opcionesDeCamara);
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
            { this.state.estaCargando &&
                <Spinner />
            }
            { this.state.imagenCodificada &&
                <div className="row">
                    <div className="col">
                        <img id="imagenCapturada" className="img-fluid"></img>
                    </div>
                </div>
            }
            { !this.state.estaCargando &&
                <div>
                     <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <textarea
                                    rows="3"
                                    id="descripcion"
                                    className="form-control"
                                    placeholder="¿Qué estas pensando?"
                                    style={this.state.estilosCuadroDeComentarios}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1">
                            <button
                                type="button"
                                className="btn btn-rojo btn-box-index"
                                onClick={this.tomarFoto}
                            >
                                <i className="fas fa-camera fa-lg"></i>
                            </button>
                        </div>
                        <div className="col-6 offset-3">
                            <button
                                type="button"
                                className="btn btn-rojo btn-box-index"
                                onClick={this.registrarPublicacion}
                            >
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>
            }
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
  setCurrentPage: (page) => dispatch(setCurrentPage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(RSS);