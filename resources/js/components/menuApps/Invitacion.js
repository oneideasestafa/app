import React, { Component } from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import swal from "sweetalert2";
import DeviceOrientation, { Orientation } from "react-screen-orientation";
library.add(faSync);

export default class Invitacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            invitaciones: JSON.parse(props.invitaciones),
            isLoading: false
        };
    }

    render() {
        let url = this.state.url;

        let { invitaciones } = this.state;

        var prueba = invitaciones[0].PathImg.split("http://localhost:8000");
        console.log(prueba);
        return (
            <div className="container-fluid">
                <DeviceOrientation>
                    <Orientation orientation="landscape" alwaysRender={false}>
                        {invitaciones[0] ? (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        {invitaciones[0].PathImg ? (
                                            <img
                                                src={invitaciones[0].PathImg}
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
                                                href={invitaciones[0].PathPdf}
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
                                Rote su dispositivo en modo vertical para ver la
                                tarjeta de invitación
                            </div>
                        )}
                    </Orientation>

                    <Orientation orientation="portrait" alwaysRender={false}>
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
                                                href={invitaciones[1].PathPdf}
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
                                Rote su dispositivo en modo horizontal para ver
                                la tarjeta de invitación
                            </div>
                        )}
                    </Orientation>
                </DeviceOrientation>
            </div>
        );
    }
}

if (document.getElementById("invitacion-component")) {
    const element = document.getElementById("invitacion-component");

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Invitacion {...props} />, element);
}
