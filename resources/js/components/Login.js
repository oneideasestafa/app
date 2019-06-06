import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from "sweetalert2";
import logoOne from '../../../public/images/logo-one.png';
import logoFacebook from '../../../public/images/social/facebook-icon.svg';
import logoGoogle from '../../../public/images/social/google-icon.svg';
import logoTwitter from '../../../public/images/social/twitter-icon.svg';
import logoInstagram from '../../../public/images/social/instagram-icon.svg';
library.add( faSync);

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            correo: '',
            pass: '',
            isLoading: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        });

    }

    handleLogin(e){

        let self = this;

        self.setState({
            isLoading: true
        });

        let urlInicio = this.state.url+'/question-event';
        let {correo, pass} = this.state;

        e.preventDefault();

        axios.post(this.state.url+'/ajax-post-login', {correo, pass})
            .then(res => {

                let r = res.data;

                if(r.code === 200){

                    self.setState({
                        correo: '',
                        pass: '',
                        isLoading: false
                    });

                    if(r.tipo == 'one'){
                        //localStorage.setItem('cache','true');
                        window.location.href = urlInicio;
                    }

                }else if(r.code == undefined){

                    //window.location.href = window.app.url+'/logisticas';


                }else if(r.code === 600){

                    self.setState({
                        isLoading: false
                    });

                    swal({
                        title: '<i class="fas fa-exclamation-circle"></i>',
                        text: r.msj,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok'
                    });

                }

            })
            .catch(function (error) {

                if (error.response.status == 422){

                    self.setState({
                        isLoading: false
                    });

                    swal({
                        title: '<i class="fas fa-exclamation-circle"></i>',
                        text: error.response.data,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok'
                    });

                }

            });

    }

    render() {

        let correo = this.state.correo;
        let pass = this.state.pass;
        let url = this.state.url;

        let urlRecuperar    = url + '/recovery-password';
        let urlIndex        = url + '/';

        let urlFacebook    = url + '/auth/facebook';
        let urlGoogle      = url + '/auth/google';

        let urlTwitter    = url + '/auth/twitter';
        let urlInstagram      = url + '/auth/instagram';

        return (

            <div className="abs-center roboto-condensed">

                <form method="POST" onSubmit={this.handleLogin} className="form-login">

                    <div className="">
                        <img src={logoOne} className="img-fluid logo-box-index" />
                    </div>

                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-envelope fa-lg"></i>
                        </div>
                        <input type="text" id="correo" name="correo" value={correo} onChange={this.handleChange} className="form-control" placeholder="Ingrese su correo" />
                    </div>

                    <div className="input-group mb-4 mt-3">
                        <div className="input-group-prepend">
                            <i className="fa fa-key fa-lg"></i>
                        </div>
                        <input type="password" id="pass" name="pass" value={pass} onChange={this.handleChange} className="form-control" placeholder="Ingrese su contraseña" />
                    </div>


                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-negro btn-box-index">
                            { this.state.isLoading ? <FontAwesomeIcon icon="sync" size="lg" spin /> : '' }
                            &nbsp;&nbsp; Ingresar
                        </button>
                    </div>

                     <div className="text-center roboto-condensed text-can-login-social">
                        <p style={{'color':'rgb(146, 143, 143)'}}>o puedes ingresar con</p>
                    </div>

                   <div className="text-center mb-4">

                        <a href={urlFacebook}>
                            <img src={logoFacebook} className="img-fluid icon-social mr-3" />
                        </a>

                        <a href={urlGoogle}>
                            <img src={logoGoogle} className="img-fluid icon-social mr-3" />
                        </a>
                        <a href={urlTwitter}>
                            <img src={logoTwitter} className="img-fluid icon-social mr-3" />
                        </a>

                        <a href={urlInstagram}>
                            <img src={logoInstagram} className="img-fluid icon-social" />
                        </a>

                    </div>

                    <div className="text-center">
                        <a href={urlIndex}>
                            <button type="button" className="btn btn-rojo btn-box-index">Volver</button>
                        </a>
                    </div>

                    <p className="mt-3 text-center link-recovery-password roboto-condensed">
                        <a href={urlRecuperar}>¿Has olvidado tu contraseña?</a>
                    </p>

                </form>
            </div>
        );
    }
}

if (document.getElementById('login')) {

    const element = document.getElementById('login');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Login {...props} />, element);
}


/*
 
*/