import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import { authenticate, appFinishLoading, appStartedLoading } from '../../redux/actions/auth';
import logoOne from "../../../../public/images/logo-one.png";
import GoogleAuthButton from './../atoms/GoogleAuthButton';
import FacebookAuthButton from './../atoms/FacebookAuthButton';
import Alert from './../atoms/Alert';

/**Importando estilos del componente */
import "./../../../css/pages/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: window.location.origin.toString(),
            correo: '',
            pass: '',
            error: '',
            isLoading: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Esta funcion va cambiando el state mientras modificamos los inputs
     * @param {evento} e
     */
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    /**
     * Esta funcion se dispara al dar submit en login
     * aqui se verificara las credenciales del sistema y se procedera a un login satisfactorio
     * o erroneo
     * @param {evento} e
     */
    handleLogin(e) {
      e.preventDefault();

      this.setState({
        error: '',
      });

      const email = this.state.correo;
      const password = this.state.pass;

      this.props.appStartedLoading();

      this.props.authenticate(email, password)
      .catch(error => {
        let message = '';

        if (error.response.status === 401) {
          message = error.response.data.message;
        } else {
          message = 'Ha ocurrido un error al tratar de iniciar sesión, por favor intente de nuevo.'
        }
        
        this.setState({
          error: message
        });
      })
      .then(() => this.props.appFinishLoading());
    }

    render() {
      let correo = this.state.correo;
      let pass = this.state.pass;

      let urlRecuperar = "/recovery-password";

      return (
        <div className="p-5">
          <form
            method="POST"
            onSubmit={this.handleLogin}
            className="mb-4"
          >
            <div className="">
              <img
                src={logoOne}
                className="img-fluid logo-box-index"
              />
            </div>
            {this.state.error !== '' && 
              <Alert 
                type="danger" 
                onClose={() => this.setState({error: ''})}
              >
                {this.state.error}
              </Alert>
            }
            <div className="input-group mb-4 mt-4">
              <div className="input-group-prepend">
                <FontAwesomeIcon icon="envelope" size="lg" />
              </div>
              <input
                type="text"
                id="correo"
                name="correo"
                value={correo}
                onChange={this.handleChange}
                className="form-control p-2"
                placeholder="Ingrese su correo"
              />
            </div>
            <div className="input-group mb-4 mt-3">
              <div className="input-group-prepend">
                <FontAwesomeIcon icon="key" size="lg" />
              </div>
              <input
                type="password"
                id="pass"
                name="pass"
                value={pass}
                onChange={this.handleChange}
                className="form-control p-2"
                placeholder="Ingrese su contraseña"
              />
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-negro btn-box-index"
              >
                Ingresar
              </button>
            </div>
          </form>
          <div className="text-center roboto-condensed text-can-login-social">
            <p style={{ color: "rgb(146, 143, 143)" }}>
              o puedes ingresar con
            </p>
          </div>
          <div className="text-center mb-5">
            <FacebookAuthButton 
              block={true}
              className="mb-2"
              onStart={() => this.setState({
                error: '',
              })}
              onError={() => this.setState({
                error: 'El correo que utilizó ya está en uso'
              })}
            />
            <GoogleAuthButton 
              block={true}
              className="mb-2"
              onStart={() => this.setState({
                error: '',
              })}
              onError={() => this.setState({
                error: 'El correo que utilizó ya está en uso'
              })}
            />
          </div>
          <div className="text-center">
            <Link to="/">
              <button
                type="button"
                className="btn btn-rojo btn-box-index"
              >
                Volver
              </button>
            </Link>
          </div>
          <p className="mt-3 text-center link-recovery-password roboto-condensed">
            <a href={urlRecuperar}>¿Has olvidado tu contraseña?</a>
          </p>
        </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
  authenticate: (email, password) => dispatch(authenticate(email, password)),
  appStartedLoading: () => dispatch(appStartedLoading()),
  appFinishLoading: () => dispatch(appFinishLoading()),
});

export default connect(null, mapDispatchToProps)(Login);