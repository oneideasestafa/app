import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import swal from "sweetalert2";
import InputMask from 'react-input-mask';
import logoOne from '../../../../public/images/logo-one.png';
import { connect } from 'react-redux';
import { getEvents, selectEvent } from './../../redux/actions/events';
import { logout } from './../../redux/actions/auth';

class QuestionEvent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
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
    this.handleLogout = this.handleLogout.bind(this);
  }

  /**
   * Esta funcion se dispara al renderi ar por primera ve y es una consulta
   * para traer todos los eventos de bd
   */
  componentDidMount() {
    this.props.getEvents()
      .then(() => this.setState({ isLoading: false }))
      .catch(e => console.log(e));
  }

  /**
   * esta funcion se emite al cambiar entre las opciones de los eventos y su funcion
   * es de cambiar el valor del state
   * @param {evento} e 
   */
  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  /**
   * Esta funcion se ejecuta al dar submit al seleccionar evento
   * se procede a validar las credenciales 
   * @param {evento} e 
   */
  handleContinuar(e){
    e.preventDefault();

    this.props.selectEvent(this.state.evento);

    this.props.history.push({
      pathname: '/show',
      state: { 
        idUsuario: this.props.uid, 
      }
    });
  }

  handleLogout (e) {
    e.preventDefault();

    this.props.logout();
  }

  render() {

    const { evento, isLoading } = this.state;

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
              <select className="form-control" value={evento} name="evento" onChange={this.handleChange}>
                  <option value=''>Seleccione Evento</option>
                  {/* <option value='eventoId'>Ingresas id del evento</option> */}
                  {this.props.events.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.Nombre}
                    </option>
                  ))}
              </select>
          </div>
          {evento !== "" &&
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-negro btn-box-index">
                {this.state.isLoading && 
                  <FontAwesomeIcon icon="sync" size="lg" spin />
                }
                &nbsp;&nbsp; Continuar
              </button>
            </div>
          }    
          <div className="text-center">
            <button 
              type="button" 
              onClick={this.handleLogout}
              className="btn btn-rojo btn-box-index"
            >
              Salir
            </button>
          </div>
        </form>
      </div>
    );       
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  uid: state.auth.user.id,
  apiToken: state.auth.apiToken,
})

const mapDispatchToProps = dispatch => ({
  getEvents: (apiToken) => dispatch(getEvents(apiToken)),
  selectEvent: (id) => dispatch(selectEvent(id)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionEvent);