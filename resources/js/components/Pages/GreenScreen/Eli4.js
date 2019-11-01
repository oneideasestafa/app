import React, { Component } from "react";
import store from './../../../redux/index';

export default class Eli4 extends Component {

	constructor(props) {
		super(props);
		this.state = {
          typeCamera: store.getState().chroma.camera,
          background: store.getState().chroma.background,
          effect: store.getState().chroma.effect,
    }
    
		this.Video = this.Video.bind(this); 
    this.Image = this.Image.bind(this); 
	}

	computeframe() {

    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    if (this.state.effect) {
      this.ctx1.drawImage(document.getElementById('effect'), 0, 0, this.width, this.height);
    }
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

  Effect () {
    let  effect = "images/chroma/effect/"+(store.getState().chroma.effect)+".png"
    return(
        <img 
        id="effect"
        src={effect}
        width="100px"
        height="100px"
        style={{
          display: 'none',
        }}
        />
      )
  }

  componentDidMount(){

        if(this.state.typeCamera == "video"){
           navigator.device.capture.captureVideo(this.Video, (error) => { alert(error)}, {limit: 1, duration: 15});
        }else{
          let opcionesDeCamara = {
          quality: 50,
          MediaType: Camera.MediaType.VIDEO,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: 1,
          encodingType: 1,
          correctOrientation: true
      };
      navigator.camera.getPicture(
        (imagenCodificada) => {
          this.Image(imagenCodificada);
        },
        (error) => {
          alert(error);
        }, opcionesDeCamara);
        }
      
  }

	Video(mediaFiles) {
    alert(mediaFiles[0].localURL);
     this.video = this.refs.video;
     this.video.src=mediaFiles[0].localURL;
     this.c1 = this.refs.c1;
     this.ctx1 = this.c1.getContext("2d");
     this.c2 = this.refs.c2;
     this.ctx2 = this.c2.getContext("2d");
     this.width = this.refs.video.videoWidth;
     this.height = this.refs.video.videoHeight;

     this.timerCallback()
     
      }

  Image(imagenCodificada) {
     this.video = document.getElementById('video');
     document.getElementById('video').src = 'data:image/png;base64,' + imagenCodificada;
     this.c1 = this.refs.c1;
     this.ctx1 = this.c1.getContext("2d");
     this.c2 = this.refs.c2;
     this.c3 = document.getElementById('effect');
     this.ctx2 = this.c2.getContext("2d");
     this.width = document.getElementById('video').width;
     this.height = document.getElementById('video').height;

     this.timerCallback()
     
      }
	

	render() {

		return(
		<div className="abs-center row">
			<div className="container">

				
			<canvas
        ref="c1"
        style={{
          backgroundSize: "", 
          backgroundRepeat:"no-repeat", 
          width: '100%',
          height: '200px',
          display: 'none',
        }}
      >
			</canvas>
			<canvas
        ref="c2"
        style={{
          backgroundImage: "url(images/chroma/background/" + this.state.background + ".jpg)", 
          backgroundSize: "", 
          backgroundRepeat:"no-repeat",
          width: '100%',
          height: '200px',
        }}
			>
			</canvas>
      {this.state.typeCamera == 'video' ? 
        <video
      src=""
      controls
      ref="video"
      type="mp4"
      ></video> : 
      <img 
        id="video"
        
        style={{
          width: '100%',
          height: '200px',
          visibility: 'hidden',
          }}
        />

    }
      
      {this.state.effect ? <this.Effect /> : ''}
			</div>			
		</div>
	  );
	}
}
