import React, { Component } from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import GoogleAuthButton from './../atoms/GoogleAuthButton';
import FacebookAuthButton from './../atoms/FacebookAuthButton';
import logoOne from "../../../../public/images/logo-one.png";

/**Importando estilos de la aplicacion */
import "./../../../css/pages/Ingreso.css";

library.add(faSync);

export default class Ingreso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            urlGooglePlay: props.googleplay,
            urlAppleStore: props.applestore
        };
    }
    isCordova() {
        return navigator.userAgent.match(/(Cordova)/);
    }
    getOS() {
        let userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
            windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
            iosPlatforms = ["iPhone", "iPad", "iPod"],
            os = null;

        if (macosPlatforms.indexOf(platform) !== -1) {
            os = "Mac OS";
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = "iOS";
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = "Windows";
        } else if (/Android/.test(userAgent)) {
            os = "Android";
        } else if (!os && /Linux/.test(platform)) {
            os = "Linux";
        }

        return os;
    }

    render () {
      return (
        <div className="abs-center roboto-condensed">
          <div className="box">
            <div className="">
              <img
                src={logoOne}
                className="img-fluid logo-box-index"
              />
            </div>
            <div className="text-center">
              <Link
                to={{
                  pathname: "/login",
                  state: { url: "/" }
                }}
              >
                <div className="btn btn-negro btn-box-index">
                  Ingresar
                </div>
              </Link>
            </div>
            <div className="text-center mb-5">
              <Link to="/registro">
                <div className="btn btn-rojo btn-box-index">
                  Registrar
                </div>
              </Link>
            </div>
            <div className="text-center roboto-condensed text-can-login-social">
              <p style={{ color: "rgb(146, 143, 143)" }}>
                o puedes ingresar con
              </p>
            </div>
            <div className="text-center mb-5">
              <FacebookAuthButton 
                block={true}
                className="mb-2" 
              />
              <GoogleAuthButton 
                block={true}
                className="mb-2" 
              />
            </div>
          </div>
        </div>
      );
    }
}
