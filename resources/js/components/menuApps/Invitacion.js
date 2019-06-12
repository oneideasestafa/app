import React, { Component } from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import swal from "sweetalert2";

library.add(faSync);

export default class Invitacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            invitaciones: props.invitaciones
        };
    }

    render() {
        let algo;
        let invitacionesArray = JSON.parse(this.state.invitaciones);
        return (
            <div>
                <div className="mb-4">
                    <img src={invitacionesArray[0].PathImg} />
                </div>

                <div>
                    <a
                        className="btn btn-danger"
                        href={invitacionesArray[0].PathPdf}
                    >
                        <i className="fas fa-file-pdf" />
                        &nbsp;&nbsp;Descargar PDF
                    </a>
                </div>
            </div>
        );
    }
}

if (document.getElementById("invitacion-component")) {
    const element = document.getElementById("invitacion-component");

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Invitacion {...props} />, element);
}
