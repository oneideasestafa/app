import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ProfileImage from './../atoms/ProfileImage';
import axios from 'axios';
import swal from "sweetalert2";
import logoOne from '../../../../public/images/logo-one.png';
import logoFacebook from '../../../../public/images/social/facebook-icon.svg';
import logoGoogle from '../../../../public/images/social/google-icon.svg';
import logoTwitter from '../../../../public/images/social/twitter-icon.svg';
import logoInstagram from '../../../../public/images/social/instagram-icon.svg';
import imgAR from '../../../../public/images/countrys/ar.png';
import imgCL from '../../../../public/images/countrys/es.png';
import Datepicker from 'react-mobile-datepicker';
import iconCivil from '../../../../public/images/EstadoCivil01.png';

/**Importando estilos del componente */
import "./../../../css/pages/Login.css"

library.add(faSync);

// formato JSON de las fechas
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

export default class RegistroCliente extends React.Component {
  constructor() {
    super();
    
    this.state = {
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      pais: '5caf334dff6eff0ae30e450b',
      sexo:'m',
      equipo:'',
      clubs:[],
      estadosciviles:  [],
      civil: '',
      time: new Date(),
      isOpen: false,
      fileName: 'Seleccione imagen',
      theme: 'default',
      telefono:'',
      alert: {
        show: false,
        title: '',
        text: '',
        type: ''
      },
      foto: '',
      isLoading: false,
      isImageLoaded: false,
    };

    this.clubs = this.clubs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleThemeToggle = this.handleThemeToggle.bind(this);
    this.chooseImageSource = this.chooseImageSource.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleSuccessfulSignup = this.handleSuccessfulSignup.bind(this);
    this.handleErrorOnUpdate = this.handleErrorOnUpdate.bind(this);
  }

