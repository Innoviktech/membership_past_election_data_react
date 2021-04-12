import React, { Component } from 'react';
import { BiHide} from "react-icons/bi";
import axiosInstance from '../axios';
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom';

class Profiles extends React.Component{
    constructor(props)
  {
      super(props);
      this.state = {
        uname : "",
        change_password : true,
        password_Change : "",
        username : "",
        profile : true,
         
      }
  }
  componentDidMount() {
    document.getElementById("menus").style.display = "none";
   const  uname = localStorage.getItem('uname')
    this.setState({uname})
    console.log(uname)
    
 
  }
  show_password = (event)=>{
    const  x=  document.getElementById("password")
    
      if(x.type === "password"){
         x.type="text"
      }
      else{
          x.type="password"
      }
  event.preventDefault()

}
change_password = ()=>{
   
    this.setState({
      change_password:false
    })
  
  }
  password_onChange = (event)=>{
    
    
    this.setState({
      password_Change : event.target.value
        })
        
            
}
password_submit = (event)=>{
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
              event.preventDefault()
            }


  cancel = (event)=>{
    this.setState({
      change_password:true,
      password_Change : "",
      
    })
    document.getElementById("password").value = ""
    event.preventDefault()
  }


  
  profile = ()=>{
    this.setState({
      profile: false
    })
  }


  toggleButton = () => {
    var val1 = document.getElementById("myTopnav")
    if (val1.className == "topnav") {
      val1.className += "responsive";
      // alert('yes')
    } else {
      val1.className = "topnav";
      // alert('no')
    }
}

    
    render(){
        return(
          
                    
           <div >
              <div className="row">
                    <div className="col-sm-12 menuss text-right" ><span onClick={this.change_password}>Change Password</span></div>
                    </div> 

                    {/* <div className="row">
                    <div className="col-sm-12 uname text-right">welcome,<span> {this.state.uname}</span></div>
                    </div> */}


                    <div className="row">
                    <div className="col-sm-12 logout text-right"><a ><Link to="/logout/">Logout</Link></a></div>
                    </div>


                    <div className="row signup-form" hidden={this.state.change_password}>
    <form>
      {/* <div className="col-sm-6"> */}
        <div className="form-group">
                 {/* <label className="text-center">Change Password </label><br></br> */}
                <input type="password" name="password" id="password" onChange={this.password_onChange} placeholder="Enter Your New Password" required autoComplete="off"></input><button onClick={this.show_password}> <BiHide /></button><br></br>
                </div>
                <div className="form-group">
                <button value="submit" onClick={this.password_submit}>Submit</button>
                <button onClick={this.cancel}>cancel</button>
                </div>
                {/* </div> */}
                </form>
				</div>
                </div> 
           )
    }
}
export default Profiles