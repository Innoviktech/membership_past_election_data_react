import React from 'react';

import axiosInstance from '../axios';
class Register extends React.Component{

    constructor(props) {
        super(props)
  
          this.state = {
              
              email : "",
              password : "",
              username : "",

          }
        }
    
    usernamehandler = (event) => {
        this.setState({
            username: event.target.value
        })
        }
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
        }

    emailhandler = (event) => {
        this.setState({
            email: event.target.value
        })

    }
    handleSubmit = (event) => {
       
        const value1 = this.state.username
        const value2= this.state.email
        const value3 = this.state.password

        axiosInstance.post(`create/`, {
          username:value1, password:value3, email:value2
        })
        .then((testing) => {
            window.location = './login';
        });
            event.preventDefault()
          }

    render()
    {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <div >
                <label> Username </label><br></br>
                <input type="text" name="username" value={this.state.username} onChange={this.usernamehandler} placeholder="enter Your username" required></input><br></br>
                </div>
                <div >
                <label> Email </label><br></br>
                <input type="email" name="email" value={this.state.email} onChange={this.emailhandler} placeholder="enter admin login email" required></input><br></br>
                </div>
                <div >
                <label> Password </label><br></br>
                <input type="password" name="password" value={this.state.password} onChange={this.passwordhandler} placeholder="enter password" required></input><br></br>
                </div>
                <div>
                    <button>Signup</button>
                </div>
                </form>
            </div>
        );
    }
}
export default Register;