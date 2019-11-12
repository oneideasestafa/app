import React, { Component } from "react";
import { connect } from 'react-redux';
import { chromaTypeCamera } from '../../../redux/actions/chroma/index';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./../../../../css/pages/ChromaBackground.css"

	export class Eli extends Component {
		constructor(props) {
			super(props);
			this.state = {
				camera: '',
				};
		
		this.handleClick = this.handleClick.bind(this);	
	};

	handleClick (type) {
		this.props.chromaTypeCamera(type);
		this.props.history.push('green-step-2');
	}

	render() {
		return (<div className="abs-center row">
					<div className="container text-center">
						<h3>Seleccione Foto o Video</h3>
					</div>
					<div className="container">
						<div className="row">
							<div className="mx-auto mb-2">
                <FontAwesomeIcon 
                  icon="video" 
                  size="4x" 
                  className="redBorder mr-5"
                  onClick={() => this.handleClick('video')}
                />
                <FontAwesomeIcon 
                  icon="camera" 
                  size="4x" 
                  className="redBorder ml-5"
                  onClick={() => this.handleClick('camara')}
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