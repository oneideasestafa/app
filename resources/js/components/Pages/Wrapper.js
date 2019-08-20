import React from 'react';
import SideMenu from './../organisms/SideMenu';
import Header from './../organisms/Header';
import { Switch, Router } from 'react-router-dom';

class Wrapper extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <SideMenu />
        <Header />
        {/* <Switch>
        </Switch> */}
      </div>
    );
  }
}

export default Wrapper;