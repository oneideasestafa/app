import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { request } from './../../config/axios';
import imgAR from '../../../../public/images/countrys/ar.png';
import imgCL from '../../../../public/images/countrys/es.png';
import iconCivil from '../../../../public/images/EstadoCivil01.png';
import ProfileImage from './../atoms/ProfileImage';
import moment from 'moment';
import { fetchUser } from './../../redux/actions/auth';
import { fetchMaritalStatus, fetchFootballTeams } from './../../redux/actions/app';
import { connect } from 'react-redux';

/** Importando estilos css del componente */
import "../../../css/components/CambiarDatos.css";

class CambiarDatos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      nombre: '',
      apellido: '',
      sexo: '',
      fechaNacimiento: new Date(),
      equipo: '',
      civil: '',
      clubs:[],
      estadosciviles: [],
      correo: '',
      cuenta: '',
      pais: '',
      paises: [],
      telefono: '',
      foto: '',
      errors: null,
      isImageLoaded: false,
      isUpdated: false,
      isLoading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccessfulUpdate = this.handleSuccessfulUpdate.bind(this);
    this.handleErrorOnUpdate = this.handleErrorOnUpdate.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.chooseImageSource = this.chooseImageSource.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
    this.transferId = 1;
  }

  /**
   * Componente que se carga al renderi ar por primera ve
   * aqui traigo la informacion del usuario logeado
   */
  componentDidMount () {
    const { fetchUser, fetchMaritalStatus, fetchFootballTeams } = this.props;
    const promises = [fetchUser(), fetchMaritalStatus()];

    Promise.all(promises).then(([user, status]) => {
      this.setState({
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        sexo: user.sexo,
        equipo: user.equipoId === null ? '' : user.equipoId,
        fechaNacimiento: moment(user.fechaNacimiento, 'YYYY/MM/DD').toDate(),
        cuenta: user.tipoCuenta,
        civil: user.estadoCivilId,
        pais: user.paisId === null ? '' : user.paisId,
        telefono: user.telefono,
        foto: user.foto,
        estadosciviles: status,
      });

      if (user.paisId) {
        return fetchFootballTeams(user.paisId);
      }
    })
    .then(teams => this.setState({ clubs: teams ? teams: [] }))
    .then(() => this.setState({ isLoading: false }));
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

  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  /**
   * esta funcioncion se ejecuta al cargar por los componentes
   * trae como resultado la lista de clubs de espa;a/argentina
   * @param {evento} e 
   */
  handleCountryChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
      equipo: ''
    });

    const countryId = e.target.value;

    this.props.fetchFootballTeams(countryId).then(teams => {
      this.setState({
        clubs: teams,
      });
    })
  }

  /**
   * Esta funcion abre el modal de fecha
   */
  handleDatePicker () {
    datePicker.show({
      mode: 'date',
      androidTheme: datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK,
      date: this.state.fechaNacimiento,
      maxDate: new Date(),
    }, date => this.setState({
      fechaNacimiento: date,
    }), error => console.log('error picking', error));
  };

  /**
   * Esta funcion se encarga de enviar la peticion API
   * para actuali ar el perfil del cliente
   * @param {evento} e 
   */
  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      isLoading: true,
      isUpdated: false,
      errors: null 
    });

    const birthdate = this.state.fechaNacimiento;
    const birthdateString = `${birthdate.getFullYear()}/${birthdate.getMonth() + 1}/${birthdate.getDate()}`;

    let data = {
      userId: this.props.userId,
      pais: this.state.pais,
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

      console.log('data', data);

      /**
       * I use this syntax because of a bug where the
       * FileTransfer constructor is undefined
       */
      Cordova.exec(this.handleSuccessfulUpdate, this.handleErrorOnUpdate,
        'FileTransfer',
        'upload',
        [
          foto, // filePath
          `${process.env.MIX_APP_URL}/api/user/${this.props.userId}`, // Server
          'profilePicture', // fileKey
          foto.substr(foto.lastIndexOf('/') + 1), // fileName
          '', // mimeType
          data, // params
          false, // trustAllHost
          false, // chunckedMode
          { 
            Authorization: `Bearer ${this.props.accessToken}`,
            'X-Requested-With': 'XMLHttpRequest'
          }, // headers
          this.transferId, // _id
          'POST', // httpMethod
        ]
      );
    
    } else {      
      request.post(`api/user/${this.props.userId}`, data, {
        headers: {
          Authorization: `Bearer ${this.props.accessToken}`
        }
      })
      .then(res => this.handleSuccessfulUpdate({ 
        response: JSON.stringify(res.data),
      }))
      .catch(e => this.handleErrorOnUpdate({
        http_status: e.response.status,
        body: JSON.stringify(e.response.data),
      }))
      .then(() => this.setState({ isLoading: false }))
    }
  }

  handleSuccessfulUpdate (res) {
    console.log('res', res);
    if (res.response) {
      const client = JSON.parse(res.response);
      
      this.setState({
        isLoading: false,
        isUpdated: true,
        isImageLoaded: false,
        foto: client.foto,
      });

      this.transferId += 1;
    }
  }

  handleErrorOnUpdate (err) {
    console.log('err', err);
    if (err.http_status === 422) {
      const body = JSON.parse(err.body);
      let errors = [];

      Object.keys(body.errors).forEach(key => {
        errors = errors.concat(body.errors[key]);
      });

      this.setState({
        isLoading: false,
        isUpdated: false,
        errors
      });
    } else {
      this.setState({
        isLoading: false,
        isUpdated: false,
        errors: 'Algo ocurrió durante la creación del perfil, intentalo nuevamente.',
      })
    }
  }

  render () {
    let tagClass;
    let {nombre, apellido, correo, cuenta, pais, telefono, sexo, civil, equipo, foto, fechaNacimiento } = this.state;

    if(cuenta == 'ONE'){
        tagClass = 'badge badge-one';
    }else if(cuenta == 'Facebook'){
        tagClass = 'badge badge-facebook';
    }else if(cuenta == 'Google'){
        tagClass = 'badge badge-google';
    }

    if (this.state.isLoading)
      return(
        <div className="abs-center">
          <FontAwesomeIcon icon="sync" size="lg" spin />
        </div>
      );
      
    return (
      <div>
        <form method="POST" className="p-4" onSubmit={this.handleSubmit}>
          <div className="text-center my-2">
            <ProfileImage 
              size={150} 
              image={foto === '' ? null : foto}
              removable={true}
              onClick={this.chooseImageSource}
              onRemove={e => this.setState({ foto: null, isImageLoaded: false })}
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
          {this.state.isUpdated && 
            <div className="alert alert-success">
              Perfil actualizado correctamente
            </div>
          }
          <div className="input-group mb-4">
            <div className="input-group-prepend">
              <i className="fa fa-address-card fa-lg"></i>
            </div>
            <input 
              type="text" 
              name="nombre" 
              value={nombre} 
              className="form-control" 
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group mb-4">
            <div className="input-group-prepend">
              <i className="fa fa-address-card fa-lg"></i>
            </div>
            <input 
              type="text" 
              name="apellido"
              value={apellido} 
              className="form-control" 
              onChange={this.handleChange} 
              required
            />
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <i className="fas fa-calendar-alt fa-lg icono-fecha"></i>
            </div>
            <input 
              readOnly
              id="fecha" 
              type="text" 
              name="fecha"
              style={{ borderStyle: 'solid' }}
              onClick={this.handleDatePicker}
              value={fechaNacimiento.getDate()+'/'+(fechaNacimiento.getMonth() + 1) +'/'+fechaNacimiento.getFullYear()} 
              className="form-control"
            />
          </div>
          <div className="input-group mb-4">
            <div className="input-group-prepend">
              <i className="fa fa-envelope fa-lg"></i>
            </div>
            <input 
              readOnly 
              type="text" 
              id="correo" 
              name="correo" 
              value={correo}
              className="form-control"  
              style={{ borderStyle: 'solid' }}
            />
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <i className="fab fa-ello fa-lg"></i>
            </div>
            <div className="form-check form-check-inline">
              <input 
                value="m" 
                name="sexo" 
                type="radio" 
                id="inlineRadio1x" 
                checked={sexo === 'm'}
                className="form-check-input" 
                onChange={this.handleChange} 
              />
              <label className="form-check-label" htmlFor="inlineRadio1x">Masculino</label>
            </div>
            <div className="form-check form-check-inline">
              <input 
                value="f" 
                name="sexo" 
                type="radio"
                id="inlineRadio2x" 
                checked={sexo === 'f'}
                className="form-check-input" 
                onChange={this.handleChange} 
              />
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
              {this.state.estadosciviles.map(item => (
                <option key={item._id} value={item._id}>{item.Nombre}</option>
              ))}
            </select>
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <i className="fas fa-phone fa-lg"></i>
            </div>
            <input 
              type="number" 
              min="0" max="99999999999" 
              maxLength="11" 
              id="telefono" 
              name="telefono" 
              value={telefono} 
              onChange={this.handleChange} 
              className="form-control" 
              placeholder="Ingrese su telefono (Opcional)" 
            />
          </div>
          <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
              <label className="input-group-text"><i className="fa fa-globe-americas fa-lg"></i></label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" onChange={this.handleCountryChange} type="radio" name="pais" id="inlineRadio1" value="5caf334dff6eff0ae30e450b" checked={pais === '5caf334dff6eff0ae30e450b'}  />
              <label className="form-check-label" htmlFor="inlineRadio1"><img src={imgAR} className="img-country" /></label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" onChange={this.handleCountryChange} type="radio" name="pais" id="inlineRadio2" value="5caf37adff6eff0ae30e450d" checked={pais === '5caf37adff6eff0ae30e450d'}  />
              <label className="form-check-label" htmlFor="inlineRadio2"><img src={imgCL} className="img-country" /></label>
            </div>
          </div>
          {this.state.pais !== '' && 
            <div className="input-group mb-4 mt-4">
              <div className="input-group-prepend">
                <i className="fas fa-futbol fa-lg"></i>
              </div>
              <select className="form-control" id="inputGroupSelect02" value={equipo} name="equipo" id="equipo" onChange={this.handleChange}>
                <option  value=''>Equipos de futbol</option>
                { this.state.clubs.length > 0 &&
                  <option  key="0" value='1000'>Ninguno</option>
                }
                {this.state.clubs.map(item => (
                  <option  key={item.id} value={item.id}>{item.Nombre}</option>
                ))}
              </select>
            </div>
          }
          { this.state.equipo !== '' &&
            <div className="text-center contenedor-imagen-equipo" >
              <img className="imagen-equipo" src={'/images/clubs/'+this.state.equipo+'.png'} />
            </div>
          }
          <div className="text-center">
            <button type="submit" className="btn btn-negro black btn-box-index">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  accessToken: state.auth.accessToken,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchMaritalStatus: () => dispatch(fetchMaritalStatus()),
  fetchFootballTeams: (countryId) => dispatch(fetchFootballTeams(countryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CambiarDatos);