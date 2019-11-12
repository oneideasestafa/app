import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './../../../../public/images/logo-one.png';
import { withRouter } from 'react-router-dom';
import { toggleNavigationMenu, setCurrentPage } from '../../redux/actions/navigation';
import { wipeJobs } from './../../redux/actions/show';
import RedesSociales from './../organisms/RedesSociales';

class SideMenu extends React.Component {
  constructor (props) {
    super(props);

    this.navigate = this.navigate.bind(this);
    this.stopEverything = this.stopEverything.bind(this);
  }

  navigate (e) {
    e.preventDefault();

    this.props.toggleNavigationMenu();

    this.props.setCurrentPage(e.target.dataset.name);
    this.props.history.push(e.target.dataset.route);
  }

  stopEverything (e) {
    e.preventDefault();

    this.props.wipeJobs();
    this.props.toggleNavigationMenu();
  }

  handleOutRequest (e) {
    e.preventDefault(); 

    this.props.wipeJobs();
    this.props.toggleNavigationMenu();

    this.props.history.push('/questionEvent');
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
            <a className="navbar-brand px-0 boton-logo" href="#">
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
                  <FontAwesomeIcon icon="star" size="lg" /> {`  `} Show
                </a>
              </li>
              {process.env.NODE_ENV === 'development' &&
                <li className="nav-item">
                  <a 
                    onClick={this.navigate} 
                    data-route="/downloads"
                    data-name="Descargas" 
                    className="nav-link"
                    style={{backgroundColor: current === 'Descargas' ? '#000 !important' : ''}}
                  >
                    <FontAwesomeIcon icon="arrow-down" size="lg" /> {`  `} Descargas
                  </a>
                </li>
              }
              <li className="nav-item">
                <a 
                  onClick={this.navigate} 
                  data-route="/profile" 
                  data-name="Perfil" 
                  className="nav-link"
                  style={{backgroundColor: current === 'Perfil' ? '#000 !important' : ''}}
                >
                  <FontAwesomeIcon icon="user-cog" size="lg" /> {`  `} Perfil
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
                  <FontAwesomeIcon icon="comments" size="lg" /> {`  `} Notificaciones
                </a>
              </li>
              <li className="nav-item">
                <a 
                  onClick={this.navigate} 
                  data-route="/green-step-1" 
                  data-name="Chroma Studio" 
                  className="nav-link"
                  style={{backgroundColor: current === 'Chroma Studio' ? '#000 !important' : ''}}
                >
                  <FontAwesomeIcon icon="video" size="lg" /> {`  `} Chroma Studio
                </a>
              </li>
              <RedesSociales />
              <li className="nav-item">
                <a 
                  onClick={this.navigate} 
                  data-route="rss" 
                  data-name="Social Wall" 
                  className="nav-link"
                  style={{backgroundColor: current === 'Social Wall' ? '#000 !important' : ''}}
                >
                  <FontAwesomeIcon icon="heart" size="lg" /> {`  `} Social Wall
                </a>
              </li>
              <li className="nav-item">
                <a 
                  onClick={this.stopEverything} 
                  data-route="stop" 
                  data-name="Detener" 
                  className="nav-link"
                  style={{backgroundColor: current === 'Detener' ? '#000 !important' : ''}}
                >
                  <FontAwesomeIcon icon="power-off" size="lg" /> {`  `} Detener
                </a>
              </li>
              <li className="nav-item">
                <a 
                  onClick={this.handleOutRequest} 
                  className="nav-link"
                  style={{backgroundColor: current === 'Detener' ? '#000 !important' : ''}}
                >
                  <FontAwesomeIcon icon="arrow-circle-left" size="lg" /> {`  `} Salir
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
  wipeJobs: () => dispatch(wipeJobs()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SideMenu);