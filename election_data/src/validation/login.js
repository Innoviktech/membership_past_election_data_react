// import React, { Component } from 'react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import { Redirect, Route } from "react-router";
import {BrowserRouter as Router,Link,Switch,Route,Redirect} from 'react-router-dom';
import axiosInstance from '../axios';
import { BiHide} from "react-icons/bi";
// class Login extends Component{

//     constructor(props) {
//         super(props)
  
//           this.state = {
              
//               username : "",
//               password: "",
              
//           }
//       }

//       passwordhandler = (event) => {
//         this.setState({
//             password: event.target.value
//         })
//         }

//     usernamehandler = (event) => {
//         this.setState({
//             username : event.target.value
//         })

//     }

//     handleSubmit = (event) => {
//         // const history = useHistory();
//         const value1 = this.state.username
        
//         const value2 = this.state.password

//         axiosInstance
// 			.post(`login/`, {
// 				username: value1,
// 				password: value2,
// 			})
// 			.then((res) => {
// 				localStorage.setItem('access_token', res.data.access);
// 				localStorage.setItem('refresh_token', res.data.refresh);
//                 localStorage.setItem('role', res.data.role);
// 				axiosInstance.defaults.headers['Authorization'] =
// 					'JWT ' + localStorage.getItem('access_token');
//                 window.location = './home';
                

// 			console.log(localStorage)
//             console.log(res.data)
// 			});
//               event.preventDefault()
//             }

//     render(){
        
//         return(
//             <div  class="signup-form">
                
//                 <form onSubmit={this.handleSubmit}>
//                 <h2>Login</h2>
//                 <p>Please fill in this form to login an account!</p>
//                 <hr></hr>
//                 <div class="form-group">
//                 <label> username </label><br></br>
//                 <input type="text" name="username" value={this.state.username} onChange={this.usernamehandler} placeholder="enter username" required></input><br></br>
//                 </div>
//                 <div class="form-group">
//                 <label> Password </label><br></br>
//                 <input type="password" name="password" value={this.state.password} onChange={this.passwordhandler} placeholder="enter password" required></input><br></br>
//                 </div>
//                 <div class="form-group">
//                     <button>Login</button>
//                 </div>
//                 </form>
//             </div>
//         )
//     }
// }
// export default withRouter(Login);

export default function Login() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		username: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`login/`, {
				username: formData.username,
				password: formData.password,
			})
			// .catch((error)=>{
			// 	console.log(error.response.status)
			// }) 
			.then((res) => {
				// console.log(res.data.detail)
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				localStorage.setItem('role', res.data.role);
				localStorage.setItem('uname', res.data.uname);  
				localStorage.setItem('user',res.data.user);
				localStorage.setItem('username',res.data.username);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				// history.push('/home');
				//console.log(res);
				//console.log(res.data);
                history.push({
                    pathname: '/home',
                    appState: {
                      role_id : res.data.role
                    }
                  });
			})
			.catch((error)=>{
				console.log(error.response.status)
				alert('Invalid Username Password')
			}) 
			
	};
	function show_password (){
		const  x=  document.getElementById("password")
		
		  if(x.type === "password"){
			 x.type="text"
		  }
		  else{
			  x.type="password"
		  }

	}

	// const classes = useStyles();

    return (
        <div  class="signup-form images">
			
                
               <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                 <p>Please fill in this form to login an account!</p>
                 <hr></hr>
                 <div class="form-group login_input">
                 <label> username </label><br></br>
                 <input type="text" name="username" id="username" onChange={handleChange} placeholder="Enter username" required autoComplete="off"></input><br></br>
                 </div>
                 <div class="form-group login_input">
                 <label> Password </label><br></br>
                <input type="password" name="password" id="password" onChange={handleChange} placeholder="Enter password" required autoComplete="off"></input><spans onClick={show_password}> <BiHide /></spans>
				</div>
				 {/* <div class="form-group">                                                                  
                <input type="checkbox" onClick={show_password}></input><label>Show password</label>
                </div><br></br> */}
				<div className="row">
                 <div className="form-group ">
                     <button className="login_btn">Login</button>
					 <a className="reg_click"><Link to="/register">For Register Click Here</Link></a><br></br>
					 {/* <a href='/register'>For Register Click Here</a> */}
                     </div>
                 </div>


				 <a href='http://3.139.183.87:9070/web#view_type=list&model=op.overall.summary&menu_id=143&action=149' target='_blank'>
                    Voters Overall Summary</a><br></br>
                <a href='http://3.139.183.87:9070/web#view_type=list&model=op.party.type&menu_id=140&action=146' target='_blank'>
                    Alliance Party - Candidate List</a><br></br>
                 <a href='/home/submenu/candidate/' target='_blank'>
                    Candidate List</a><br></br>
                 </form>
				 
             </div>
    );
}