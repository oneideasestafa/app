import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSyncAlt, faTrashAlt, faSync } from '@fortawesome/free-solid-svg-icons';
import NotAuthRoute from './atoms/NotAuthRoute';
import PrivateRoute from './atoms/PrivateRoute';
import store from './../redux';
/**
 * A continuacion se importan todos los componentes que seran
 * utili ados como paginas y rutas del front end
 */
import Ingreso from "./Pages/Ingreso";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import QuestionEvent from "./Pages/QuestionEvent";
import Wrapper from './Pages/Wrapper';
// import RedesSociales from './Pages/RedesSociales';

library.add(faSyncAlt, faTrashAlt, faSync);

function App() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
              {/**
              A continuacion se presentan todas las rutas registradas del front end
              asi como sus respectivos componentes renderi ados en cada una */}
              <NotAuthRoute exact path="/dashboard" component={Ingreso} />
              <NotAuthRoute exact path="/registro" component={Registro} />
              <NotAuthRoute exact path="/login" component={Login} />
              <PrivateRoute exact path="/questionEvent" component={QuestionEvent} />
              <PrivateRoute path="/" component={Wrapper} />
          </Switch>
        </Router>
      </Provider>
    );
}

export default App;
