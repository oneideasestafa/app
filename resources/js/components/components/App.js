import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

/**
 * A continuacion se importan todos los componentes que seran
 * utili ados como paginas y rutas del front end
 */
import Ingreso from "../Pages/Ingreso";
import Login from "../Pages/Login";
import Registro from "../Pages/Registro";
import QuestionEvent from "../Pages/QuestionEvent";
import Inicio from "../Pages/Inicio";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                {/**A continuacion se presentan todas las rutas registradas del front end
                asi como sus respectivos componentes renderi ados en cada una */}
                <Route exact path="/" component={Ingreso} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <Route exact path="/questionEvent" component={QuestionEvent} />
                <Route exact path="/inicio" component={Inicio} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
