import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import DeviceOrientation, { Orientation } from "react-screen-orientation";
library.add(faSync);

/**Importando estilos CSS */
import "../css/Invitacion.css";

export default class Invitacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            invitaciones: [],
            api_token: localStorage.getItem("api_token"),
            idEvento: this.props.eventoid,
            isLoading: false
        };
    }

    componentWillMount() {
        axios
            .get("api/eventos/invitacion/" + this.state.idEvento, {
                headers: {
                    Authorization: this.state.api_token
                }
            })
            .then(res => {
                let r = res.data;
                if (r.code === 200) {
                    this.setState({
                        invitaciones: r.invitaciones.invitaciones
                    });
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        let { invitaciones } = this.state;

        //var prueba = invitaciones[0].PathImg.split("http://localhost:8000");
        return (
            <div className="centrado-absoluto contenedor-invitacion">
                <div className="container-fluid">
                    <DeviceOrientation>
                        <Orientation
                            orientation="landscape"
                            alwaysRender={false}
                        >
                            {invitaciones[0] ? (
                                <div>
                                    <div className="row">
                                        <div className="col-12">
                                            {invitaciones[0].PathImg ? (
                                                <img
                                                    src={
                                                        invitaciones[0].PathImg
                                                    }
                                                    className="invitacion-img"
                                                />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>

                                    <div className="row  mt-4">
                                        <div className="col-12 text-center">
                                            {invitaciones[0].PathPdf ? (
                                                <a
                                                    href={
                                                        invitaciones[0].PathPdf
                                                    }
                                                    target="_blank"
                                                >
                                                    <button className="btn btn-sm btn-danger">
                                                        Descargar Invitación PDF
                                                    </button>
                                                </a>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    Rote su dispositivo en modo vertical para
                                    ver la tarjeta de invitación
                                </div>
                            )}
                        </Orientation>

                        <Orientation
                            orientation="portrait"
                            alwaysRender={false}
                        >
                            {invitaciones[1] ? (
                                <div>
                                    <div className="row">
                                        <div className="col-12">
                                            <img
                                                src={invitaciones[1].PathImg}
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>

                                    <div className="row  mt-4">
                                        <div className="col-12 text-center">
                                            {invitaciones[1].PathPdf ? (
                                                <a
                                                    href={
                                                        invitaciones[1].PathPdf
                                                    }
                                                    target="_blank"
                                                >
                                                    <button className="btn btn-sm btn-danger">
                                                        Descargar Invitación PDF
                                                    </button>
                                                </a>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    Rote su dispositivo en modo horizontal para
                                    ver la tarjeta de invitación
                                </div>
                            )}
                        </Orientation>
                    </DeviceOrientation>
                </div>
            </div>
        );
    }
}
