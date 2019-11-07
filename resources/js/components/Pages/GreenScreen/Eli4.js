import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    this.Download = this.Download.bind(this);
  }

  computeframe() {
    this.ctx1.drawImage(this.capture, 0, 0, this.width, this.height);
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
    this.ctx2.globalCompositeOperation="destination-over";
    this.ctx2.drawImage(document.getElementById('background'), 0, 0, this.width, this.height);
  }

  Download(){
     window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
            console.log(msg);
        },
        function(err){
            console.log(err);
        },
        this.c2
    );
  }

  timerCallback() {
    if (this.capture.ended) {
      this.recoder.stop;
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
          this.c3 = document.getElementById('c3')
          var options = {
            cameraFacing: 'front',
            use: 'data',
          };
           window.plugin.CanvasCamera.initialize(this.c3);
           window.plugin.CanvasCamera.start(options, function(error) {
            console.log('[CanvasCamera start]', 'error', error);
          }, function(data) {
            document.getElementById('background').src='data:image/png;base64,' + data.image.src;
          });
        }else{
          let opcionesDeCamara = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPG,
          mediaType: Camera.MediaType.PICTURE,
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
     this.capture = this.refs.capture;
     let url = mediaFiles[0].localURL
     this.capture.src=mediaFiles[0].localURL;
     this.capture.play()
     this.c1 = this.refs.c1;
     this.ctx1 = this.c1.getContext("2d");
     this.ctx2 = this.c2.getContext("2d");
     

     this.capture.addEventListener('loadedmetadata', (e) => {
      console.log(e)
        this.width = this.capture.videoWidth;
        this.height = this.capture.videoHeight;
        this.recorder = new CanvasRecorder(this.c2);
        this.recorder.start();
        this.timerCallback()
});
     
      }

  Image(imagenCodificada) {
     this.capture = document.getElementById('capture');
     document.getElementById('capture').src = 'data:image/png;base64,' + imagenCodificada;
     this.c1 = this.refs.c1;
     this.ctx1 = this.c1.getContext("2d");
     this.c2 = this.refs.c2;
     this.c3 = document.getElementById('effect');
     this.ctx2 = this.c2.getContext("2d");
     this.width = document.getElementById('capture').width;
     this.height = document.getElementById('capture').height;

     this.timerCallback()
     
      }
  

  render() {
    let  background = "images/chroma/background/"+(store.getState().chroma.background)+".jpg"
    return(
    <div className="abs-center row">
      <div className="container md-3">

        
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
        onClick={this.Video}
        style={{
          backgroundSize: "", 
          backgroundRepeat:"no-repeat",
          width: '100%',
          height: '300px',
        }}
      >
      </canvas>
      <img 
        id="background"
        src={background}
        width="100px"
        height="100px"
        style={{
          display: 'none',
        }}
        />
      {this.state.typeCamera == 'video' ? 
        <canvas
        id="c3"
        onClick={this.Video}
        style={{
          backgroundSize: "", 
          backgroundRepeat:"no-repeat",
          width: '100%',
          height: '300px',
        }}
      >
      </canvas> : 
      <img 
        crossOrigin="Anonymous" 
        id="capture"
        
        style={{
          width: '100%',
          height: '200px',
          visibility: 'hidden',
          }}
        />

    }
      
      {this.state.effect ? <this.Effect /> : ''}
      <div className="container text-center">
        <Link to="/green-step-3">
            <button
                type="button"
                className= {"btn btn-gris"}
            >
               Volver
            </button>
        </Link>
      </div> 
      <div className="container text-center">
              <button
                  type="button"
                  onClick={this.Download}
                  className= {"btn btn-rojo"}
              >
                 Descargar
              </button>
      </div>
      </div>      
    </div>
    );
  }
}