import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import swal from "sweetalert2";

library.add(faSync);

export default class Menu extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            tipocuenta: props.tipocuenta,
            eventoid:props.eventoid,
            pais: props.pais,
            api_token: localStorage.getItem("api_token"),
            menuApp: [],
            url: props.url,
            props: this.props,
            fotoproducto: props.fotoproducto == "1" ? true : false
        };
        /**
         * las siguientes funciones las declaro de esta manera para poder hacer uso de
         * los props y el state en ellas
         */
        //this.handleLogout = this.handleLogout.bind(this);
        this.getDetener = this.getDetener.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    /**
     * Luego que se renderi a el componente hago un llamado a la ruta para traer todas las
     * opciones adicionales del menu segun el evento
     */
    componentWillMount() {
        axios
            .get("api/eventos/id/" + this.state.eventoid,{
                headers: {
                    Authorization: this.state.api_token
                }
            })
            .then(res => {
                let arrayMenu = [];
                for (var i = 0; i < res.data.MenuApp.length; i++) {
                    arrayMenu.push(res.data.MenuApp[i].$oid);
                }
                //eliminando de cache los menusAdicionales
                //localStorage.removeItem("menusAdicionales");
                //guardando en cache los menus adicionales
                //localStorage.setItem("menusAdicionales", arrayMenu);
                console.log(arrayMenu);
                this.setState({ menuApp: arrayMenu });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    /**
     * Esta funcion se comunica con el componente padre(inicio) a traves de los props recibidos
     * @param {* esta variable recibe el evento al dar click en una opcion del menu} e
     */
    handleMenuClick(e) {
        e.preventDefault();
        this.props.onClick(e);
    }

    getDetener() {
        swal({
            title: '<i className="fa fa-exclamation-triangle"></i>',
            text: "Se ha detenido los procesos interno de la aplicación",
            confirmButtonColor: "#343a40"
        }).then(
            function(value) {
                // cumplimiento
                window.app.detener();
            },
            function(reason) {
                // rechazo
            }
        );
    }

    /*

    handleLogout(e) {
        let urlLogout = this.state.url + "/logout";
        e.preventDefault();
        localStorage.setItem("cache", "false");
        window.location.href = urlLogout;
    }*/

    render() {
        let url = this.state.url;
        console.log(this.state.menuApp);
        let changePassword = (
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={this.handleMenuClick}>
                    <i className="fas fa-lock fa-lg" />
                    &nbsp;&nbsp; Contraseña
                </a>
            </li>
        );
        //id de todas las opciones adicionales en bd:
        //5cc47bc79630550a4fd23c8d Agenda
        //5cc47c569630550a4fd23c9a Encuesta y voto
        //5cc47c929630550a4fd23c9d Guardaropas
        //5cc47bd19630550a4fd23c8e Menú
        //5cc47bdc9630550a4fd23c8f Gastronómico
        //5cc47be79630550a4fd23c90 Servicios
        //5cc47bf29630550a4fd23c91 Book Digital
        //5cc47bfe9630550a4fd23c92 Photo Call
        //5cc47c099630550a4fd23c93 Show de luces
        //5cc47c149630550a4fd23c94 Instagram
        //5cc47c1f9630550a4fd23c95 Twitter
        //5cc47c2e9630550a4fd23c96 Álbum
        //5cc47c369630550a4fd23c97 Juegos
        //5cc47c419630550a4fd23c98 Canción
        //5cc47c729630550a4fd23c9b Historia
        //5cc47ba29630550a4fd23c8c Regalos
        //5cc47c4c9630550a4fd23c99 Deseada
        //5cc47c7b9630550a4fd23c9c Opiniones y Valoraciones

        return (
            <ul className="navdrawer-nav roboto-condensed">
                <li className="nav-item">
                    <a
                        className="nav-link"
                        id="show"
                        href="#"
                        onClick={this.handleMenuClick}
                    >
                        <i className="fas fa-home fa-lg" />
                        &nbsp;&nbsp; Show
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        id="perfil"
                        href="#"
                        onClick={this.handleMenuClick}
                    >
                        <i className="fas fa-cog fa-lg" />
                        &nbsp;&nbsp; Perfil
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="notificaciones" href="#" onClick={this.handleMenuClick}>
                        <i className="fab fa-weixin fa-lg" />
                        &nbsp;&nbsp; Notificaciones
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={this.getDetener}>
                        <i className="fas fa-power-off fa-lg" />
                        &nbsp;&nbsp; Detener
                    </a>
                </li>

                {this.state.menuApp.includes("5cc47b4af39c6a0a4f6a4de4") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47b4af39c6a0a4f6a4de4") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="invitacion" href="#" onClick={this.handleMenuClick}>
                            <i className="fas fa-user-friends fa-lg" />
                            &nbsp;&nbsp; Invitación
                        </a>
                    </li>
                ) : (
                    ""
                )}

                {this.state.menuApp.includes("5cc47bc79630550a4fd23c8d") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47bc79630550a4fd23c8d ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="agenda" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-address-book" />
                            &nbsp;&nbsp; Agenda
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c569630550a4fd23c9a") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c569630550a4fd23c9a ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="Encuesta-y-voto" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-vote-yea" />
                            &nbsp;&nbsp; Encuesta y voto
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c929630550a4fd23c9d") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c929630550a4fd23c9d ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="guardaropas" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-tshirt" />
                            &nbsp;&nbsp; Guardaropas
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c929630550a4fd23c9d") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c929630550a4fd23c9d ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="menu" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-file-alt" />
                            &nbsp;&nbsp; Menú
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47bdc9630550a4fd23c8f") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47bdc9630550a4fd23c8f ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="gastronomico" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-drumstick-bite" />
                            &nbsp;&nbsp; Gastronómico
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47be79630550a4fd23c90") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47be79630550a4fd23c90 ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="servicios" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-concierge-bell" />
                            &nbsp;&nbsp; Servicios
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47bf29630550a4fd23c91") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47bf29630550a4fd23c91 ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="book-digital" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-book" />
                            &nbsp;&nbsp; Book Digital
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47bfe9630550a4fd23c92") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47bfe9630550a4fd23c92 ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="photo-call" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-camera" />
                            &nbsp;&nbsp; Photo Call
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c099630550a4fd23c93") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c099630550a4fd23c93 ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="show-de-luces" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-lightbulb" />
                            &nbsp;&nbsp; Show de luces
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c149630550a4fd23c94") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c149630550a4fd23c94 ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="instagram" href="#" onClick={this.handleMenuClick} >
                            <i className="fab fa-instagram" />
                            &nbsp;&nbsp; Instagram
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c1f9630550a4fd23c95") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c1f9630550a4fd23c95 ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="twitter" href="#" onClick={this.handleMenuClick} >
                            <i className="fab fa-twitter" />
                            &nbsp;&nbsp; Twitter
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c2e9630550a4fd23c96") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c2e9630550a4fd23c96 ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="album" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-images" />
                            &nbsp;&nbsp; Álbum
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c369630550a4fd23c97") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c369630550a4fd23c97 ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="juegos" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-gamepad" />
                            &nbsp;&nbsp; Juegos
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c419630550a4fd23c98") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c419630550a4fd23c98 ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="cancion" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-music" />
                            &nbsp;&nbsp; Canción
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c729630550a4fd23c9b") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c729630550a4fd23c9b ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="historia" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-landmark" />
                            &nbsp;&nbsp; Historia
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47ba29630550a4fd23c8c") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47ba29630550a4fd23c8c ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="regalos" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-gift" />
                            &nbsp;&nbsp; Regalos
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c4c9630550a4fd23c99") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c4c9630550a4fd23c99 ") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="deseada" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-laugh" />
                            &nbsp;&nbsp; Deseada
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {this.state.menuApp.includes("5cc47c7b9630550a4fd23c9c") ||
                localStorage
                    .getItem("menusAdicionales")
                    .includes("5cc47c7b9630550a4fd23c9c") ? (
                    <li className="nav-item">
                        <a className="nav-link" id="opiniones-y-valoraciones" href="#" onClick={this.handleMenuClick} >
                            <i className="fas fa-star-half-alt" />
                            &nbsp;&nbsp; Opiniones y Valoraciones
                        </a>
                    </li>
                ) : (
                    ""
                )}
                <li className="nav-item">
                    <a
                        className="nav-link"
                        href="#"
                        id="cambiar-contraseña"
                        onClick={this.handleMenuClick}
                    >
                        <i className="fas fa-lock fa-lg" />
                        &nbsp;&nbsp; Contraseña
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">
                    <i className="fas fa-sign-out-alt fa-lg" />
                        &nbsp;&nbsp; Salir
                    </a>
                </li>
            </ul>
        );
    }
}

if (document.getElementById("menu")) {
    const element = document.getElementById("menu");

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Menu {...props} />, element);
}
