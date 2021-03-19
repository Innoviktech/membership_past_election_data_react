import React, { Component } from 'react';
import { Redirect, Route } from "react-router";
import axiosInstance from '../axios';
class Import extends Component{

    constructor(props) {
        super(props)
  
          this.state = {
              
            filename : "",
          
          }
      }
      filenamehandler = (event) => {
        this.setState({
            filename: event.target.value
        })
        const db = document.getElementById("file").files;
        console.log(db)
        }


      render(){
        console.log(this.state.filename)
        return(
            <div class="form-group">
                <label> username </label><br></br>
                <input type="file" name="file" id="file" value={this.state.filename} onChange={this.filenamehandler} required></input><br></br>
                </div>
        )
      }
}
export default Import;