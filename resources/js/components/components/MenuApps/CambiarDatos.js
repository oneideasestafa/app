import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from "sweetalert2";
import imgAR from '../../../../../public/images/countrys/ar.png';
import imgCL from '../../../../../public/images/countrys/es.png';
import reactMobileDatePicker from 'react-mobile-datepicker';
import iconCivil from '../../../../../public/images/EstadoCivil01.png';
import moment from 'moment';

/** Importando estilos css del componente */
import "../css/CambiarDatos.css"

library.add( faSync);


const Datepicker = reactMobileDatePicker;

/**
 * Creando el json para trabajar con las fechas
 */
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
            idUsuario: props.usuarioid,
            nombre: '',
            apellido: '',
            sexo: '',
            FechaNacimiento: '',
            equipo: '',
            civil: '',
            clubs:[],
            estadosciviles: [],
            correo: '',
            cuenta: '',
            pais: '',
            paises: [],
            telefono: '',
            fileName: 'Seleccione imagen',
            tipofoto: '',
            foto: '',
            fotonew:'',
            flagPais: '',
            isLoading: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clubs = this.clubs.bind(this);
        this.clubs2 = this.clubs2.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleThemeToggle = this.handleThemeToggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

    }

    /**
     * Componente que se carga al renderi ar por primera ve
     * aqui traigo la informacion del usuario logeado
     */
    componentWillMount() {
        axios
            .get("api/clientes/id/" + this.state.idUsuario)
            .then(res => {
                let r = res.data;
                    if(r.code === 200){
                        this.setState({
                            nombre: this.verificarNull(r.cliente.Nombre),
                            apellido: this.verificarNull(r.cliente.Apellido),
                            correo: this.verificarNull(r.cliente.Correo),
                            sexo: this.verificarNull(r.cliente.Sexo),
                            equipo: this.verificarNull(r.cliente.Equipo),
                            fechaNacimiento: this.verificarNull(moment(r.cliente.FechaNacimiento, 'DD/MM/YYYY').toDate()),
                            civil: this.verificarNull(r.cliente.EstadoCivil_id),
                            cuenta: this.verificarNull(r.cliente.TipoCuenta),
                            pais: this.verificarNull(r.cliente.Pais_id),
                            estadosciviles: this.verificarNull(r.civiles),
                            telefono: this.verificarNull(r.cliente.Telefono),
                            foto: this.verificarNull(r.cliente.Foto),
                            isLoading: false
                        });
        
                        let hoy = new Date();
              
                        if(r.cliente.Pais_id){
                            this.clubs2(r.cliente.Pais_id);
                        }

                    }else if(r.code === 500){

                        console.log(r.msj);

                    }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    /**
     * Esta funcion recibe una cadena y verifica que no sea null
     * esto con el objetivo de que podamos trabajar con ella en el componente
     * como " " y no como null
     * @param {string} cadena 
     */
    verificarNull(cadena){
        if(cadena == null){
            return "";
        }
        return cadena;
    }

    /**
     * Este evento se ejecuta al cambiar la foto del usuario
     * estoy con el objetivo de guardar la url de la misma 
     * para posteriormente ser guardada en bd
     * @param {evento} e 
     */
    handleChange(e) {

        if(e.target.name == 'fileFoto'){

            if(e.target.files.length > 0) {

                console.log(e.target.files[0]);

                let reader = new FileReader();

                reader.onload = (e) => {
                    this.setState({
                        fotonew: e.target.result
                    })
                };

                reader.readAsDataURL(e.target.files[0]);

                this.setState({ fileName: e.target.files[0].name });
            }

        }else{

            this.setState({
                [e.target.name]: e.target.value
            });

        }



    }

    /**
     * esta funcioncion se ejecuta al cargar por los componentes
     * trae como resultado la lista de clubs de espa;a/argentina
     * @param {evento} e 
     */
    clubs(e) {

        this.setState({
            [e.target.name]: e.target.value,
            'equipo': ''
        });

        let self = this;

        let pais = e.target.value;

        axios.post('api/clientes/clubs-perfil', { pais })
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

    /**
     * esta funcioncion se ejecuta al cargar por los componentes
     * trae como resultado la lista de clubs de espa;a/argentina
     * @param {evento} pais 
     */
    clubs2(pais) {

        let self = this;

        axios.post('api/clientes/clubs-perfil', { pais })
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

    /**
     * Esta funcion se activa al dar click fuera del modal de fecha
     * @param {*} isOpen 
     */
    handleToggle(isOpen) {
        this.setState({ isOpen });
    };

    /**
     * Esta funcion abre el modal de fechas al dar click en fecha
     */
    handleThemeToggle() {
        var theme='android-dark';
        this.setState({ theme, isOpen: true });
    };

    /**
     * Esta funcion recibe la fecha al seleccionar en el modal de fechas
     * @param {fecha} time 
     */
    handleSelect(time){
        this.setState({ time, isOpen: false, FechaNacimiento:time });
    };

    /**
     * Esta funcion se encarga de enviar la peticion API
     * para actuali ar el perfil del cliente
     * @param {evento} e 
     */
    handleSubmit(e) {

        e.preventDefault();

        let self = this;

        self.setState({
            isLoading: true
        });

        let {idUsuario,pais, telefono,  fechaNacimiento, equipo, sexo, civil, nombre, apellido, url, fotonew, tipofoto} = this.state;
        console.log("abajo se envia un axios.post de api/clientes/editar/perfil/");
        axios.post('api/clientes/editar/perfil/', { idUsuario,pais, telefono,  fechaNacimiento, equipo, sexo, civil, nombre, apellido, fotonew, tipofoto})
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
                            this.componentWillMount();

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


    render() {

        let tagClass;
        let {nombre, apellido, correo, cuenta, pais, telefono, sexo, civil, equipo, foto, fotonew, tipofoto} = this.state;
        let hoy = new Date();

        if(cuenta == 'ONE'){
            tagClass = 'badge badge-one';
        }else if(cuenta == 'Facebook'){
            tagClass = 'badge badge-facebook';
        }else if(cuenta == 'Google'){
            tagClass = 'badge badge-google';
        }
        

        if(this.state.isLoading){
            return(
                <div className="abs-center">
                    <FontAwesomeIcon icon="sync" size="lg" spin />
                </div>
            );
        }else {
            return (
            <div className="mt-5">

                <form method="POST" onSubmit={this.handleSubmit} className="form-inside pr-3 pl-3 pt-4">

                    {foto != '' ?

                        <img src={foto} className="rounded mx-auto d-block mb-5 profile-picture"/>

                        : ''

                    }


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
                            <i className="fas fa-calendar-alt fa-lg icono-fecha"></i>
                        </div>
                        <a
                            className="boton-fecha select-btn sm" 
                            onClick={this.handleThemeToggle}>
                            {this.state.fechaNacimiento==''?'Ingrese su Fecha de Nacimiento':this.state.fechaNacimiento.getDate()+'/'+(this.state.fechaNacimiento.getMonth() + 1) +'/'+this.state.fechaNacimiento.getFullYear()}
                        </a>
                        <Datepicker
                            showCaption={true}
                            showHeader={true}
                            headerFormat={'DD/MM/YYYY'}
                            value={this.state.fechaNacimiento}
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
                            <img src={iconCivil} className="icon-civil" />
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
                            <i className="fas fa-portrait fa-lg"></i>
                        </div>

                        <select className="form-control" id="inputGroupSelect02" value={tipofoto} name="tipofoto" onChange={this.handleChange}>
                            <option value=''>Seleccione Tipo de foto (Opcional)</option>
                            <option value='upload'>Subir Imagen</option>
                            <option value='camera'>Tomar Foto</option>
                        </select>
                    </div>

                    {tipofoto == 'upload' ?


                        <div className="input-group mb-4 mt-4">
                            <div className="input-group-prepend mr-3">
                                <i className="far fa-image fa-lg"></i>
                            </div>

                            <div className="custom-file">
                                <input type="file" name="fileFoto" onChange={(e) => this.handleChange(e)}
                                       className="custom-file-input" id="customFileLang"/>
                                <label className="custom-file-label"
                                       htmlFor="customFileLang">{this.state.fileName}</label>
                            </div>

                        </div>

                        : ''

                    }

                    {tipofoto == 'camera' ?


                        <div className="input-group mb-4 mt-4">
                            <div className="input-group-prepend mr-3">
                                <i className="fas fa-camera fa-lg"></i>
                            </div>
                            <span className="badge badge-warning">En construccion</span>

                        </div>

                        : ''

                    }

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
                            <label className="form-check-label" htmlFor="inlineRadio1"><img src={imgAR} className="img-country" /></label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" onChange={this.clubs} type="radio" name="pais" id="inlineRadio2" value="5caf37adff6eff0ae30e450d" checked={pais === '5caf37adff6eff0ae30e450d'}  />
                            <label className="form-check-label" htmlFor="inlineRadio2"><img src={imgCL} className="img-country" /></label>
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
                        <div className="text-center contenedor-imagen-equipo" >
                            <img className="imagen-equipo" src={'/images/clubs/'+this.state.equipo+'.png'} />
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
}


