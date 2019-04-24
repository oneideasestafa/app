import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from "sweetalert2";
import InputMask from 'react-input-mask';
import logoOne from '../../../public/images/logo-one.png';
library.add( faSync);

export default class QuestionEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
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

        this.handleContinuar = this.handleContinuar.bind(this);
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
                        ideventobad: true,
                        eventoUbicacionManual: false
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


    handleContinuar(e){

        let self = this;

        self.setState({
            isLoading: true
        });

        let urlInicio = this.state.url+'/inicio';
        let {evento, idevento, sector, fila, asiento, eventoUbicacionManual, manual, ideventobad} = this.state;

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

            axios.post(this.state.url+'/ajax-continuar', {evento, idevento, sector, fila, asiento, manual, ideventobad, eventoUbicacionManual})
                .then(res => {

                    let r = res.data;

                    if(r.code === 200){

                        self.setState({
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

                        window.location.href = urlInicio;

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

        let evento = this.state.evento;
        let idevento = this.state.idevento;
        let url = this.state.url;

        let {fila, asiento, sector, eventoUbicacionManual} = this.state;

        let urlLogout    = url + '/logout';

        return (

            <div className="abs-center">

                <form method="POST" onSubmit={this.handleContinuar} className="form-loginy">

                    <div className="">
                        <img src={'../public'+logoOne} className="img-fluid logo-box-registro mb-4" />
                    </div>

                    <div className="text-center">
                        <h2>Ubicación</h2>
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
                                    <i className="fas fa-vector-square fa-lg"></i>
                                </div>
                                <InputMask mask="********" maskChar={null} value={sector} name="sector" onChange={this.handleChange} className="form-control" placeholder="Ingrese el sector" />;
                            </div>

                            <div className="input-group mb-4 mt-4">
                                <div className="input-group-prepend">
                                    <i className="fas fa-arrows-alt-h fa-lg"></i>
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
                            &nbsp;&nbsp; Continuar
                        </button>
                    </div>

                    <div className="text-center">
                        <a href={urlLogout}>
                            <button type="button" className="btn btn-rojo btn-box-index">Salir</button>
                        </a>
                    </div>


                </form>

            </div>
        );
    }
}

if (document.getElementById('question-event')) {

    const element = document.getElementById('question-event');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<QuestionEvent {...props} />, element);
}
