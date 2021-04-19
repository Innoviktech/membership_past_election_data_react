import React, { Component } from 'react';
import { BiHide} from "react-icons/bi";
import axiosInstance from '../axios';
import {BrowserRouter as Router,Link,Switch,Route, Redirect} from 'react-router-dom';

import { event } from 'jquery';

class Profiles extends React.Component{
    constructor(props)
  {
      super(props);
      this.state = {
        uname : "",
        oldPasswordWizard : true,
        newPasswordWizard : true,
        password_Change : "",
        username : "",
        profile : true,
        referrer : null,
        oldPassword : "",
         
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
 

}


show_password1 = (event)=>{
  const  x=  document.getElementById("password1")
  
    if(x.type === "password"){
       x.type="text"
    }
    else{
        x.type="password"
    }


}


change_password = ()=>{
   
    this.setState({
      oldPasswordWizard:false
    })
  
  }

  oldPassword_onChange = (event)=>{
    const oldPassValue = event.target.value
     this.setState({
       oldPassword : oldPassValue,
      
     })
     console.log(oldPassValue)
  }
  newPassword_onChange = (event)=>{
    
    
    this.setState({
      password_Change : event.target.value
        })
        
            
}

old_password_submit = (event)=>{
  const username = localStorage.getItem('username')
  const oldPassword = this.state.oldPassword
  console.log(username)
  console.log(oldPassword)
  event.preventDefault()
  axiosInstance.post(`oldPasswordCheck/`,{
    key1 : username, key2 : oldPassword
  })
  .then(res=>{
    const result = res.data
    if(result== true)
    {
      this.setState({
        newPasswordWizard : false,
        oldPasswordWizard : true,
      })
    }
    else{
      alert ("Please Enter a Correct Password")
    }
  
  })
 
}
password_submit = (event)=>{
    const username = localStorage.getItem('username')
      this.setState({
        username
      })
  

      const confirm =  window.confirm("Do You Want to Change This Password")
      if(confirm == true)
      {
      const change = this.state.password_Change
      axiosInstance.post(`change_password/`,{
  
                   key1 : username,key2 : change
               })
               .then(res => {
                const alerts = res.data
                alert(alerts)
                this.setState({
                  newPasswordWizard : true
                })
                
                document.getElementById("password").value=""
                
              })  }
              event.preventDefault()
              
            }


  cancel = (event)=>{
    this.setState({
      newPasswordWizard:true,
      newPassword_onChange : "",
      
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
 logout = (event)=>{
  const confirm =  window.confirm("Do You Want to logout")
  if(confirm == true){
    this.setState({
      referrer : true
  })
  }
  // event.preventDefault();
 }
    render(){
      //console.log(this.state.referrer)
      const {referrer} = this.state;
        if (referrer) return <Redirect to="/login" />;
        return(
          
                    
           <div >
             {/* <div className="row">
               <div className="col-sm-10 text-right prof_cancel">
               <span class="close text-right" onClick={this.span} hidden={this.state.span}>&times;</span>
               </div>
             

             </div> */}
             
              <div className="row">
                    <div className="col-sm-12 menuss text-right" ><span onClick={this.change_password}>Change Password</span></div>
                    </div> 

                    
                    <div className="row">
                    <div className="col-sm-12 logout text-right"><a><Link to="/logout">Logout</Link></a></div>
                   
                    </div>

                    <div className="row forgotPassword" hidden={this.state.oldPasswordWizard}>
    
                <form onSubmit={this.old_password_submit}>              
                <div ><h3>Change Password</h3></div>
              
                <div className="change_password_input"><input type="password" name="password" id="password" onChange={this.oldPassword_onChange} placeholder="Enter Your Old Password" required autoComplete="off"></input><span onClick={this.show_password}> <BiHide /></span></div>
                        <div className="row oldpass_change ">
                        <button className="next " value="submit" >Next</button>
                       
                           
                        </div>
                </form>   
                  </div>


                    <div className="row forgotPassword" hidden={this.state.newPasswordWizard}>
    
                <form onSubmit={this.password_submit}>              
                <div ><h3>Change Password</h3></div>
              
                <div className="change_password_input"><input type="password" name="password" id="password1" onChange={this.newPassword_onChange} placeholder="Enter Your New Password" required autoComplete="off"></input><span onClick={this.show_password1}> <BiHide /></span></div>
                        <div className="row newpass_change ">
                        <button  className="cancel"  onClick={this.cancel}>cancel</button>
                        <button className="submit" value="submit" >Submit</button>
                       
                           
                        </div>
                </form>   
                  </div>
                
                </div> 
           )
    }
}
export default Profiles