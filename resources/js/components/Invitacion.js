import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from "sweetalert2";
library.add( faSync);

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

        let {invitaciones} = this.state;

        return (

            <div className="abs-centere">


                <div className="row">
                    <div className="col-12">
                        <img src={invitaciones[0].PathImgH} width="1000" height="1200"/>
                    </div>
                </div>

                <div className="row text-center mt-4">
                    <div className="col-12">
                        {invitaciones[0].PathPdfH ?

                            <a href={invitaciones[0].PathPdfH} target="_blank"><button className="btn btn-sm btn-danger">Descargar PDF</button></a>

                            : ''
                        }
                    </div>

                </div>

            </div>
        );
    }
}

if (document.getElementById('invitacion')) {

    const element = document.getElementById('invitacion');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Invitacion {...props} />, element);
}
