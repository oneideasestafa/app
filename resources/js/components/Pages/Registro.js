import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import ProfileImage from './../atoms/ProfileImage';
import axios from 'axios';
import swal from "sweetalert2";
import imgAR from '../../../../public/images/countrys/ar.png';
import imgCL from '../../../../public/images/countrys/es.png';
import iconCivil from '../../../../public/images/EstadoCivil01.png';
import { appStartedLoading, appFinishLoading } from './../../redux/actions/auth';
import { connect } from 'react-redux';

/**Importando estilos del componente */
import "./../../../css/pages/Login.css"

class RegistroCliente extends React.Component {
  constructor() {
    super();
    
    this.state = {
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      pais: '',
      sexo:'m',
      equipo:'',
      clubs:[],
      estadosciviles:  [],
      civil: '',
      time: new Date(),
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
      errors: null,
    };

    this.clubs = this.clubs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
    this.chooseImageSource = this.chooseImageSource.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleSuccessfulSignup = this.handleSuccessfulSignup.bind(this);
    this.handleErrorOnSignup = this.handleErrorOnSignup.bind(this);
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
        })
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
   * Esta funcion abre el modal de fecha
   */
  handleDatePicker () {
    datePicker.show({
      mode: 'date',
      androidTheme: datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK,
      date: this.state.time,
      maxDate: new Date(),
    }, date => this.setState({
      time: date,
    }), error => console.log('error picking', error));
  };

  /**
   * Esta funcion se encarga de enviar la peticion API
   * para actuali ar el perfil del cliente
   * @param {evento} e 
   */
  handleSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true, errors: null });

    const birthdate = this.state.time;
    const birthdateString = `${birthdate.getFullYear()}/${birthdate.getMonth() + 1}/${birthdate.getDate()}`;

    let data = {
      pais: this.state.pais,
      correo: this.state.correo,
      password: this.state.password,
      genero: this.state.sexo,
      telefono: this.state.telefono,
      nacimiento: birthdateString,
      equipo: this.state.equipo ? parseInt(this.state.equipo) : null,
      estado_civil: this.state.civil,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      avatarURL: this.state.foto,
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
      Cordova.exec(this.handleSuccessfulSignup, this.handleErrorOnSignup,
        'FileTransfer',
        'upload',
        [
          foto, // filePath
          `${process.env.MIX_APP_URL}/api/user`, // Server
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
      axios.post('/api/user', data, {
        headers: {
          Authorization: localStorage.getItem('api_token')
        }
      })
      .then(res => this.handleSuccessfulSignup({ 
        response: JSON.stringify(res.data),
      }))
      .catch(e => this.handleErrorOnSignup({
        http_status: e.response.status,
        body: JSON.stringify(e.response.data),
      }))
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
    if (res.response) {
      this.setState({
        isLoading: false,
      }, () => this.props.history.replace('/dashboard'));
    }
  }

  handleErrorOnSignup (err) {
    if (err.http_status === 422) {
      const body = JSON.parse(err.body);
      let errors = [];

      Object.keys(body.errors).forEach(key => {
        errors = errors.concat(body.errors[key]);
      });

      this.setState({
        isLoading: false,
        errors
      });
    } else {
      this.setState({
        isLoading: false,
        errors: 'Algo ocurrió durante la creación del perfil, intentalo nuevamente.',
      })
    }    
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
      time
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
        {this.state.errors !== null &&
          <div className="alert alert-danger">
            {typeof this.state.errors === 'string' ? (
              this.state.errors
            ) : (
              <ul style={{ margin: 0, paddingInlineStart: '20px' }}>
                {this.state.errors.map((err, i) => (
                  <li key={i}>
                    {err}
                  </li>
                ))}
              </ul>
            )}
          </div>
        }
        <form method="POST" onSubmit={this.handleSubmit}>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <FontAwesomeIcon icon="address-card" size="lg" />
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
              <FontAwesomeIcon icon="address-card" size="lg" />
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
              <FontAwesomeIcon icon="calendar" size="lg" />
            </div>
            <input 
              readOnly
              id="fecha" 
              type="text" 
              name="fecha"
              style={{ borderStyle: 'solid' }}
              onClick={this.handleDatePicker}
              value={time.getDate()+'/'+(time.getMonth() + 1) +'/'+time.getFullYear()} 
              className="form-control"
            />
          </div>
          <div className="input-group mb-4 mt-4 contenedor-genero" >
            <div className="input-group-prepend">
              <FontAwesomeIcon icon="venus-mars" size="lg" />
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
              <FontAwesomeIcon icon="envelope" size="lg" />
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
              <FontAwesomeIcon icon="phone" size="lg" />
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
                <FontAwesomeIcon icon="key" size="lg" />
              </div>
              <input type="password" id="password" name="password" value={password} onChange={this.handleChange} className="form-control" placeholder="Ingrese su password" />
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <label className="input-group-text">
                <FontAwesomeIcon icon="globe-americas" size="lg" />
              </label>
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
          {this.state.pais !== '' && 
            <div className="input-group mb-4 mt-4">
              <div className="input-group-prepend">
                <FontAwesomeIcon icon="futbol" size="lg" />
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
          }
          {this.state.equipo &&
            <div className="text-center input-equipo">
              <img src={'/images/clubs/'+this.state.equipo+'.png'} className="imagen-equipo"/>
            </div>
          }
          <div className="text-center">
            <button 
              type="submit" 
              className={'btn btn-negro black btn-box-index ' + (this.state.isLoading ? 'disabled' : '')}
              disabled={this.state.isLoading}
            >
              {this.state.isLoading && 
                <FontAwesomeIcon 
                  icon="sync" 
                  size="lg" 
                  spin 
                />
              }
              {`  `} Registrar
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

const mapDispatchToProps = dispatch => ({
  appStartedLoading: () => dispatch(appStartedLoading()),
  appFinishLoading: () => dispatch(appFinishLoading()),
});

export default connect(null, mapDispatchToProps)(RegistroCliente);