import React from 'react';
import axios from 'axios';

class RSS extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
        api_token: localStorage.getItem("api_token"),
        estilosCuadroDeComentarios: {
            'color': '#000 !important',
            'background-color': '#fff !important',
        }
    }

    this.registrarPublicacion = this.registrarPublicacion.bind(this);
  }

  /**
   * Registrar publicacion RSS
   * 
   * @return {void}
   */
  registrarPublicacion() {

    let datosDelFormulario = new FormData();
    datosDelFormulario.append("eventoId", localStorage.getItem("eventoId"));
    datosDelFormulario.append("descripcion", document.getElementById("descripcion").value);
    datosDelFormulario.append("rutaDeImagen", null);

    axios.post('api/eventos/RSS', datosDelFormulario, {
        headers: {
            Authorization: this.state.api_token
        },
    })

    this.props.setCurrentPage("/");
  }

  render () {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div class="form-group">
                        <textarea
                            rows="3"
                            id="descripcion"
                            class="form-control"
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
                    >
                        <i className="fas fa-camera fa-lg"></i>
                    </button>
                </div>
                <div className="col-6 offset-3">
                    <button
                        type="button"
                        className="btn btn-rojo btn-box-index"
                        onClick={this.tomarFoto}
                    >
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
  }
}

export default RSS;