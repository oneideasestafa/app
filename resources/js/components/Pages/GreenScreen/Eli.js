import React, { Component } from "react";
import { connect } from 'react-redux';
import { chromaTypeCamera } from '../../../redux/actions/chroma/index';
import { Link } from "react-router-dom";

import "./../../../../css/pages/ChromaBackground.css"

	export class Eli extends Component {
		constructor(props) {
			super(props);
			this.state = {
				camera: '',
				};
		
		this.handleClick = this.handleClick.bind(this);	
	};

	ButtonNext() {
		return(
			<Link to="/green-step-2">
                <button
                    type="button"
                    className="btn btn-rojo"
                >
                   Siguiente
                </button>
            </Link>
			);
	}

	handleClick (e) {
		
		this.setState({
            camera: e.target.id
        });
        setTimeout(function () {
		  	const typeCamera = this.state.camera;
		  	this.props.chromaTypeCamera({ typeCamera })
		}.bind(this), 1000)
		

	}

	render() {
		return (<div className="abs-center row">
					<div className="container text-center">
						<h3>Seleccione Foto o Video</h3>
					</div>
					<div className="container">
						<div className="row">
							<div className="mx-auto mb-2">
								<i className="fa fa-video redBorder"
								id="video"
								style={{fontSize : '100px', paddingRight: '40px'}}
								onClick={this.handleClick}
								 />
								 <i className="fa fa-camera redBorder"
								 id="camara"
								 style={{fontSize : '100px'}}
								 onClick={this.handleClick}
								 />
							</div>
						</div>
					</div>
					<div className="container text-center">
                        {this.state.camera ? < this.ButtonNext /> : ''}
                    </div>
				</div>


				);
	};

	
	
	}

	function mapDispatchToProps(dispatch) {
		  return {
		    chromaTypeCamera: camera => dispatch(chromaTypeCamera(camera))
		  };
	}

export default connect(null, mapDispatchToProps)(Eli);