import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from "sweetalert2";

library.add( faSync);

export default class CambiarClave extends Component {

    constructor() {
        super();
        this.state = {
            oldpassword: '',
            newpassword: '',
            repeatpassword: '',
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        let self = this;

        self.setState({
            isLoading: true
        });

        let {oldpassword, newpassword, repeatpassword} = this.state;

        axios.post('/ajax-post-cambiar-clave', { oldpassword, newpassword, repeatpassword })
            .then(res => {

                self.setState({
                    isLoading: false
                });

                let r = res.data;

                if(r.code === 200){

                    self.setState({
                        oldpassword: '',
                        newpassword: '',
                        repeatpassword: ''
                    });

                    swal({
                        title: '<i class="fa fa-check-circle"></i>',
                        text: r.msj,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok'
                    });

                }else if(r.code === 500){

                    swal({
                        title: '<i class="fas fa-exclamation-circle"></i>',
                        text: r.msj,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok'
                    });

                }else if(r.code === 600){

                    swal({
                        title: '<i class="fas fa-exclamation-circle"></i>',
                        text: r.msj,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok'
                    });
                }

            })
            .catch(function (error) {

                if (error.response.status == 422){

                    self.setState({
                        isLoading: false
                    });

                    swal({
                        title: '<i class="fas fa-exclamation-circle"></i>',
                        text: error.response.data,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok'
                    });
                }

            });
    }

    render() {

        let {oldpassword, newpassword, repeatpassword} = this.state;

        return (
            <div>

                <form method="POST" onSubmit={this.handleSubmit} className="form-inside">

                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-key fa-lg"></i>
                        </div>
                        <input type="password" id="oldpassword" name="oldpassword" value={oldpassword} onChange={this.handleChange} className="form-control" placeholder="Ingrese su password actual" />
                    </div>

                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-key fa-lg"></i>
                        </div>
                        <input type="password" id="newpassword" name="newpassword" value={newpassword} onChange={this.handleChange} className="form-control" placeholder="Ingrese su nuevo password" />
                    </div>

                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <i className="fa fa-key fa-lg"></i>
                        </div>
                        <input type="password" id="repeatpassword" name="repeatpassword" value={repeatpassword} onChange={this.handleChange} className="form-control" placeholder="Confirme nuevo password" />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-negro black btn-box-index">
                            { this.state.isLoading ? <FontAwesomeIcon icon="sync" size="lg" spin /> : '' }
                            &nbsp;&nbsp; Cambiar</button>
                    </div>

                </form>

            </div>
        );
    }
}

if (document.getElementById('cambiar-clave')) {
    ReactDOM.render(<CambiarClave />, document.getElementById('cambiar-clave'));
}
