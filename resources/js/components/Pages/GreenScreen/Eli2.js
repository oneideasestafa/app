import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { chromaBackground } from '../../../redux/actions/chroma/index';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import Canvas from "../../../../../public/images/chroma/background/canvas.jpg";
import Ocean from "../../../../../public/images/chroma/background/ocean.jpg";
import Moon from "../../../../../public/images/chroma/background/moon.jpg";
import Desert from "../../../../../public/images/chroma/background/desert.jpg";

	class Eli2 extends Component {
		constructor(props) {
			super(props);
			this.state = {
				background: "",
			}

		this.handleClick = this.handleClick.bind(this);	
		}

		handleClick (e) {
		
		this.setState({
            background: e.target.name
        });
        setTimeout(function () {
		  	const chromaBackground = this.state.background;
			this.props.chromaBackground({ chromaBackground })
		}.bind(this), 1000)
	}

		ButtonNext() {
		return(
			<Link to="/green-step-3">
                <button
                    type="button"
                    className="btn btn-rojo"
                >
                   Siguiente
                </button>
            </Link>
			);
	}

		render() {
			return (<div className="abs-center row">
					<div className="container text-center">
						<h3>Seleccione Fondo</h3>
					</div>
					<div className="container">
						<div className="row">
							<div className="mx-auto mb-2" style={{paddingLeft: '25px'}} >
								<img className="fa fa-video redBorder"
									src={Canvas} 
									name="canvas" 								
									width="150px"
									height="120px" 
									style={{padding: '5px'}} 
									onClick={this.handleClick}

								 />
								 <img className="fa fa-video redBorder"
									src={Moon} 
									width="150px"
									height="120px" 
									name="moon" 	
									style={{padding: '5px'}} 	
									onClick={this.handleClick}						
								 />
								 <img className="fa fa-video redBorder"
									src={Ocean} 
									width="150px"
									height="120px" 
									name="ocean" 	
									style={{padding: '5px'}} 
									onClick={this.handleClick}							
								 />
								 <img className="fa fa-video redBorder"
									src={Desert} 
									width="150px"
									height="120px" 
									name="desert" 	
									style={{padding: '5px'}} 
									onClick={this.handleClick}							
								 />
							</div>
						</div>
					</div>
					<div className="container text-center">
                        {this.state.background ? < this.ButtonNext /> : ''}
                    </div>
				</div>


				);
		}
	}

	function mapDispatchToProps(dispatch) {
		  return {
		    chromaBackground: background => dispatch(chromaBackground(background))
		  };
	}

export default connect(null, mapDispatchToProps)(Eli2);