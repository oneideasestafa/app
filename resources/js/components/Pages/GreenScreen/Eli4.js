import React, { Component } from "react";
import store from './../../redux/index';

export default class Eli4 extends Component {

	constructor(props) {
		super(props);
		this.state = {

    }
    
		this.ChromaPaint = this.ChromaPaint.bind(this);	
	}

	computeframe() {

    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
    let l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
        
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];

        if (g > r && g > b)
        {
            if (g > 80 && g > r + 6 && g > b + 6) {
                frame.data[i * 4 + 3] = 0;
            }
        }
            
    }
    this.ctx2.putImageData(frame, 0, 0);
    return;
  }

	timerCallback() {

    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeframe();
    let self = this;
    setTimeout(function () {
        self.timerCallback();
      }, 0);

  }

	ChromaPaint() {
	   this.video = this.refs.video;
 	   this.c1 = this.refs.c1;
 	   this.ctx1 = this.c1.getContext("2d");
 	   this.c2 = this.refs.c2;
 	   this.ctx2 = this.c2.getContext("2d");
 	   this.width = this.refs.video.videoWidth;
 	   this.height = this.refs.video.videoHeight;

 	   this.timerCallback()
 	   
 	   	}
	

	render() {
	const background = "images/"+(store.getState().chromaStudios.background.chromaBackground)+".jpg"
	const effect = "images/"+(store.getState().chromaStudios.effect.chromaEffect)+".png"
	console.log(effect+' '+background)

		return(
		<div className="abs-center row">
			<div className="container">
				<video 
			ref="video"
			src="images/travolta.mp4"
			autoPlay
			muted
			onPlay={this.ChromaPaint}
			></video>

			<canvas
			ref="c1"
			style={{backgroundSize: "contain", backgroundRepeat:"no-repeat", display: "none"}}
			>
			</canvas>

			<canvas
			ref="c2"
			style={{backgroundImage: "url(" + background + ")", backgroundSize: "contain", backgroundRepeat:"no-repeat"}}
			>
			</canvas>
			</div>
			
		</div>
			);
	}
}