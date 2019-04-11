import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoOne from '../../../public/images/logo-one.png';

import logoFacebook from '../../../public/images/social/facebook-icon.svg';
import logoGoogle from '../../../public/images/social/google-icon.svg';
import logoTwitter from '../../../public/images/social/twitter-icon.svg';
import logoInstagram from '../../../public/images/social/instagram-icon.svg';
import imgAR from '../../../public/images/countrys/ar.png';
import imgCL from '../../../public/images/countrys/es.png';
//import logoFacebook from '../../../../../public/images/social/facebook-icon.svg';
//import logoGoogle from '../../../../../public/images/social/google-icon.svg';

import $ from 'jquery';
//import Menu from "../Menu";

library.add( faSync);

const optionToast = {
    hideProgressBar: true,
    autoClose: 3000
};

export default class RegistroCliente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            correo: '',
            password: '',
            pais: '',
            url: props.url,
            facebook: props.facebook,
            google: props.google,
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        let self = this;

        self.setState({
            isLoading: true
        });

        let {nombre, apellido, correo, password, pais,url} = this.state;

        axios.post(url+'/ajax-post-registro', { nombre, apellido, correo, password, pais })
            .then(res => {

                self.setState({
                    nombre: '',
                    apellido: '',
                    correo: '',
                    password: '',
                    pais: '',
                    isLoading: false
                });

                let r = res.data;

                if(r.code === 200){

                    toast.success(r.msj, optionToast);

                }else if(r.code === 500){

                    toast.error(r.msj, optionToast);

                }

            })
            .catch(function (error) {

                if (error.response.status == 422){

                    self.setState({
                        isLoading: false
                    });

                    console.log('errores: ', error.response.data);

                    toast.error(error.response.data, optionToast);
                }

            });
    }

    componentDidMount(){

        $.getJSON('http://ipinfo.io', (data) =>{

            let country = data.country;
            let p = '';

            if(country == 'AR'){
                p = '586f91fff8c715650b244841';
            }else if(country == 'CL'){
                p = '586f9204f8c715650b244842';
            }

            this.setState({
                pais: p
            })
        });


    }


    render() {

        let {nombre, apellido, correo, password, pais, facebook, google,url} = this.state;

        let urlFacebook    = url + '/auth/facebook';
        let urlGoogle      = url + '/auth/google';

        return (
            <div className='box'>
                <ToastContainer position="top-center" />

                <div className="">
                    <img src={'../public'+logoOne} className="img-fluid logo-box-registro" />
                </div>

                <div className="text-center">
                    <h2>Registro</h2>
                </div>

                <form method="POST" onSubmit={this.handleSubmit}>

                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-address-card fa-lg"></i>
                        </div>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={this.handleChange} className="form-control" placeholder="Ingrese su nombre" />
                    </div>

                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-address-card fa-lg"></i>
                        </div>
                        <input type="text" id="apellido" name="apellido" value={apellido} onChange={this.handleChange} className="form-control" placeholder="Ingrese su apellido" />
                    </div>

                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-envelope fa-lg"></i>
                        </div>
                        <input type="text" id="correo" name="correo" value={correo} onChange={this.handleChange} className="form-control" placeholder="Ingrese su correo" />
                    </div>

                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-key fa-lg"></i>
                        </div>
                        <input type="password" id="password" name="password" value={password} onChange={this.handleChange} className="form-control" placeholder="Ingrese su password" />
                    </div>

                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <label className="input-group-text"><i className="fa fa-globe-americas fa-lg"></i></label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="pais" id="inlineRadio1" value="586f91fff8c715650b244841" checked={pais === '586f91fff8c715650b244841'} onChange={this.handleChange} />
                            <label className="form-check-label" htmlFor="inlineRadio1"><img src={'../public'+imgAR} className="img-country" /></label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="pais" id="inlineRadio2" value="586f9204f8c715650b244842" checked={pais === '586f9204f8c715650b244842'} onChange={this.handleChange} />
                            <label className="form-check-label" htmlFor="inlineRadio2"><img src={'../public'+imgCL} className="img-country" /></label>
                        </div>

                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-negro black btn-box-index">
                            { this.state.isLoading ? <FontAwesomeIcon icon="sync" size="lg" spin /> : '' }
                            &nbsp;&nbsp; Registrar
                        </button>
                    </div>
                     <div className="text-center roboto-condensed text-can-login-social">
                        <p style={{'color':'#dadada'}}>o puedes ingresar con</p>
                    </div>

                    <div className="text-center mb-4">

                        <a href={urlFacebook}>
                            <img src={'../public'+logoFacebook} className="img-fluid icon-social mr-3" />
                        </a>

                        <a href={urlGoogle}>
                            <img src={'../public'+logoGoogle} className="img-fluid icon-social mr-3" />
                        </a>
                        <a href={urlFacebook}>
                            <img src={'../public'+logoTwitter} className="img-fluid icon-social mr-3" />
                        </a>

                        <a href={urlGoogle}>
                            <img src={'../public'+logoInstagram} className="img-fluid icon-social" />
                        </a>

                    </div>

                    <div className="text-center">
                        <a href="./">
                            <button type="button" className="btn btn-rojo btn-box-index">Volver</button>
                        </a>
                    </div>

                   


                </form>

            </div>
        );
    }
}

if (document.getElementById('registro-cliente')) {

    const element = document.getElementById('registro-cliente');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<RegistroCliente {...props} />, element);

}