  /**
   * Esta funcion se ejecuta al renderi ar por primera ve
   * y tre por ruta api, los estados civiles
   */
  componentWillMount() {
      axios.get("/api/usuarios/estado-civil")
      .then(res => {        
        this.setState({
          estadosciviles : res.data.estado_civil, 
          isLoading:false
        }, () => this.clubs({
          target: {
            name: 'pais',
            value: this.state.pais,
          }
        }))
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  chooseImageSource (e) {
    Cordova.exec(buttonIndex => {
      if (buttonIndex === 0)
        return;
      
      const source = buttonIndex === 2 ? (
        navigator.camera.PictureSourceType.PHOTOLIBRARY
      ) : (
        navigator.camera.PictureSourceType.CAMERA
      );

      navigator.camera.getPicture(imageData => {
        window.resolveLocalFileSystemURL(imageData, fileEntry => {
          console.log(fileEntry.toInternalURL());
          this.setState({
            isImageLoaded: true,
            foto: fileEntry.toInternalURL(),
          })
        }, console.log);
      }, console.log, {
        sourceType: source,
        allowEdit: true,
        madiaType: navigator.camera.MediaType.PICTURE,
        saveToPhotoAlbum: true,
      });
    }, null, 'Notification', 'confirm', [
      '¿De donde desea tomar la imagen?',
      'Buscar Foto',
      ['Tomar Foto', 'Galería']
    ])
  }

  /**
   * Esta funcion se dispara al modificar cada input del form
   * @param {Evento} e 
   */
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  clubs(e) {
    this.setState({
      [e.target.name]: e.target.value,
      'equipo': ''
    });

    const pais = e.target.value;

    axios.post('api/usuarios/clubs-perfil', { pais })
    .then(res => {
      let r = res.data;

      if (r.code === 200) {
        this.setState({
          'clubs': r.datos
        });  

      }else if(r.code === 500) {
        swal({
          title: '<i class="fas fa-exclamation-circle"></i>',
          text: r.msj,
          confirmButtonColor: '#343a40',
          confirmButtonText: 'Ok'
        });
      }
    })
    .catch(error => {
      if (error.response.status == 422){
        this.setState({
          isLoading: false
        });
        
        console.log('errores: ', error.response.data);
      }
    });
  }

  /**
   * Esta funcion cambia el state para denotar que el modal de fehca esta open
   * @param {*} isOpen 
   */
  handleToggle(isOpen) {
    this.setState({ isOpen });
  };

  /**
   * Esta funcion abre el modal de fecha
   */
  handleThemeToggle() {
    this.setState({ isOpen: true });
  };

  /**
   * Esta funcion se emite al elegir una fecha
   * y cambia el state de la variable
   * @param {fecha} time 
   */
  handleSelect(time){
    this.setState({ time, isOpen: false, edad:time });
  };

  /**
   * Esta funcion se encarga de enviar la peticion API
   * para actuali ar el perfil del cliente
   * @param {evento} e 
   */
  handleSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    const birthdate = this.state.time;
    const birthdateString = `${birthdate.getFullYear()}/${birthdate.getMonth() + 1}/${birthdate.getDate()}`;

    console.log(this.state);
    console.log(typeof this.state.equipo, this.state.equipo);
    console.log(this.state.equipo ? parseInt(this.state.equipo) : false);

    let data = {
      countryId: this.state.pais,
      email: this.state.correo,
      password: this.state.password,
      gender: this.state.sexo,
      phone: this.state.telefono,
      birthdate: birthdateString,
      teamId: this.state.equipo ? parseInt(this.state.equipo) : null,
      maritalStatus: this.state.civil,
      name: this.state.nombre,
      avatarURL: this.state.foto,
      lastname: this.state.apellido,
    };

    if (this.state.isImageLoaded) {
      const { foto } = this.state;
      /**
       * The cordova sends the information as it was a normal form, not a JSON,
       * that means the values that are null in frontend, are "null" in backend,
       * taking those as non-null values  
       */
      Object.keys(data).forEach(key => {
        if (data[key] === null) 
          data[key] = '';
      });

      /**
       * I use this syntax because of a bug where the
       * FileTransfer constructor is undefined
       */
      Cordova.exec(this.handleSuccessfulUpdate, this.handleErrorOnUpdate,
        'FileTransfer',
        'upload',
        [
          foto, // filePath
          `${process.env.MIX_APP_URL}/api/usuarios/registro`, // Server
          'profilePicture', // fileKey
          foto.substr(foto.lastIndexOf('/') + 1), // fileName
          '', // mimeType
          data, // params
          false, // trustAllHost
          false, // chunckedMode
          { 
            Authorization: localStorage.getItem('api_token'),
            'X-Requested-With': 'XMLHttpRequest'
          }, // headers
          this.transferId, // _id
          'POST', // httpMethod
        ]
      );
    
    } else {      
      axios.post('/api/usuarios/registro', data, {
        headers: {
          Authorization: localStorage.getItem('api_token')
        }
      })
      .then(res => this.handleSuccessfulSignup({ 
        response: JSON.stringify(res.data),
      }))
      .catch(this.handleErrorOnUpdate)
      .then(() => this.setState({ isLoading: false }))
    }
  }

  handleConfirmation () {
    if (this.state.type === 'success') {
      this.setState(alert => ({
        alert: {
          ...alert,
          show: false,
        }
      }), () => this.props.history.replace('/dashboard'));
    
    } else {
      this.setState(alert => ({
        alert: {
          ...alert,
          show: false,
        }
      }));
    }
  }

  handleSuccessfulSignup (res) {
    console.log('res', res);

    if (res.response) {
      this.setState({
        isLoading: false,
      }, () => this.props.history.replace('/dashboard'));
    }
  }

  handleErrorOnUpdate (err) {
    console.log(err);
    this.setState(state => ({
      isLoading: false,
      alert: {
        ...state.alert,
        show: true,
        type: 'error',
        title: '',
        text: 'Por favor, revise el formulario e intentelo nuevamente'
      }
    }));
  }

  render() {
    const { 
      nombre, 
      apellido, 
      correo, 
      password, 
      pais, 
      civil, 
      foto, 
      sexo, 
      equipo, 
      telefono, 
      tipofoto, 
      time,
      alert
    } = this.state;

    return (
      <div className="p-4">
        <div className="text-center my-2">
          <ProfileImage 
            size={150} 
            image={foto === '' ? null : foto}
            removable={true}
            onClick={this.chooseImageSource}
            onRemove={e => this.setState({ foto: '', isImageLoaded: false })}
          />
        </div>
        <form method="POST" onSubmit={this.handleSubmit}>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <i className="fa fa-address-card fa-lg"></i>
            </div>
            <input 
              type="text" 
              name="nombre" 
              value={nombre} 
              onChange={this.handleChange} 
              className="form-control" 
              placeholder="Ingrese su nombre" 
              required
            />
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <i className="fa fa-address-card fa-lg"></i>
            </div>
            <input 
              type="text"
              name="apellido" 
              value={apellido} 
              onChange={this.handleChange} 
              className="form-control" 
              placeholder="Ingrese su apellido" 
            />
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <i className="fas fa-calendar-alt fa-lg icono-calendario" ></i>
            </div>
            <input 
              readOnly
              id="fecha" 
              type="text" 
              name="fecha"
              style={{ borderStyle: 'solid' }}
              onClick={this.handleThemeToggle}
              value={time.getDate()+'/'+(time.getMonth() + 1) +'/'+time.getFullYear()} 
              className="form-control"
            /> 
            <Datepicker
              showCaption={true}
              showHeader={true}
              headerFormat="DD/MM/YYYY"
              value={this.state.time}
              theme="dark"
              isOpen={this.state.isOpen}
              onSelect={this.handleSelect}
              onCancel={(e) => this.handleToggle(false)} 
              confirmText="Seleccionar"
              cancelText="Cancelar"
              max={new Date()}
              dateConfig={dateConfig}
            />
          </div>
          <div className="input-group mb-4 mt-4 contenedor-genero" >
            <div className="input-group-prepend">
              <i className="fab fa-ello fa-lg"></i>
            </div>
            <div className="form-check form-check-inline">
              <input 
                value="m" 
                name="sexo"
                type="radio" 
                id="gender-m"
                checked={sexo === 'm'}
                className="form-check-input" 
                onChange={this.handleChange} 
              />
              <label className="form-check-label" htmlFor="gender-m">Masculino</label>
            </div>
            <div className="form-check form-check-inline">
              <input 
                value="f" 
                name="sexo" 
                type="radio"
                id="gender-f"
                checked={sexo === 'f'}
                className="form-check-input" 
                onChange={this.handleChange} 
              />
              <label className="form-check-label" htmlFor="gender-f">Femenino</label>
            </div>
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <i className="fa fa-envelope fa-lg"></i>
            </div>
            <input
              type="email"
              name="correo"
              value={correo}
              className="form-control"
              onChange={this.handleChange}
              placeholder="Ingrese su correo"
              required
            />
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <i className="fas fa-phone fa-lg"></i>
            </div>
            <input 
              type="number" 
              maxLength="11" 
              name="telefono" 
              min="0" 
              max="99999999999" 
              className="form-control" 
              value={telefono} 
              onChange={this.handleChange} 
              placeholder="Ingrese su telefono (Opcional)"
            />
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend input-civil">
              <img src={iconCivil} className="icon-civil" />
            </div>
            <select className="form-control" value={civil} name="civil" id="civil" onChange={this.handleChange}>
              <option value=''>Ingrese Estado Civil (Opcional)</option>
              {this.state.estadosciviles.map(function(item){
                return <option  key={item._id} value={item._id}>{item.Nombre}</option>
              })}
            </select>
          </div>
          <div className="input-group mb-4 mt-4">
              <div className="input-group-prepend mr-3">
                  <i className="fa fa-key fa-lg"></i>
              </div>
              <input type="password" id="password" name="password" value={password} onChange={this.handleChange} className="form-control" placeholder="Ingrese su password" />
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <label className="input-group-text"><i className="fa fa-globe-americas fa-lg"></i></label>
            </div>
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                onChange={this.clubs} 
                type="radio" 
                name="pais" 
                id="inlineRadio1" 
                value="5caf334dff6eff0ae30e450b" 
                checked={pais === '5caf334dff6eff0ae30e450b'}
              />
              <label className="form-check-label" htmlFor="inlineRadio1"><img src={imgAR} className="img-country" /></label>
            </div>
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                onChange={this.clubs} 
                type="radio" 
                name="pais" 
                id="inlineRadio2" 
                value="5caf37adff6eff0ae30e450d" 
                checked={pais === '5caf37adff6eff0ae30e450d'}
              />
              <label className="form-check-label" htmlFor="inlineRadio2"><img src={imgCL} className="img-country" /></label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label" htmlFor="inlineRadio2">(Opcional)</label>
            </div>
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <i className="fas fa-futbol fa-lg"></i>
            </div>
            <select className="form-control" id="inputGroupSelect02" value={equipo} name="equipo" id="equipo" onChange={this.handleChange}>
              <option  key="-1" value=''>Equipos de futbol (Opcional)</option>
              {this.state.clubs.length > 0 &&
                  <option  key="0" value='1000'>Ninguno</option>
              }
              {this.state.clubs.map(function(item){
                  return <option  key={item.id} value={item.id}>{item.Nombre}</option>
              })}
            </select>
          </div>
          {this.state.equipo &&
            <div className="text-center input-equipo">
              <img src={'/images/clubs/'+this.state.equipo+'.png'} className="imagen-equipo"/>
            </div>
          }
          <div className="text-center">
            <button type="submit" className="btn btn-negro black btn-box-index">
              { this.state.isLoading ? <FontAwesomeIcon icon="sync" size="lg" spin /> : '' }
              &nbsp;&nbsp; Registrar
            </button>
          </div>
          <div className="text-center">
            <Link to="/">
              <button type="button" className="btn btn-rojo btn-box-index">
                Volver
              </button>
            </Link>
          </div>
        </form>
      </div>  
    );
  }
}



