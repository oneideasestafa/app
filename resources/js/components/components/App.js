import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Ingreso from "../Pages/Ingreso";
import Login from "../Pages/Login";
import Registro from "../Pages/Registro";
import QuestionEvent from "../Pages/QuestionEvent";
import Inicio from "../Pages/Inicio";

function App() {
    return (
        <BrowserRouter>
            <Switch>
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
