// import React, { Component } from 'react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import { Redirect, Route } from "react-router";
import {BrowserRouter as Router,Link,Switch,Route,Redirect} from 'react-router-dom';
import axiosInstance from '../axios';
import { BiHide} from "react-icons/bi";
function Login() {
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
                    pathname: '/',
                    // appState: {
                    //   role_id : res.data.role
                    // }
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
				 

				<div className="row">
					 <div className="form-group">
						 <a><Link to="/forgotPassword">Forgot Password..?</Link></a>

					 </div>

				 </div>
				 
				<div className="row">
                 <div className="form-group ">
                     <button className="login_btn">Login</button>
					 <span className="reg_click"><Link to="/register">For Register Click Here</Link></span><br></br>
					
                     </div>
                 </div>

				

				 <a href='http://3.139.183.87:9070/web#view_type=list&model=op.overall.summary&menu_id=143&action=149' target='_blank'>
                    Voters Overall Summary</a><br></br>
                <a href='http://3.139.183.87:9070/web#view_type=list&model=op.party.type&menu_id=140&action=146' target='_blank'>
                    Alliance Party - Candidate List</a><br></br>
                 <a href='/candidates' target='_blank'>
                    Candidate List</a><br></br>
                 </form>
				 
             </div>
    );
}
export default Login