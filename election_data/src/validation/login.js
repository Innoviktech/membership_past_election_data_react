import React, { Component } from 'react';
import { Redirect, Route } from "react-router";
import axiosInstance from '../axios';
class Login extends Component{

    constructor(props) {
        super(props)
  
          this.state = {
              
              username : "",
              password: "",
              
          }
      }

      passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
        }

    usernamehandler = (event) => {
        this.setState({
            username : event.target.value
        })

    }

    handleSubmit = (event) => {
       
        const value1 = this.state.username
        
        const value2 = this.state.password

        axiosInstance
			.post(`api/token/`, {
				username: value1,
				password: value2,
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
                window.location = './home';
			console.log(localStorage)	
			});
              event.preventDefault()
            }

    render(){
        
        return(
            <div>
                
                <form onSubmit={this.handleSubmit}>
                <div >
                <label> username </label><br></br>
                <input type="text" name="username" value={this.state.username} onChange={this.usernamehandler} placeholder="enter username" required></input><br></br>
                </div>
                <div >
                <label> Password </label><br></br>
                <input type="password" name="password" value={this.state.password} onChange={this.passwordhandler} placeholder="enter password" required></input><br></br>
                </div>
                <div>
                    <button>Signin</button>
                </div>
                </form>
            </div>
        )
    }
}
export default Login;