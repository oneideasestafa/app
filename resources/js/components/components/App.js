import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Ingreso from "../Pages/Ingreso";
import Login from "../Pages/Login";
import Registro from "../Pages/Registro";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Ingreso} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
