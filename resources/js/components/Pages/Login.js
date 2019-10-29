import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import { authenticate, socialAuthentication } from '../../redux/actions/auth';
import swal from "sweetalert2";
import logoOne from "../../../../public/images/logo-one.png";

/**Importando estilos del componente */
import "./../../../css/pages/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: window.location.origin.toString(),
            correo: "",
            pass: "",
            isLoading: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFacebookAuth = this.handleFacebookAuth.bind(this);
        this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
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
          isLoading: true
      });

      const email = this.state.correo;
      const password = this.state.pass;

      this.props.authenticate(email, password)
      .catch(error => {
          if (error.response.status == 422) {
              this.setState({
                isLoading: false
              });

              swal({
                  title: '<i class="fas fa-exclamation-circle"></i>',
                  text: error.response.data,
                  confirmButtonColor: "#343a40",
                  confirmButtonText: "Ok"
              });
          }
      });
    }

    handleFacebookAuth (e) {
      e.preventDefault();

      facebookConnectPlugin.login(['public_profile'], success => {
        const { authResponse } = success;

        this.props.socialAuthentication('facebook', authResponse.accessToken)
        .catch(e => console.log('error 2', e));

      }, error => console.log('error', error));
    }

    handleGoogleAuth (e) {
      e.preventDefault();

      window.plugins.googleplus.login({
        webClientId: process.env.MIX_APP_GOOGLE_CLIENT_ID,
        offline: true
      }, success => {
        const { accessToken } = success;

        this.props.socialAuthentication('google', accessToken)
        .catch(e => console.log('error 2', e));
        
      }, error => console.log('error', error))
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
            <div className="input-group mb-4 mt-4">
              <div className="input-group-prepend">
                <i className="fa fa-envelope fa-lg" />
              </div>
              <input
                type="text"
                id="correo"
                name="correo"
                value={correo}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Ingrese su correo"
              />
            </div>
            <div className="input-group mb-4 mt-3">
              <div className="input-group-prepend">
                <i className="fa fa-key fa-lg" />
              </div>
              <input
                type="password"
                id="pass"
                name="pass"
                value={pass}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Ingrese su contraseña"
              />
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-negro btn-box-index"
              >
                {this.state.isLoading &&
                  <FontAwesomeIcon icon="sync" size="lg" spin />
                }
                &nbsp;&nbsp; Ingresar
              </button>
            </div>
          </form>
          <div className="text-center roboto-condensed text-can-login-social">
            <p style={{ color: "rgb(146, 143, 143)" }}>
              o puedes ingresar con
            </p>
          </div>
          <div className="text-center mb-5">
            <button 
              className="btn btn-block mb-2 text-white"
              style={{ backgroundColor: '#1877f2' }}
              onClick={this.handleFacebookAuth}
            >
              <FontAwesomeIcon
                icon={['fab', 'facebook-f']}
                color="#fff"
                pull="left"
              /> 
              Inicia sesión con Facebook
            </button>
            <button 
              className="btn btn-block mb-2 text-white"
              style={{ backgroundColor: '#db4437' }}
              onClick={this.handleGoogleAuth}
            >
              <FontAwesomeIcon
                icon={['fab', 'google']}
                color="#fff"
                pull="left"
              /> 
              Inicia sesión con Google
            </button>
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
  socialAuthentication: (provider, accessToken) => dispatch(socialAuthentication(provider, accessToken)),
});

export default connect(null, mapDispatchToProps)(Login);