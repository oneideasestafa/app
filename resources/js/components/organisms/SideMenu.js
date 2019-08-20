import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import logo from './../../../../public/images/logo-one.png';
import { withRouter } from 'react-router-dom';
import { toggleNavigationMenu } from '../../redux/actions/navigation';

class SideMenu extends React.Component {
  constructor (props) {
    super(props);

    this.navigate = this.navigate.bind(this);
  }

  navigate (e) {
    e.preventDefault();

    this.props.toggleNavigationMenu();
    this.props.history.push(e.target.dataset.route);
  }

  render () {
    if (!this.props.isLoggedIn)
      return null;

    const navDrawer = classnames('navdrawer', {
      'navdrawer-default': this.props.isMenuOpen,
      'show': this.props.isMenuOpen
    });

    return (
      <div className={navDrawer}>
        <div className="navdrawer-content">
          <div className="navdrawer-header roboto-condensed">
            <a className="navbar-brand px-0 boton-logo" href="javascript:void(0)">
              {" "}
              <img className="logo-imagen" src={logo} />
            </a>
          </div>
            <ul className="navdrawer-nav roboto-condensed">
              <li className="nav-item">
                <a onClick={this.navigate} data-route="/show" className="nav-link">
                  <i className="fas fa-home fa-lg" /> {"   "} Show
                </a>
              </li>
              <li className="nav-item">
                <a onClick={this.navigate} data-route="/profile" className="nav-link">
                  <i className="fas fa-cog fa-lg" /> {"   "} Perfil
                </a>
              </li>
              <li className="nav-item">
                <a onClick={this.navigate} data-route="/notification" className="nav-link">
                  <i className="fab fa-weixin fa-lg" /> {"   "} Notificaciones
                </a>
              </li>
              <li className="nav-item">
                <a onClick={this.navigate} data-route="stop" className="nav-link">
                  <i className="fas fa-power-off fa-lg" /> {"   "} Detener
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
  isMenuOpen: state.navigation.isMenuOpen
});

const mapDispatchToProps = dispatch => ({
  toggleNavigationMenu: () => dispatch(toggleNavigationMenu())
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SideMenu);