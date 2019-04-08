import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from "sweetalert2";
import fondo from '../../../public/images/fondo.jpeg';
library.add( faSync);

export default class Inicio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            checkcamareromesa: props.checkcamareromesa,
            mesa: props.mesa,
            isLoading: false
        };

        this.handleGPS = this.handleGPS.bind(this);

    }

    handleGPS(e, url) {

        /* window.location.href=url+"/-54.804826/-68.313598"; */

        e.preventDefault();
        if(window.app.isCordova()){
            window.gpsCarhop(url);
        }else{
            swal({
                    showCloseButton: false,
                    showCancelButton: true,
                    showConfirmButton: false,
                    text: "Este servicio solo funciona con la APP instalada, no en modo Web",
                    cancelButtonText: 'Cerrar',
                    cancelButtonColor: '#343a40',
                    cancelButtonClass: 'btn-info-descripcion'
                });
        }


    }
    handleGPSCamarero(e, url) {

        e.preventDefault();
        if(window.app.isCordova()){
             window.location.href=url;
        }else{
            swal({
                    showCloseButton: false,
                    showCancelButton: true,
                    showConfirmButton: false,
                    text: "Este servicio solo funciona con la APP instalada, no en modo Web",
                    cancelButtonText: 'Cerrar',
                    cancelButtonColor: '#343a40',
                    cancelButtonClass: 'btn-info-descripcion'
                });
        }


    }

    render() {

        let url = this.state.url;
        let mesa = this.state.mesa;
        let checkcamareromesa = this.state.checkcamareromesa;
        let opacidad = '';
        let opacidadCamarero = '';
        let opacidadReserva = ' ';

        let urlCarhopList     = url + '/carhop/sucursalesgps';
        let urlCarhopMap      = url + '/carhop/map';

        let urlDeliveryList   = url + '/delivery/list';
        let urlDeliveryMap    = url + '/delivery/map';

        let urlRetiroList     = url + '/retiro/list';
        let urlRetiroMap      = url + '/retiro/map';

        let urlCamareroList   = url + '/scan-qr-camarero';

        let urlReservaList    = url + '/reserva/sucursalesgps';
        let urlReservaMap     = url + '/reserva/map';


        if(checkcamareromesa){

            opacidad = ' opacidad';
            opacidadCamarero = '';

            urlCarhopList     = '#';
            urlCarhopMap      = '#';

            urlDeliveryList   = '#';
            urlDeliveryMap    = '#';

            urlRetiroList     = '#';
            urlRetiroMap      = '#';

            urlReservaList    = '#';
            urlReservaMap     = '#';

            urlCamareroList   = url + '/comensal/' + mesa + '/cart';

        }


        return (

            <div className="main">

                    <div className="">
                        <img src={fondo} style={{'width': '100%'}} />
                    </div>
                       



            </div>

    );
    }
}

if (document.getElementById('inicio')) {

    const element = document.getElementById('inicio');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Inicio {...props} />, element);
}