import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import logo from './../../../../public/images/logo-one.png';
import { withRouter } from 'react-router-dom';
import { toggleNavigationMenu, setCurrentPage } from '../../redux/actions/navigation';
import RedesSociales from './../organisms/RedesSociales';

class SideMenu extends React.Component {
  constructor (props) {
    super(props);

    this.navigate = this.navigate.bind(this);
  }

  navigate (e) {
    e.preventDefault();

    this.props.toggleNavigationMenu();

    this.props.setCurrentPage(e.target.dataset.name);
    this.props.history.push(e.target.dataset.route);
  }

  render () {
    if (!this.props.isLoggedIn)
      return null;

    const navDrawer = classnames('navdrawer', {
      'navdrawer-default': this.props.isMenuOpen,
      'show': this.props.isMenuOpen
    });

    const { current } = this.props;

    return (
      <div className={navDrawer}>
        <div className="navdrawer-content">
          <div className="navdrawer-header roboto-condensed">
            <a className="navbar-brand px-0 boton-logo" href="javascript:void(0)">
              {" "}
              <img className="logo-imagen" src={logo} style={{height: '100%'}}/>
            </a>
          </div>
            <ul className="navdrawer-nav roboto-condensed">
              <li className="nav-item">
                <a 
                  onClick={this.navigate} 
                  data-route="/show" 
                  data-name="Show" 
                  className="nav-link"
                  style={{backgroundColor: current === 'Show' ? '#000 !important' : ''}}
                >
                  <i className="fas fa-home fa-lg" /> {"    "} Show
                </a>
              </li>
              <li className="nav-item">
                <a 
                  onClick={this.navigate} 
                  data-route="/downloads" 
                  data-name="Descargas" 
                  className="nav-link"
                  style={{backgroundColor: current === 'Descargas' ? '#000 !important' : ''}}
                >
                  <i className="fas fa-arrow-down fa-lg" /> {"    "} Descargas
                </a>
              </li>
              <li className="nav-item">
                <a 
                  onClick={this.navigate} 
                  data-route="/profile" 
                  data-name="Perfil" 
                  className="nav-link"
                  style={{backgroundColor: current === 'Perfil' ? '#000 !important' : ''}}
                >
                  <i className="fas fa-cog fa-lg" /> {"    "} Perfil
                </a>
              </li>
              <li className="nav-item">
                <a 
                  onClick={this.navigate} 
                  data-route="/notification" 
                  data-name="Notificación" 
                  className="nav-link"
                  style={{backgroundColor: current === 'Notificación' ? '#000 !important' : ''}}
                >
                  <i className="fab fa-weixin fa-lg" /> {"    "} Notificaciones
                </a>
              </li>
              <RedesSociales />
              <li className="nav-item">
                <a 
                  onClick={this.navigate} 
                  data-route="stop" 
                  data-name="Detener" 
                  className="nav-link"
                  style={{backgroundColor: current === 'Detener' ? '#000 !important' : ''}}
                >
                  <i className="fas fa-power-off fa-lg" /> {"    "} Detener
                </a>
              </li>
            </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isMenuOpen: state.navigation.isMenuOpen,
  current: state.navigation.current,
});

const mapDispatchToProps = dispatch => ({
  toggleNavigationMenu: () => dispatch(toggleNavigationMenu()),
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SideMenu);