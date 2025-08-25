import React, { Component } from 'react';
import { Redirect, Route } from "react-router";
import axiosInstance from '../axios';
class Import extends Component{

    constructor(props) {
        super(props)
  
          this.state = {
              
            image : "",
          
          }
      }
      // filenamehandler = (event) => {
      //   this.setState({
      //       filename: event.target.value
      //   })

      //   const db = document.getElementById("file").files;
      //   console.log(db)

      //   }
      onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({image: e.target.result});
            const data =  e.target.result;
            const config = {
              headers: { 'content-type': 'multipart/form-data' }
             }
  
     axiosInstance.post(`image/`, {image:data,config})
       .then(res => {
          console.log(res.data + 'this is data after api call');
       })
       .catch(err => console.log(err));
          };
          reader.readAsDataURL(event.target.files[0]);
        }
        
      }


      render(){
        console.log(this.state.filename)
        return(
            <div class="form-group">
                <label> username </label><br></br>
                <input type="file" onChange={this.onImageChange} className="filetype" id="group_image"/>
                <img id="target" src={this.state.image}/>
                </div>
            
        )
      }
}
export default Import;