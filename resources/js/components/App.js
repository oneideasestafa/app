import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faSyncAlt, 
  faTrashAlt, 
  faSync, 
  faCamera, 
  faTimes, 
  faTimesCircle,
  faExclamationCircle,
  faRedoAlt,
  faCheck,
  faStar,
  faKey,
  faHeart,
  faUserCog,
  faArrowDown,
  faVideo,
  faPowerOff,
  faComments,
  faArrowCircleLeft,
  faAddressCard,
  faEnvelope,
  faVenusMars,
  faUserCircle,
  faPhone,
  faGlobeAmericas,
  faFutbol,
  faCalendar,
  faCalendarWeek,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import LoadingScreen from './atoms/LoadingScreen';
import NotAuthRoute from './atoms/NotAuthRoute';
import PrivateRoute from './atoms/PrivateRoute';
import store from './../redux';
import SuspenseLoadingScreen from './atoms/SuspenseLoadingScreen';
import SuspenseErrorBoundary from './atoms/SuspenseErrorBoundary';
/**
 * A continuacion se importan todos los componentes que seran
 * utili ados como paginas y rutas del front end
 */
const Ingreso = lazy(() => import('./Pages/Ingreso'));
const Login = lazy(() => import('./Pages/Login'));
const Registro = lazy(() => import('./Pages/Registro'));
const QuestionEvent = lazy(() => import('./Pages/QuestionEvent'));
const Wrapper = lazy(() => import('./Pages/Wrapper'));

library.add(
  fab, 
  faSyncAlt, 
  faTrashAlt, 
  faSync, 
  faCamera, 
  faTimes, 
  faTimesCircle, 
  faExclamationCircle, 
  faRedoAlt,
  faCheck,
  faStar,
  faKey,
  faHeart,
  faUserCog,
  faArrowDown,
  faVideo,
  faPowerOff,
  faComments,
  faArrowCircleLeft,
  faAddressCard,
  faEnvelope,
  faVenusMars,
  faUserCircle,
  faPhone,
  faGlobeAmericas,
  faFutbol,
  faCalendar,
  faCalendarWeek,
  faLock
);

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
          <SuspenseErrorBoundary>
            <Suspense fallback={<SuspenseLoadingScreen />}>
              <Router>
                <Switch>
                  <NotAuthRoute exact path="/dashboard" component={Ingreso} />
                  <NotAuthRoute exact path="/registro" component={Registro} />
                  <NotAuthRoute exact path="/login" component={Login} />
                  <PrivateRoute exact path="/questionEvent" component={QuestionEvent} />
                  <PrivateRoute path="/" component={Wrapper} />
                </Switch>
              </Router>
            </Suspense>
          </SuspenseErrorBoundary>
          <LoadingScreen />
        </React.Fragment>
      </Provider>
    );
}

export default App;
