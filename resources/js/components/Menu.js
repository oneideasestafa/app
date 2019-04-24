import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from "sweetalert2";

library.add( faSync);

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipocuenta: props.tipocuenta,
            pais: props.pais,
            url: props.url,
            fotoproducto: props.fotoproducto == "1" ? true : false,
            checkcamareromesa: false,
            codigoComensal: ''
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.getDetener = this.getDetener.bind(this);

    }

    getDetener(){

        swal({
            title: '<i class="fa fa-exclamation-triangle"></i>',
            text: 'Se ha detenido los procesos interno de la aplicación',
            confirmButtonColor: '#343a40'
        });

    }

    handleLogout(e){

        let urlLogout = this.state.url+'/logout';
        e.preventDefault();
        localStorage.setItem('cache','false');
        window.location.href = urlLogout;

    }

    render() {

        let tipoCuenta = this.state.tipocuenta;
        let url = this.state.url;

        let urlInicio       = url + '/';
        let urlPerfil       = url + '/cliente/perfil';
        let urlCambiarClave = url + '/cliente/cambiar/password';
        let urlChatSoporte  = url + '/chat/soporte';

        let changePassword =  <li className="nav-item"><a className="nav-link" href={urlCambiarClave}><i className="fas fa-lock fa-lg"></i>&nbsp;&nbsp; Contraseña</a></li>;

        return (

            <ul className="navdrawer-nav roboto-condensed">

                <li className="nav-item">
                    <a className="nav-link" href={urlInicio}><i
                        className="fas fa-home fa-lg"></i>&nbsp;&nbsp; Show</a>
                </li>
                 <li className="nav-item">
                    <a className="nav-link" href={urlPerfil}><i
                        className="fas fa-cog fa-lg"></i>&nbsp;&nbsp;  Perfil</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#"><i
                        className="fab fa-weixin fa-lg"></i>&nbsp;&nbsp; Notificaciones</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={this.getDetener}><i
                        className="fas fa-power-off fa-lg"></i>&nbsp;&nbsp; Detener</a>
                </li>

                { changePassword }

                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={this.handleLogout}><i
                        className="fas fa-sign-out-alt fa-lg"></i>&nbsp;&nbsp; Salir</a>
                </li>

            </ul>
        );
    }
}

if (document.getElementById('menu')) {

    const element = document.getElementById('menu');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Menu {...props} />, element);
}
