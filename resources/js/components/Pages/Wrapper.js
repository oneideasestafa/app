import React from 'react';
import SideMenu from './../organisms/SideMenu';
import Header from './../organisms/Header';
import { Switch, Route } from 'react-router-dom';

// Pages
import CambiarDatos from './../organisms/CambiarDatos';
import Show from './Show';
import Downloads from './Downloads';
import RSS from './RSS';

class Wrapper extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <SideMenu />
        <Header />
        <Switch>
          <Route exact path="/show" component={Show} />
          <Route exact path="/profile" component={CambiarDatos} />
          <Route exact path="/downloads" component={Downloads} />
          <Route exact path="/rss" component={RSS} />
        </Switch>
      </div>
    );
  }
}

export default Wrapper;