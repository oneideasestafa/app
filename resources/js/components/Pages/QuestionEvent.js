import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from "sweetalert2";
import InputMask from 'react-input-mask';
import logoOne from '../../../../public/images/logo-one.png';
import { connect } from 'react-redux';
import { getEvents, selectEvent } from './../../redux/actions/events';

library.add(faSync);

class QuestionEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: window.location.origin.toString(),
            idUsuario : props.location.state.idUsuario,
            api_token: props.location.state.api_token,
            evento: '',
            idevento: '',
            sector: '',
            fila: '',
            asiento: '',
            eventoUbicacionManual: false,
            manual: false,
            isLoadButton: false,
            ideventobad: false,
            isLoading: true
        };

        this.handleContinuar = this.handleContinuar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUbicacion = this.handleUbicacion.bind(this);

    }

    /**
     * Esta funcion se dispara al renderi ar por primera ve y es una consulta
     * para traer todos los eventos de bd
     */
    componentDidMount() {
      this.props.getEvents(this.state.api_token)
        .then(() => this.setState({ isLoading: false }))
        .catch(e => console.log(e));
    }

    /**
     * esta funcion se emite al cambiar entre las opciones de los eventos y su funcion
     * es de cambiar el valor del state
     * @param {evento} e 
     */
    handleChange(e) {

        let name = e.target.name;
        

        if(name == 'evento'){

            localStorage.setItem("eventoId", e.target.value);

            if(e.target.value == ''){

                this.setState({
                    [e.target.name]: e.target.value,
                    manual: false,
                    eventoUbicacionManual: false,
                    idevento: '',
                    isLoadButton: false

                });

            }else if(e.target.value == 'idevento'){

                this.setState({
                    [e.target.name]: e.target.value,
                    manual: false,
                    eventoUbicacionManual: false,
                    isLoadButton: true
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

    /**
     * 
     * @param {string} event 
     * @param {integer} idevent 
     */
    handleUbicacion(event, idevent){

        let self = this;

        let evento = event;
        let idevento = idevent;

        console.log(this.state.api_token)
        axios.post('api/eventos/check-ubicacion', {evento, idevento},{
            headers: {
                Authorization: this.state.api_token
            }
        })
            .then(res => {

                let r = res.data;

                if(r.code === 200){

                    if(r.ubicacion === false){

                        self.setState({
                            eventoUbicacionManual: false,
                            manual: false,
                            ideventobad: false,
                            isLoadButton:true
                        });

                    }else{
                        self.setState({
                            eventoUbicacionManual: true,
                            manual: true,
                            ideventobad: false,
                            isLoadButton:true
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
                        eventoUbicacionManual: false,
                        isLoadButton: false
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


    /**
     * Esta funcion se ejecuta al dar submit al seleccionar evento
     * se procede a validar las credenciales 
     * @param {evento} e 
     */
    handleContinuar(e){
      e.preventDefault();

      this.setState({
          isLoading: true
      });

      let {idUsuario, evento, sector, fila, asiento, eventoUbicacionManual, manual, ideventobad} = this.state;

      //AQUI DEBO CREAR LA RUTA PARA VALIDAR EVENTO SI UTILI O ID EVENTO
      if(ideventobad == true){
          //AQUI DEBO CREAR LA RUTA PARA VALIDAR EVENTO
          this.setState({
              isLoading: false
          });

          swal({
              title: '<i class="fas fa-exclamation-circle"></i>',
              text: 'El codigo del evento es invalido',
              confirmButtonColor: '#343a40',
              confirmButtonText: 'Ok'
          });

      } else {

        this.props.selectEvent(evento);

        this.props.history.push({
          pathname: '/show',
          state: { 
            idUsuario, 
            sector, 
            fila, 
            asiento, 
            manual, 
            ideventobad, 
            eventoUbicacionManual
          }
        })
      }
    }

    render() {

      const { evento, idevento, url, fila, asiento, sector, eventoUbicacionManual, isLoading } = this.state;
      let urlLogout    = url + '/logout';

      if (isLoading)
        return (
          <div className="abs-center">
            <FontAwesomeIcon icon="sync" size="lg" spin />
          </div>
        );

      return (
          <div className="abs-center">
              <form method="POST" onSubmit={this.handleContinuar} className="form-loginy">
                  <div className="">
                      <img src={logoOne} className="img-fluid logo-box-registro mb-4" />
                  </div>
                  <div className="text-center">
                      <h2>Ubicación</h2>
                  </div>
                  <div className="input-group mb-4 mt-4">
                      <div className="input-group-prepend">
                          <i className="fas fa-calendar-week fa-lg"></i>
                      </div>
                      <select className="form-control" id="inputGroupSelect02" value={evento} name="evento" id="evento" onChange={this.handleChange}>
                          <option value=''>Seleccione Evento</option>
                          <option value='idevento'>ID Evento</option>
                          {this.props.events.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.Nombre}
                            </option>
                          ))}
                      </select>
                  </div>
                  { evento == 'idevento' &&
                      <div className="input-group mb-4 mt-4">
                          <div className="input-group-prepend">
                              <i className="fa fa-lock fa-lg"></i>
                          </div>
                          <InputMask mask="******" maskChar={null} value={idevento} name="idevento" onChange={this.handleChange} className="form-control" placeholder="Ingrese el codigo del evento" />;
                      </div>
                  }
                  { eventoUbicacionManual == true &&
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
                  }
                  { this.state.isLoadButton == true &&
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-negro btn-box-index">
                            { this.state.isLoading ? <FontAwesomeIcon icon="sync" size="lg" spin /> : '' }
                            &nbsp;&nbsp; Continuar
                        </button>
                    </div>
                  }    
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

const mapStateToProps = state => ({
  events: state.events.events
})

const mapDispatchToProps = dispatch => ({
  getEvents: (apiToken) => dispatch(getEvents(apiToken)),
  selectEvent: (id) => dispatch(selectEvent(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionEvent);