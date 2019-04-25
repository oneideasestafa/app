import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import InputMask from 'react-input-mask';
import swal from "sweetalert2";
import imgAR from '../../../../public/images/countrys/ar.png';
import imgCL from '../../../../public/images/countrys/es.png';
import reactMobileDatePicker from 'react-mobile-datepicker';
import iconCivil from '../../../../public/images/EstadoCivil01.png';
import moment from 'moment';


library.add( faSync);


const Datepicker = reactMobileDatePicker;

const dateConfig = {
    'year': {
        format: 'YYYY',
        caption: 'Año',
        step: 1,
    },
    'month': {
        format: 'MM',
        caption: 'Mes',
        step: 1,
    },
    'date': {
        format: 'DD',
        caption: 'Dia',
        step: 1,
    }
};


export default class CambiarDatos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            nombre: '',
            apellido: '',
            sexo: '',
            fechan: '',
            equipo: '',
            civil: '',
            clubs:[],
            estadosciviles: [],
            correo: '',
            cuenta: '',
            pais: '',
            paises: [],
            telefono: '',
            flagPais: '',
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clubs = this.clubs.bind(this);
        this.clubs2 = this.clubs2.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleThemeToggle = this.handleThemeToggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

    }

    handleChange(e) {

        if(e.target.name == 'pais'){

            if(e.target.value == '586f91fff8c715650b244841'){

                this.setState({
                    flagPais: 'AR',
                    telefono: ''
                });

            }else if(e.target.value == '586f9204f8c715650b244842'){

                this.setState({
                    flagPais: 'CL',
                    telefono: ''
                });

            }else if(e.target.value == ''){

                this.setState({
                    flagPais: ''
                });
            }

        }


        this.setState({
            [e.target.name]: e.target.value
        });
    }

    clubs(e) {

        this.setState({
            [e.target.name]: e.target.value,
            'equipo': ''
        });

        let self = this;

        let pais = e.target.value;
        let url = self.state.url;

        axios.post(url + '/ajax-post-clubs-perfil', { pais })
            .then(res => {


                let r = res.data;

                if(r.code === 200){
                    this.setState({
                        'clubs': r.datos
                    });

                }else if(r.code === 500){

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

                    console.log('errores: ', error.response.data);

                }

            });
    }

    clubs2(pais) {

        let self = this;

        let url = self.state.url;

        axios.post(url + '/ajax-post-clubs-perfil', { pais })
            .then(res => {

                let r = res.data;

                if(r.code === 200){
                    this.setState({
                        'clubs': r.datos
                    });

                }else if(r.code === 500){

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

                    console.log('errores: ', error.response.data);

                }

            });
    }


    handleToggle(isOpen) {
        this.setState({ isOpen });
    };

    handleThemeToggle() {
        var theme='android-dark';
        this.setState({ theme, isOpen: true });
    };

    handleSelect(time){
        this.setState({ time, isOpen: false, fechan:time });
    };

    handleSubmit(e) {

        e.preventDefault();

        let self = this;

        self.setState({
            isLoading: true
        });

        let {pais, telefono, fechan, equipo, sexo, civil, nombre, apellido, url} = this.state;

        axios.post(url + '/ajax-post-perfil', { pais, telefono, fechan, equipo, sexo, civil, nombre, apellido})
            .then(res => {

                self.setState({
                    isLoading: false
                });

                let r = res.data;

                if(r.code === 200){

                    swal.fire({
                        title: '<i class="fa fa-check-circle"></i>',
                        text: r.msj,
                        showCancelButton: false,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok',
                    }).then((result) => {
                        if (result.value) {

                            this.getPerfil();

                            window.location.href= url + '/inicio';

                        }
                    });

                }else if(r.code === 500){

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

    getPerfil(){

        var self = this;

        let url = self.state.url;

        axios.post(url + '/ajax-get-perfil', {
        })
            .then(res => {
                if(res){

                    let r = res.data;

                    if(r.code === 200){

                        self.setState({
                            nombre: r.cliente.Nombre,
                            apellido: r.cliente.Apellido,
                            correo: r.cliente.Correo,
                            sexo: r.cliente.Sexo,
                            equipo: r.cliente.Equipo,
                            fechan: moment(r.cliente.FechaNacimiento, 'DD/MM/YYYY').toDate(),
                            civil: r.cliente.EstadoCivil_id,
                            cuenta: r.cliente.TipoCuenta,
                            pais: r.cliente.Pais_id,
                            estadosciviles: r.civiles,
                            telefono: r.cliente.Telefono
                        });

                        this.clubs2(r.cliente.Pais_id);



                    }else if(r.code === 500){

                        console.log(r.msj);

                    }

                }
            })
            .catch(function (error) {

            });

    }

    componentDidMount(){
        this.getPerfil();
    }

    render() {

        let tagClass;
        let {nombre, apellido, correo, cuenta, pais, telefono, sexo, civil, equipo} = this.state;

        if(cuenta == 'ONE'){
            tagClass = 'badge badge-one';
        }else if(cuenta == 'Facebook'){
            tagClass = 'badge badge-facebook';
        }else if(cuenta == 'Google'){
            tagClass = 'badge badge-google';
        }

        return (

            <div className="mt-4">

                <form method="POST" onSubmit={this.handleSubmit} className="form-inside">

                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-address-card fa-lg"></i>
                        </div>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={this.handleChange} className="form-control" />
                    </div>

                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-address-card fa-lg"></i>
                        </div>
                        <input type="text" id="apellido" name="apellido" value={apellido} onChange={this.handleChange} className="form-control" />
                    </div>

                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <i className="fas fa-calendar-alt fa-lg" style={{fontSize: '1.714em'}}></i>
                        </div>
                        <a
                            className="select-btn sm" style={{'border': '1px solid #fff','padding-top': '0.5rem','padding-bottom': '0.5rem','width': '88%','color': '#dadada'}}
                            onClick={this.handleThemeToggle}>
                            {this.state.fechan==''?'Ingrese su Fecha de Nacimiento':this.state.fechan.getDate()+'/'+(this.state.fechan.getMonth() + 1) +'/'+this.state.fechan.getFullYear()}
                        </a>
                        <Datepicker
                            showCaption={true}
                            showHeader={true}
                            headerFormat={'DD/MM/YYYY'}
                            value={this.state.fechan}
                            theme={this.state.theme}
                            isOpen={this.state.isOpen}
                            onSelect={this.handleSelect}
                            onCancel={(e) => this.handleToggle(false)}
                            confirmText="Seleccionar"
                            cancelText="Cancelar"
                            max={new Date()}
                            dateConfig={dateConfig}
                        />
                    </div>

                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-envelope fa-lg"></i>
                        </div>
                        <input type="text" id="correo" name="correo" value={correo} className="form-control"  disabled />
                    </div>

                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <i className="fab fa-ello fa-lg"></i>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" onChange={this.handleChange} type="radio" name="sexo" id="inlineRadio1x" value="m" checked={sexo === 'm'}  />
                            <label className="form-check-label" htmlFor="inlineRadio1x">Masculino</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" onChange={this.handleChange} type="radio" name="sexo" id="inlineRadio2x" value="f" checked={sexo === 'f'}  />
                            <label className="form-check-label" htmlFor="inlineRadio2x">Femenino</label>
                        </div>

                    </div>

                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-user-circle fa-lg"></i>
                        </div>
                        <span className={tagClass}>Cuenta {cuenta}</span>
                    </div>

                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend input-civil">
                            <img src={'../../public'+iconCivil} className="icon-civil" />
                        </div>
                        <select className="form-control" value={civil} name="civil" id="civil" onChange={this.handleChange}>
                            <option  key="0" value=''>Ingrese Estado Civil (Opcional)</option>
                            {this.state.estadosciviles.map(function(item){
                                return <option key={item._id} value={item._id}>{item.Nombre}</option>
                            })}
                        </select>
                    </div>

                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <i className="fas fa-phone fa-lg"></i>
                        </div>
                        <input type="number" min="0" max="99999999999" maxLength="11" id="telefono" name="telefono" value={telefono} onChange={this.handleChange} className="form-control" placeholder="Ingrese su telefono (Opcional)" />
                    </div>


                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <label className="input-group-text"><i className="fa fa-globe-americas fa-lg"></i></label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" onChange={this.clubs} type="radio" name="pais" id="inlineRadio1" value="5caf334dff6eff0ae30e450b" checked={pais === '5caf334dff6eff0ae30e450b'}  />
                            <label className="form-check-label" htmlFor="inlineRadio1"><img src={'../../public'+imgAR} className="img-country" /></label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" onChange={this.clubs} type="radio" name="pais" id="inlineRadio2" value="5caf37adff6eff0ae30e450d" checked={pais === '5caf37adff6eff0ae30e450d'}  />
                            <label className="form-check-label" htmlFor="inlineRadio2"><img src={'../../public'+imgCL} className="img-country" /></label>
                        </div>

                    </div>

                    <div className="input-group mb-4 mt-4">
                        <div className="input-group-prepend">
                            <i className="fas fa-futbol fa-lg"></i>
                        </div>

                        <select className="form-control" id="inputGroupSelect02" value={equipo} name="equipo" id="equipo" onChange={this.handleChange}>
                            <option  key="-1" value=''>Equipos de futbol</option>
                            { this.state.clubs.length > 0 ?
                                <option  key="0" value='1000'>Ninguno</option>
                                : ''
                            }
                            {this.state.clubs.map(function(item){
                                return <option  key={item.id} value={item.id}>{item.Nombre}</option>
                            })}
                        </select>
                    </div>

                    { this.state.equipo!='' ?
                        <div className="text-center" style={{'margin-bottom': '15px'}}>
                            <img src={'../../public/images/clubs/'+this.state.equipo+'.png'} style={{'height': '4rem'}}/>
                        </div>
                        :''
                    }


                    <div className="text-center">
                        <button type="submit" className="btn btn-negro black btn-box-index">
                            { this.state.isLoading ? <FontAwesomeIcon icon="sync" size="lg" spin /> : '' }
                            &nbsp;&nbsp; Actualizar
                        </button>
                    </div>

                </form>

            </div>
        );
    }
}

if (document.getElementById('cambiar-datos-perfil')) {

    const element = document.getElementById('cambiar-datos-perfil');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<CambiarDatos {...props} />, element);

}
