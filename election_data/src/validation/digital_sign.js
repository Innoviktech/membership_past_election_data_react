import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SignaturePad from 'react-signature-canvas';
import axiosInstance from '../axios';

class Digital_sign extends Component {
  constructor(props) {
    super(props)

      this.state = {
          
          image: "",
      }
    }

    state = {trimmedDataURL: null}
    sigPad = {}
    clear = () => {
      this.sigPad.clear()
    }
    trim = () => {
      this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
        .toDataURL('image/png')})
    }

    onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({image: e.target.result});
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      const vars = this.state.image;
      axiosInstance.post(`image/`, {
       image:vars
      })
      .then((testing) => {
         
      });
    }

    render () {
      let {trimmedDataURL} = this.state
      return( <div className={"container"}>
        <div className={"sigContainer"}>
          <SignaturePad canvasProps={{className: "sigPad"}}
            ref={(ref) => { this.sigPad = ref }} />
        </div>
        <div>
          <button className={"buttons"} onClick={this.clear}>
            Clear
          </button>
          <button className={"buttons"} onClick={this.trim}>
           Save
          </button>
        </div>
        {trimmedDataURL
          ? <img className={"sigImage"}
            src={trimmedDataURL} />
          : null}
          <div>
            <input type="file" onChange={this.onImageChange} className="filetype" id="group_image"/>
          </div>
          <div>
          <img id="target" src={this.state.image}/>
          {/* <embed id="target" src={this.state.image} type="application/pdf"   height="700px" width="500"></embed> */}
          </div>
       </div>
      )
      
    }
  }
  
 export default Digital_sign;