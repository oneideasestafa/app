import React from 'react';
import swal from "sweetalert2";

class RedesSociales extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            estaCargando: false,
            api_token: localStorage.getItem("api_token"),
            hashtagsTwitter: [],
            hashtagsInstagram: []
        }

        this.consultarHashtagsDisponibles = this.consultarHashtagsDisponibles.bind(this);
        this.publicarEnTwitter = this.publicarEnTwitter.bind(this);
        this.publicarEnInstagram = this.publicarEnInstagram.bind(this);
        this.obtenerHashtags = this.obtenerHashtags.bind(this);
    }

    /**
     * Procesos posteriores al renderizado
     * 
     * @return {void}
     */
    componentWillMount() {
        this.consultarHashtagsDisponibles();
    }

    /**
     * Consultar Hashtags disponibles
     * 
     * @return {void}
     */
    consultarHashtagsDisponibles() {
        axios.get('api/eventos/redes-sociales/consultar?eventoId=' + localStorage.getItem("eventoId"), {
            headers: {
                Authorization: this.state.api_token
            }
        }).then(respuesta => {
            if (respuesta.status === 200) {

                this.setState({
                    estaCargando: false,
                    hashtagsTwitter: (respuesta.data.hashtagsTwitter) ? JSON.parse(respuesta.data.hashtagsTwitter) : [],
                    hashtagsInstagram: (respuesta.data.hashtagsInstagram) ? JSON.parse(respuesta.data.hashtagsInstagram) : []
                })

                return
            }

            swal(
                'Problema con la conexión',
                'error',
                'sweet'
            );
        })
    }

    /**
     * Publicar contenido en Twitter
     * 
     * @return {void}
     */
    publicarEnTwitter() {
        window.location.href = "https://twitter.com/intent/tweet?hashtags=" + this.obtenerHashtags("Twitter");
    }

    /**
     * Publicar contenido en Instagram
     * 
     * @return {void}
     */
    publicarEnInstagram() {

        // Opciones de camara
        let opcionesDeCamara = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,
            encodingType: 0
        };

        navigator.camera.getPicture((imagenCodificada) => {
            Instagram.isInstalled((err, installed) => {
                if (installed) {
                    Instagram.share('data:image/jpeg;base64,' + imagenCodificada, 'Caption', (resultado) => (console.log(resultado)));
                } else {
                    swal(
                        "¡Instagram no esta instalado!",
                        "error",
                        "sweet"
                    );
                }
            });
        },
        (error) => {
            console.log(error);
        }, opcionesDeCamara);
    }

    /**
     * Obtener Hashtags consultados
     * 
     * @param {string} redSocial
     * @return {void}
     */
    obtenerHashtags(redSocial) {
        return this.state["hashtags" + redSocial]
            .map((hashtag) => (hashtag.substring(1)))
            .join();
    }

    render () {
        if (!this.state.estaCargando) {
            return (
                <div>
                    { this.state.hashtagsTwitter.length > 0 &&
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.publicarEnTwitter}>
                            <i className="fab fa-twitter fa-lg" /> {"    "} Twitter
                            </a>
                        </li>
                    }
                    { this.state.hashtagsInstagram.length > 0 &&
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.publicarEnInstagram} >
                                <i className="fab fa-instagram fg-lg" /> {"    "} Instagram
                            </a>
                        </li>
                    }
                </div>
            );
        } else {
            <li className="nav-item"></li>
        }
    }
}

export default RedesSociales;