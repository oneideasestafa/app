import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from "sweetalert2";
import InputMask from 'react-input-mask';
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
            eventos: JSON.parse(props.eventos),
            evento: '',
            idevento: '',
            sector: '',
            fila: '',
            asiento: '',
            eventoUbicacionManual: false,
            manual: '',
            ideventobad: false,
            isLoading: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUbicacion = this.handleUbicacion.bind(this);

    }

    handleChange(e) {

        let name = e.target.name;

        if(name == 'evento'){

            if(e.target.value == ''){

                this.setState({
                    [e.target.name]: e.target.value,
                    manual: false,
                    eventoUbicacionManual: false,
                    idevento: ''

                });

            }else if(e.target.value == 'idevento'){

                this.setState({
                    [e.target.name]: e.target.value,
                    manual: false,
                    eventoUbicacionManual: false
                });

            }else{

                this.handleUbicacion(e.target.value, null);

                this.setState({
                    [e.target.name]: e.target.value,
                    idevento: ''
                });

            }


        }else if(name == 'idevento'){

            let data = e.target.value.toUpperCase();

            if(data.length == 6){
                this.handleUbicacion(null, data);

                this.setState({
                    [e.target.name]: data
                });

            }else{

                this.setState({
                    [e.target.name]: data,
                    ideventobad: true
                });
            }

        }else if(name == 'fila' || name == 'sector' || name == 'asiento'){

            this.setState({
                [e.target.name]: e.target.value.toUpperCase()
            });

        }else{

            this.setState({
                [e.target.name]: e.target.value
            });

        }

    }

    handleUbicacion(event, idevent){

        let self = this;

        let evento = event;
        let idevento = idevent;

        axios.post(this.state.url+'/ajax-post-check-ubicacion-evento', {evento, idevento})
            .then(res => {

                let r = res.data;

                if(r.code === 200){

                    if(r.ubicacion === false){

                        self.setState({
                            eventoUbicacionManual: false,
                            manual: false,
                            ideventobad: false
                        });

                    }else{
                        self.setState({
                            eventoUbicacionManual: true,
                            manual: true,
                            ideventobad: false
                        });

                    }

                }else if(r.code === 600){

                    swal({
                        title: '<i class="fas fa-exclamation-circle"></i>',
                        text: r.msj,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok'
                    });

                }else if(r.code === 700){

                    self.setState({
                        ideventobad: true
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

                console.log(error);

            });
    }


    handleLogin(e){

        let self = this;

        self.setState({
            isLoading: true
        });

        let urlInicio = this.state.url+'/inicio';
        let {correo, pass, evento, idevento, sector, fila, asiento, eventoUbicacionManual, manual, ideventobad} = this.state;

        e.preventDefault();

        if(ideventobad == true){

            self.setState({
                isLoading: false
            });

            swal({
                title: '<i class="fas fa-exclamation-circle"></i>',
                text: 'El codigo del evento es invalido',
                confirmButtonColor: '#343a40',
                confirmButtonText: 'Ok'
            });

        }else{

            axios.post(this.state.url+'/ajax-post-login', {correo, pass, evento, idevento, sector, fila, asiento, manual, ideventobad, eventoUbicacionManual})
                .then(res => {

                    let r = res.data;

                    if(r.code === 200){

                        self.setState({
                            correo: '',
                            pass: '',
                            evento: '',
                            idevento: '',
                            sector: '',
                            fila: '',
                            asiento: '',
                            eventoUbicacionManual: false,
                            manual: '',
                            ideventobad: false,
                            isLoading: false
                        });

                        if(r.tipo == 'one'){
                            localStorage.setItem('cache','true');
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

    }

    render() {

        let correo = this.state.correo;
        let pass = this.state.pass;
        let evento = this.state.evento;
        let idevento = this.state.idevento;
        let url = this.state.url;

        let {fila, asiento, sector, eventoUbicacionManual} = this.state;

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
                        <img src={'../public'+logoOne} className="img-fluid logo-box-index" />
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


                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <i className="fas fa-calendar-week fa-lg"></i>
                        </div>

                        <select className="form-control" id="inputGroupSelect02" value={evento} name="evento" id="evento" onChange={this.handleChange}>
                            <option  key="0" value=''>Seleccione Evento</option>
                            <option  key="100" value='idevento'>ID Evento</option>
                            {
                                this.state.eventos.map(function(item){
                                    return <option  key={item._id} value={item._id}>{item.Nombre}</option>
                                })
                            }
                        </select>
                    </div>

                    { evento == 'idevento' ?

                        <div className="input-group mb-4 mt-4">
                            <div className="input-group-prepend">
                                <i className="fa fa-lock fa-lg"></i>
                            </div>

                            <InputMask mask="******" maskChar={null} value={idevento} name="idevento" onChange={this.handleChange} className="form-control" placeholder="Ingrese el codigo del evento" />;

                        </div>

                        : ''
                    }

                    { eventoUbicacionManual == true ?

                        <div>

                            <div className="input-group mb-4 mt-4">
                                <div className="input-group-prepend">
                                    <i className="fa fa-clipboard fa-lg"></i>
                                </div>
                                <InputMask mask="********" maskChar={null} value={sector} name="sector" onChange={this.handleChange} className="form-control" placeholder="Ingrese el sector" />;
                            </div>

                            <div className="input-group mb-4 mt-4">
                                <div className="input-group-prepend">
                                    <i className="fa fa-ellipsis-h fa-lg"></i>
                                </div>
                                <InputMask mask="********" maskChar={null} value={fila} name="fila" onChange={this.handleChange} className="form-control" placeholder="Ingrese la fila" />;
                            </div>

                            <div className="input-group mb-4 mt-4">
                                <div className="input-group-prepend">
                                    <i className="fa fa-chair fa-lg"></i>
                                </div>
                                <InputMask mask="********" maskChar={null} value={asiento} name="asiento" onChange={this.handleChange} className="form-control" placeholder="Ingrese el asiento" />;
                            </div>

                        </div>

                        : ''
                    }



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

                        <a href="#">
                            <img src={'../public'+logoFacebook} className="img-fluid icon-social mr-3" />
                        </a>

                        <a href="#">
                            <img src={'../public'+logoGoogle} className="img-fluid icon-social mr-3" />
                        </a>
                        <a href="#">
                            <img src={'../public'+logoTwitter} className="img-fluid icon-social mr-3" />
                        </a>

                        <a href="#">
                            <img src={'../public'+logoInstagram} className="img-fluid icon-social" />
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
