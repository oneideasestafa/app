import React from 'react';
import { connect } from 'react-redux';
import { toggleNavigationMenu } from './../../redux/actions/navigation';

class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { section, toggleNavigationMenu } = this.props;
    
    return (
      <header className="navbar navbar-dark navbar-full bg-dark sticky-top">
        <button className="navbar-toggler" onClick={toggleNavigationMenu}>
            <span className="navbar-toggler-icon" />
        </button>
        <span className="navbar-brand mr-auto">
            {section}
        </span>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  section: state.navigation.current
});

const mapDispatchToProps = dispatch => ({
  toggleNavigationMenu: () => dispatch(toggleNavigationMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);