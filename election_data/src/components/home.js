import React, { Component } from 'react';
import Logout from '../validation/logout';
import ProtectedRoute from '../validation/ProtectedRouter';
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom';
import subMenu from './subMenu';
import Import from './import';
import { FaBars} from "react-icons/fa";
import { event, type } from 'jquery';
import { BiHide} from "react-icons/bi";
import axios from "axios";
import axiosInstance from '../axios';
import { CgProfile} from "react-icons/cg";
import Profiles from './profiles';
class Home extends Component{
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
  // componentWillReceiveProps = (props) =>{
  //   const val = props.appState.role_id;
  //   console.log(val);

    
  // }

  componentDidMount() {
    document.getElementById("menus").style.display = "none";
   const  uname = localStorage.getItem('uname')
    this.setState({uname})
    console.log(uname)
    
 
  }
    
  //  myfun = ()=> {
  //   var x = document.getElementById('myTopnav');
  //   if (x.className === 'toggle') {
  //     x.className += 'responsive';
  //   } else {
  //     x.className = 'toggle';
  //   }
  // }

  // my = ()=> {
  //   var x = document.getElementById('myTopnav');
  //   if (x.style.display === 'block') {
  //     x.style.display = "none";
  //   } else {
  //     x.style.display = "block";
  //   }
  // }

  // show_password = (event)=>{
	// 	const  x=  document.getElementById("password")
		
	// 	  if(x.type === "password"){
	// 		 x.type="text"
	// 	  }
	// 	  else{
	// 		  x.type="password"
	// 	  }
  //     event.preventDefault()

	// }

  // change_password = ()=>{
   
  //   this.setState({
  //     change_password:false
  //   })
  
  // }

//   password_onChange = (event)=>{
    
    
//     this.setState({
//       password_Change : event.target.value
//         })
        
            
// }

// password_submit = (event)=>{
//   const username = localStorage.getItem('username')
//     this.setState({
//       username
//     })

//     const change = this.state.password_Change
//       axiosInstance.post(`change_password/`,{

//                  key1 : username,key2 : change
//              })
//              .then(res => {
//               const alerts = res.data
//               alert(alerts)
              
//             })
//             event.preventDefault()


// }
// cancel = (event)=>{
//   this.setState({
//     change_password:true,
//     password_Change : "",
    
//   })
//   document.getElementById("password").value = ""
//   event.preventDefault()
// }

// profile = ()=>{
//   this.setState({
//     profile: false
//   })
// }

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
  render() {
  
    console.log(this.state.password_Change)
    //console.log(this.state.username)
    
  
    
  return (
     <div className="App">
     
     <Router>
     
      {/* <nav class="navbar navbar-default heading">
          <div class="container-fluid">
          <ul class="nav navbar-nav">
               
                <li className="nav-link heading menuss" ><a ><Link to="/home/submenu/">Election Data Management</Link></a></li>
                <li className="nav navbar-nav navbar-right menuss"><a ><Link to="/logout/">Logout</Link></a></li> 
          </ul>
          </div>
        </nav> */}

        <div className="row heading" >
          <div className = "topnav" id="myTopnav">
          {/* <div className="col-sm-1 icon" onClick={this.toggleButton}><span className="icon"><FaBars /></span></div> */}
         
        <div className="col-sm-8 toggles menuss " ><a><Link to="/submenu">Election Data Management</Link></a></div>
        <div className="col-sm-2 uname toggles">welcome<span> {this.state.uname}</span></div>
        <div className="col-sm-1 toggles text-right"><a><Link to = "/profile"><CgProfile /></Link></a></div>
      
          
          {/* <div className="col-sm-2 menuss toggles" ><span onClick={this.change_password}>Change Password</span></div>
          <div className="col-sm-2 uname toggles">welcome,<span> {this.state.uname}</span></div>
          <div className="col-sm-2 logout toggles"><a ><Link to="/logout/">Logout</Link></a></div>  */}
          
        </div>
        </div><br></br><br></br>

        
         <div className="row profiles" hidden={this.state.profile}>

    {/* <div className="row">
    <div className="col-sm-12 menuss" ><span onClick={this.change_password}>Change Password</span></div>
    </div>  */}

    {/* <div className="row">
    <div className="col-sm-12 uname">welcome,<span> {this.state.uname}</span></div>
    </div> */}

    
    {/* <div className="row">
    <div className="col-sm-12 logout"><a ><Link to="/logout/">Logout</Link></a></div>
    </div> */}
      
				</div> 
        {/* <div className="row">
         
          
          <div className="col-sm-11 text-right logout"><a ><Link to="/logout/">Logout</Link></a></div> 
         
         
        </div><br></br> */}

      <Switch>
        
        <ProtectedRoute>
          <Route path="/submenu" component={subMenu} />
          {/* <Route path="/home/import" component={Import} />   */}
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profiles} />
          
        </ProtectedRoute>
        
      </Switch>
    </Router> 



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

  );
  }
}

export default Home;