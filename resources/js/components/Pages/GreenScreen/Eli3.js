import React, { Component } from "react";
import { connect } from 'react-redux';
import { chromaEffect } from '../../redux/actions/ChromaStudios/index';
import { Link } from "react-router-dom";
import Efecto from "../../../../public/images/chroma/effect/efecto.png";

import "./../../../css/pages/ChromaBackground.css"

	class Eli3 extends Component {

		constructor(props)  {
				super(props);
				this.state = {
					effect: "",
				}
			this.handleClick = this.handleClick.bind(this);	
			}

		handleClick (e) {
			
			this.setState({
  		         effect: e.target.name
  		     });
			setTimeout(function () {
		  		const chromaEffect = this.state.effect;
				this.props.chromaEffect({ chromaEffect })
			}.bind(this), 1000)
		}

		componentDidMount () {
  }

		render() {
			return (<div className="abs-center row">
						<div className="container text-center">
							<h3>Seleccione Efecto</h3>
						</div>
						<div className="container">
							<div className="row">
								<div className="mx-auto mb-2" style={{paddingLeft: '25px'}} >
									<img className="fa fa-video redBorder"
										src={Efecto} 
										name="efecto" 								
										width="150px"
										height="120px" 
										style={{padding: '5px'}} 
										onClick={this.handleClick}

									 />
								</div>
							</div>
						</div>
						<div className="container text-center">
  		                     <Link to="/green-step-4">
  		                         <button
  		                             type="button"
  		                             className= {"btn " + (this.state.effect ? 'btn-rojo' : 'btn-gris')}
  		                         >
  		                            {this.state.effect ? 'Siguiente' : 'omitir'}
  		                         </button>
  		                     </Link>
  		                 </div>
					</div>


					);
		}
}

function mapDispatchToProps(dispatch) {
		  return {
		    chromaEffect: effect => dispatch(chromaEffect(effect))
		  };
	}

export default connect(null, mapDispatchToProps)(Eli3);