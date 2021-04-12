import { event } from 'jquery';
import React, { useState } from 'react';
import { BiHide} from "react-icons/bi";
class Forgotpassword extends React.Component{
    constructor(props){
        super(props);
    this.state = {
        
        mail_wizard : false,
        OTP_wizard : true,
        new_pass_wizard : true,
        prev : true,
        input1Change : "",
        input2Change : "",
        input3Change : "",
        input4Change : "",
        input5Change : "",
        input6Change : "",
        
        
       
    }

    }
    mail_next = (event)=>{
        this.setState({
            mail_wizard : true,
            OTP_wizard : false,
            new_pass_wizard : true,
            prev : false,
        })
        event.preventDefault()
    }
//   otpprev = (event)=>{
//       alert('hello')
//       event.preventDefault()
    //   this.setState({
    //     OTP_wizard : true,
    //     mail_wizard: false,
    //     new_pass_wizard : true,
    //   })
    
//   }

// test = ()=>{
//   document.getElementById("test").focus()
// }

    otp_next = ()=>{
        this.setState({
            OTP_wizard:true,
            new_pass_wizard : false,
            mail_wizard : true,
        })
    }
    
    inputChange = (event)=>{
       const input1 = event.target.id
      
      
       this.setState({
        [event.target.name] : event.target.value
        })

    //    console.log( type1.length)
    if(input1 == '6'){
document.getElementById("1").focus();
    }
    else{

    const values1 = event.target.value
    console.log(values1)
// const test1 = this.state[values1]
// console.log(test1)
       if(values1.length == 1 ){
       
        
           var type1 = parseInt(input1)
        type1 += 1;
        const str1 = type1.toString()
          document.getElementById(str1).focus();
       }

      
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
    
    render(){
        // console.log(this.state.input1Change)
        // console.log(this.state.input2Change)
        // console.log(this.state.input3Change)
        // console.log(this.state.input4Change)
        //console.log(this.state.len)
        // console.log(this.state.OTP_wizard)
        // console.log(this.state.new_pass_wizard)
        return(
            <div >

                
                <div className="forgotPassword" hidden={this.state.mail_wizard}>                
                <div ><h3>Forgot Password</h3></div>
                <div ><label>Email</label></div>
                <div className="forgotPassword_input"><input type="email" id="email" placeholder="Enter Your Email" autoComplete="off"></input></div>
                        <div className="row next">
                        <a className="cancel_btns" href="/login"><button>Cancel</button></a>
                           <div className="next_btn"> <button  onClick={this.mail_next}>Next</button></div>
                           
                        </div> 
                  </div>




                  <div hidden={this.state.OTP_wizard}>
                  <div className="forgotPassword">
                <div ><h3>Forgot Password</h3></div>
                  <div ><label>Enter Your 6 Digit OTP</label></div>
               <div className="row">
               <input className="forgotPassword_input1" type="text" min="1" max="1" name="input1Change" id="1"onChange={this.inputChange}></input>
                 <input className="forgotPassword_input2" type="number" name = "input2Change" id="2" onChange={this.inputChange} ></input>
                 <input className="forgotPassword_input3"  type="number" name= "input3Change" id="3" onChange={this.inputChange} ></input>
                 <input className="forgotPassword_input4" type="number" name = "input4Change" id="4" onChange={this.inputChange}></input>
                 <input className="forgotPassword_input5" type="number" name = "input5Change" id="5" onChange={this.inputChange}></input>
                 <input className="forgotPassword_input6" type="number" name = "input6Change" id="6" onChange={this.inputChange}></input>
                 
					  </div>
                     <div className="row otp_next">
                        <button id= "otp_next"onClick={this.otp_next}>Next</button>
                            
                         </div>
                          </div>
                        </div>



                 <div hidden={this.state.new_pass_wizard}>
                  <div className="forgotPassword">
                  <div ><h3>Forgot Password</h3></div>
                  <div ><label>New Passsword</label></div>
                  {/* <div className="forgotPassword_input"><input type="password" placeholder="Enter Your New Password"></input><spans onClick={this.show_password}> <BiHide /></spans></div> */}
                  <input className="input" id = "password" type="password" placeholder="Enter Your New Password"></input><spans onClick={this.show_password}> <BiHide /></spans>
                  <div className="row submit_next">
                            <button>Submit</button>
                            
                        </div>
                      </div>
                    </div>
            </div>
        )
    }
}
export default Forgotpassword;