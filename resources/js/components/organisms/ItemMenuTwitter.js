import React from 'react';

/*
- Obtener el eventoId
- Verificar si esta en el Menu del Evento
- Verificar si obtiene los hashtags
- Asociar componente con Instagram
- Enviar Foto a Instagram (Evaluar)
*/

class ItemMenuTwitter extends React.Component {
    constructor (props) {
        super(props);

        this.eventoId = "5cbadeb1388f7c4c5e5910d2";
        this.hashtagsTwitter = ["#Yo"];
        this.hashtagsInstagram = ["#Tu"];

        this.state = {
            estaCargando: false,
            api_token: localStorage.getItem("api_token")
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
        this.consultarHashtagsDisponibles()
    }

    /**
     * Consultar Hashtags disponibles
     * 
     * @return {void}
     */
    consultarHashtagsDisponibles() {
        axios.get('api/eventos/redes-sociales/consultar?eventoId=' + this.state.eventoId, {
            headers: {
                Authorization: this.state.api_token
            }
        }).then(respuesta => {
            if (respuesta.status === 200) {

                this.hashtagsTwitter = (respuesta.data.hashtagsTwitter) ? JSON.parse(respuesta.data.hashtagsTwitter) : [];
                this.hashtagsInstagram = (respuesta.data.hashtagsInstagram) ? JSON.parse(respuesta.data.hashtagsInstagram) : [];

                this.setState({
                    estaCargando: false
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
        console.log('Compartir en Instagram');

        // No Mostrar Instagram si no esta instalado
        /* Instagram.isInstalled((err, installed) => {
            if (installed) {
                console.log("Instagram is", installed);
            } else {
                console.log("Instagram is not installed");
            }
        }); */

        // Funcion de camara
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,
            encodingType: 0
        };

        navigator.camera.getPicture((imageData) => {
            console.log(imageData);

            // Funcion de compartir en Instagram
            Instagram.share('data:image/jpeg;base64,' + imageData, 'Caption', (resultado) => (
                console.log(resultado)
            ));
        },
        (error) => {
            console.log(error);
        }, options);
    }

    /**
     * Obtener Hashtags consultados
     * 
     * @param {string} redSocial
     * @return {void}
     */
    obtenerHashtags(redSocial) {
        return this["hashtags" + redSocial]
            .map((hashtag) => (hashtag.substring(1)))
            .join();
    }

    render () {
        if (!this.state.estaCargando) {
            return (
                <div>
                    { this.hashtagsTwitter.length > 0 &&
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.publicarEnTwitter}>
                            <i className="fab fa-twitter fa-lg" /> {"    "} Twitter
                            </a>
                        </li>
                    }
                    { this.hashtagsInstagram.length > 0 &&
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

export default ItemMenuTwitter;