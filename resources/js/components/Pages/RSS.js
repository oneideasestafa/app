import React from 'react';
import axios from 'axios';
import swal from "sweetalert2";
import { connect } from 'react-redux';
import { setCurrentPage } from '../../redux/actions/navigation';

class RSS extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
        api_token: localStorage.getItem("api_token"),
        estilosCuadroDeComentarios: {
            'margin-top': '0.5rem',
            'color': '#000 !important',
            'background-color': '#fff !important',
        },
        imagenCodificada: null
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
            'Ingresa un estado a compartir',
            'error',
            'sweet'
        );

        return
    }

    let datosDelFormulario = new FormData();
    datosDelFormulario.append("eventoId", localStorage.getItem("eventoId"));
    datosDelFormulario.append("descripcion", document.getElementById("descripcion").value);
    datosDelFormulario.append("rutaDeImagen", (this.state.imagenCodificada) ? this.state.imagenCodificada : null);

    axios.post('api/eventos/RSS', datosDelFormulario, {
        headers: {
            Authorization: this.state.api_token
        },
    }).then(() => {
        swal(
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
            { this.state.imagenCodificada &&
                <div className="row">
                    <div className="col">
                        <img id="imagenCapturada" className="img-fluid"></img>
                    </div>
                </div>
            }
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
    );
  }
}

const mapStateToProps = state => ({
  current: state.navigation.current
});

const mapDispatchToProps = dispatch => ({
  setCurrentPage: (page) => dispatch(setCurrentPage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(RSS);