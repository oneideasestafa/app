import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faSyncAlt, 
  faTrashAlt, 
  faSync, 
  faCamera, 
  faTimes, 
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import LoadingScreen from './atoms/LoadingScreen';
import NotAuthRoute from './atoms/NotAuthRoute';
import PrivateRoute from './atoms/PrivateRoute';
import store from './../redux';
/**
 * A continuacion se importan todos los componentes que seran
 * utili ados como paginas y rutas del front end
 */
import Ingreso from "./Pages/Ingreso";
import Eli from "./Pages/GreenScreen/Eli";
import Eli2 from "./Pages/GreenScreen/Eli2";
import Eli3 from "./Pages/GreenScreen/Eli3";
import Eli4 from "./Pages/GreenScreen/Eli4";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import QuestionEvent from "./Pages/QuestionEvent";
import Wrapper from './Pages/Wrapper';

library.add(fab, faSyncAlt, faTrashAlt, faSync, faCamera, faTimes, faTimesCircle);

function App () {
  useEffect(() => {
    function handler () {
      navigator.splashscreen.hide();
    }

    window.addEventListener('load', handler);

    return () => window.removeEventListener('load', handler);
  }, []);

    return (
      <Provider store={store}>
        <React.Fragment>
          <Router>
            <Switch>
                {/**
                  A continuacion se presentan todas las rutas registradas del front end
                  asi como sus respectivos componentes renderi ados en cada una 
                */}
                <NotAuthRoute exact path="/dashboard" component={Eli} />
                <NotAuthRoute exact path="/green-step-2" component={Eli2} />
                <NotAuthRoute exact path="/green-step-3" component={Eli3} />
                <NotAuthRoute exact path="/green-step-4" component={Eli4} />
                <NotAuthRoute exact path="/registro" component={Registro} />
                <NotAuthRoute exact path="/login" component={Login} />
                <PrivateRoute exact path="/questionEvent" component={QuestionEvent} />
                <PrivateRoute path="/" component={Wrapper} />
            </Switch>
          </Router>
          <LoadingScreen />
        </React.Fragment>
      </Provider>
    );
}

export default App;
