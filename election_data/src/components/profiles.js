import React, { Component } from 'react';
import { BiHide} from "react-icons/bi";
import axiosInstance from '../axios';

class Profiles extends React.Component{
    constructor(props)
  {
      super(props);
      this.state = {
       
        change_password : true,
        password_Change : "",
        
        profile : true,
         
      }
  }

    show_password = ()=>{
		const  x=  document.getElementById("password")
		
		  if(x.type === "password"){
			 x.type="text"
		  }
		  else{
			  x.type="password"
		  }

	}

    password_onChange = (event)=>{
    
    
        this.setState({
          password_Change : event.target.value
            })
            
                
    }

    password_submit = ()=>{
        const username = localStorage.getItem('username')
          this.setState({
            username
          })
      
          const change = this.state.password_Change
            axiosInstance.post(`change_password/`,{
      
                       key1 : username,key2 : change
                   })
                   .then(res => {
                    const alerts = res.data
                    alert(alerts)
      
                  })
      
      }
    render(){
        return(
          
                <div className="row signup-form" hidden={this.state.change_password}>
    <form>
      
        <div className="form-group">
                 {/* <label className="text-center">Change Password </label><br></br> */}
                <input type="password" name="password" id="password" onChange={this.password_onChange} placeholder="Enter Your New Password" required autoComplete="off"></input><button onClick={this.show_password}> <BiHide /></button><br></br>
                </div>
                <div className="form-group">
                <button value="submit" onClick={this.password_submit}>Submit</button>
                <button onClick={this.cancel}>cancel</button>
                </div>
               
                </form>
				</div>
       

            
        )
    }
}
export default Profiles