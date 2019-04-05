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
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.llamarCamarero = this.llamarCamarero.bind(this);
        this.solicitarCuentaCamarero = this.solicitarCuentaCamarero.bind(this);
        this.getData = this.getData.bind(this);

    }

    llamarCamarero(){

        swal({
            title: '<i class="fas fa-info-circle"></i>',
            text: "¿Esta seguro que desea llamar al camarero",
            showCancelButton: true,
            confirmButtonColor: '#343a40',
            cancelButtonColor: '#343a40',
            cancelButtonText: 'No',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.value) {

                axios.post('/ajax-post-camarero-llamar')
                    .then(res => {
                        if(res){

                            let r = res.data;

                            if(r.code === 200){

                                swal({
                                    title: '<i class="fa fa-check-circle"></i>',
                                    text: r.msj,
                                    confirmButtonColor: '#343a40'
                                });

                            }else if(r.code === 500){

                                swal({
                                    title: '<i class="fa fa-exclamation-triangle"></i>',
                                    text: r.msj,
                                    confirmButtonColor: '#343a40'
                                });

                            }

                        }
                    })
                    .catch(function (error) {

                    });

            }
        });

    }

    solicitarCuentaCamarero(){

        swal({
            title: '<i class="fas fa-info-circle"></i>',
            text: "¿Esta seguro que desea solicitar la cuenta al camarero",
            showCancelButton: true,
            confirmButtonColor: '#343a40',
            cancelButtonColor: '#343a40',
            cancelButtonText: 'No',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.value) {

                axios.post('/ajax-post-camarero-solicitar-cuenta')
                    .then(res => {
                        if(res){

                            let r = res.data;

                            if(r.code === 200){

                                swal({
                                    title: '<i class="fa fa-check-circle"></i>',
                                    text: r.msj,
                                    confirmButtonColor: '#343a40'
                                });

                            }else if(r.code === 500){

                                swal({
                                    title: '<i class="fa fa-exclamation-triangle"></i>',
                                    text: r.msj,
                                    confirmButtonColor: '#343a40'
                                });

                            }

                        }
                    })
                    .catch(function (error) {

                    });

            }
        });

    }

    getData(){

        let self = this;

        axios.post('/ajax-post-comensal-menu-check-camarero')
            .then(res => {
                if(res){

                    let r = res.data;

                    if(r.code === 200){

                        self.setState({
                            checkcamareromesa: r.checkcamareromesa,
                            codigoComensal: r.codigoComensal
                        });

                    }

                    setTimeout(this.getData, 2000);

                }
            })
            .catch(function (error) {

            });

    }

    handleCheckClick(e){

        this.setState({ fotoproducto: !this.state.fotoproducto });

        let fotoproducto = this.state.fotoproducto;

        axios.post('/ajax/check/fotoproducto', { fotoproducto })
            .then(res => {

                let r = res.data;

                if(r.code === 200){

                }else{
                    console.log('error al actualizar el mostrar foto en producto');
                }

            })
            .catch(function (error) {
                console.log(error);
            });


    }

    handleLogout(e){

        let urlLogout = this.state.url+'/logout';
        e.preventDefault();
        localStorage.setItem('cache','false');
        window.location.href = urlLogout;

    }

    componentDidMount(){
        this.getData();
    }

    render() {

        let tipoCuenta = this.state.tipocuenta;
        let url = this.state.url;
        let fotoproducto = this.state.fotoproducto;
        let pais = this.state.pais;
        let checkcamarero = this.state.checkcamareromesa;
        let reserva = false;

        let urlInicio       = url + '/';
        let urlMisPedidos   = url + '/mispedidos/index';
        let urlPerfil       = url + '/cliente/perfil';
        let urlDireccion    = url + '/direccion/index';
        let urlVehiculo     = url + '/vehiculo/index';
        let urlTarjetas     = url + '/tarjetas/index';
        let urlFavoritos    = url + '/cliente/favoritos';
        let urlCambiarClave = url + '/cliente/cambiar/password';
        let urlChatSoporte  = url + '/chat/soporte';
        let urlMisReservas  = url + '/misreservas/index';

        let changePassword =  <li className="nav-item"><a className="nav-link" href={urlCambiarClave}><i className="fas fa-lock fa-lg"></i>&nbsp;&nbsp; Contraseña</a></li>;
console.log('test');
        return (

            <ul className="navdrawer-nav roboto-condensed">

                <li className="nav-item">
                    <a className="nav-link" href={urlInicio}><i
                        className="fas fa-home fa-lg"></i>&nbsp;&nbsp; Inicio</a>
                </li>
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