import React, { Component } from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import swal from "sweetalert2";
import fondo from "../../../../public/images/fondo.jpeg";
import Menu from "../components/Menu";
import Invitacion from "../components/MenuApps/Invitacion";
import CambiarClave from "../components/MenuApps/CambiarClave";
import CambiarDatos from "../components/MenuApps/CambiarDatos";

library.add(faSync);

import logo from "../../../../public/images/logo-one.png";

//importando estilos
import "./css/Inicio.css";

export default class Inicio extends Component {
    constructor(props) {
        const stateQuestionEvent = props.location.state;
        super(props);
        this.state = {
            url: props.url,
            eventoid: stateQuestionEvent.evento,
            sector: stateQuestionEvent.sector,
            fila: stateQuestionEvent.fila,
            asiento: stateQuestionEvent.asiento,
            manual: stateQuestionEvent.manual,
            eventoUbicacionManual: stateQuestionEvent.eventoUbicacionManual,
            checkcamareromesa: props.checkcamareromesa,
            mesa: props.mesa,
            seccion: "show",
            isLoading: false
        };

        this.handleGPS = this.handleGPS.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleGPS(e, url) {
        e.preventDefault();
        if (window.app.isCordova()) {
            window.gpsCarhop(url);
        } else {
            swal({
                showCloseButton: false,
                showCancelButton: true,
                showConfirmButton: false,
                text:
                    "Este servicio solo funciona con la APP instalada, no en modo Web",
                cancelButtonText: "Cerrar",
                cancelButtonColor: "#343a40",
                cancelButtonClass: "btn-info-descripcion"
            });
        }
    }
    handleGPSCamarero(e, url) {
        e.preventDefault();
        if (window.app.isCordova()) {
            window.location.href = url;
        } else {
            swal({
                showCloseButton: false,
                showCancelButton: true,
                showConfirmButton: false,
                text:
                    "Este servicio solo funciona con la APP instalada, no en modo Web",
                cancelButtonText: "Cerrar",
                cancelButtonColor: "#343a40",
                cancelButtonClass: "btn-info-descripcion"
            });
        }
    }

    flash() {
        window.app.flashlight();
        console.log("flash");
    }

    handleMenuClick(e) {
        let seccion = document.getElementById("seccion");
        let opcionMenu = $("#" + e.target.id).text();
        this.setState({ seccion: opcionMenu });
        console.log(e.target.id);
        if (e.target.id == "perfil") {
            console.log("estoy en perfil");
            ReactDOM.render(<CambiarDatos />, seccion);
        } else if (e.target.id == " cambiar-contraseña") {
            console.log("estoy aqui contrasena");
            ReactDOM.render(<CambiarClave />, seccion);
        }
    }

    render() {
        console.log(this.state);
        let url = this.state.url;
        let mesa = this.state.mesa;
        let checkcamareromesa = this.state.checkcamareromesa;
        let opacidad = "";
        let opacidadCamarero = "";
        let opacidadReserva = " ";

        let urlCarhopList = url + "/carhop/sucursalesgps";
        let urlCarhopMap = url + "/carhop/map";

        let urlDeliveryList = url + "/delivery/list";
        let urlDeliveryMap = url + "/delivery/map";

        let urlRetiroList = url + "/retiro/list";
        let urlRetiroMap = url + "/retiro/map";

        let urlCamareroList = url + "/scan-qr-camarero";

        let urlReservaList = url + "/reserva/sucursalesgps";
        let urlReservaMap = url + "/reserva/map";

        if (checkcamareromesa) {
            opacidad = " opacidad";
            opacidadCamarero = "";

            urlCarhopList = "#";
            urlCarhopMap = "#";

            urlDeliveryList = "#";
            urlDeliveryMap = "#";

            urlRetiroList = "#";
            urlRetiroMap = "#";

            urlReservaList = "#";
            urlReservaMap = "#";

            urlCamareroList = url + "/comensal/" + mesa + "/cart";
        }

        document.body.style.backgroundImage = "url('" + fondo + "')";
        document.body.style.backgroundPosition = "center";
        return (
            <div id="main" className="main">
                <header className="navbar navbar-dark fixed-top navbar-full bg-rojo">
                    <button
                        aria-controls="navdrawerDefault"
                        aria-expanded="false"
                        aria-label="Toggle Navdrawer"
                        className="navbar-toggler"
                        data-target="#navdrawerDefault"
                        data-toggle="navdrawer"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <span className="navbar-brand mr-auto">
                        {this.state.seccion}
                    </span>
                </header>

                <div
                    aria-hidden="true"
                    className="navdrawer"
                    id="navdrawerDefault"
                    tabIndex="-1"
                >
                    <div className="navdrawer-content">
                        <div className="navdrawer-header roboto-condensed">
                            <a
                                className="navbar-brand px-0 boton-logo"
                                href="javascript:void(0)"
                            >
                                {" "}
                                <img className="logo-imagen" src={logo} />
                            </a>
                            <p className="parrafo-menu" />
                        </div>

                        <Menu
                            onClick={this.handleMenuClick}
                            eventoid={this.state.eventoid}
                        />
                    </div>
                </div>
                <div
                    id="seccion"
                    className=""
                    style={{ textAlign: "center", paddingTop: "50%" }}
                />
            </div>
        );
    }
}
