import React from 'react';
import axiosInstance from '../axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from 'react-select';
import axios from "axios";
import $, { event } from 'jquery';
import { length } from 'file-loader';
import { BiHide} from "react-icons/bi";


const gender= [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' },
   ];
class Register extends React.Component{

    constructor(props) {
        super(props)
  
          this.state = {
              
              password : "",
              username : "",
              role : "staff",
              image : "",
              first_name : "",
              last_name : "",
              constituency_name : [],
              constituency_value : "",
              polling_station_name : [],
              polling_station_value : [],
            //   state : [],
              state_value : [],
              change_value : "",
              phone : "",
              gender : "",
              dob : "",
              voter_id : "",
              street : "",
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
    
    first_name = (event) =>{
        this.setState({
                first_name : event.target.value
            })
        }

        last_name = (event) =>{
            this.setState({
                last_name : event.target.value
            })
        }
        phone_change = (event)=>{
            this.setState({
                phone : event.target.value,
              })
        }
        

    
    handleSubmit = (event) => {
        
        let form_data = new FormData();
        const variants = this.state.image
        console.log(variants)
        if(variants){
            form_data.append('image', this.state.image, this.state.image.name);
            form_data.append('role', this.state.role);
            form_data.append('username', this.state.username);
            form_data.append('password', this.state.password);
            form_data.append('first_name', this.state.first_name);
            form_data.append('last_name', this.state.last_name);
            form_data.append('phone_number',this.state.phone);
            form_data.append('state',this.state.change_value.value)
            form_data.append('constituency_value', this.state.constituency_value.value);
            form_data.append('polling_station_value', this.state.polling_station_value.value);
            form_data.append('gender',this.state.gender.value);
            form_data.append('dob',this.state.dob);
            form_data.append('voter_id',this.state.voter_id);
            form_data.append('street',this.state.street)
        }
        else{
        form_data.append('role', this.state.role);
        form_data.append('username', this.state.username);
        form_data.append('password', this.state.password);
        form_data.append('first_name', this.state.first_name);
        form_data.append('last_name', this.state.last_name);
        form_data.append('phone_number',this.state.phone);
        form_data.append('state',this.state.change_value.value)
        form_data.append('constituency_value', this.state.constituency_value.value);
        form_data.append('polling_station_value', this.state.polling_station_value.value);
        form_data.append('gender',this.state.gender.value);
        form_data.append('dob',this.state.dob);
        form_data.append('voter_id',this.state.voter_id);
        form_data.append('street',this.state.street)
        }
        const a = this.state.change_value
        if(a == ''){
            // $('.css-g1d714-ValueContainer').css('border-color','green')
        }
        let url = 'http://localhost:8000/create/';
          axios.post(url, form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
              .then(res => {
                //window.location = './login';
                console.log(res.data);
                const alert_msg = res.data
                if(alert_msg == 'Register successfully'){
                alert(alert_msg)
                window.location = './login';
                }
                else{
                    alert(alert_msg)
                }

              })
              .catch(err => console.log(err))
              event.preventDefault()

             

        }      
    
    componentDidMount()
         {
             axiosInstance.get(`state_name/`)
             .then(res=>{
                 const state_value = res.data
                 console.log(state_value)
                 this.setState({state_value})
             })

            //  axiosInstance.get(`http://localhost:8000/constituancy_name/`)
            //  .then(res=>
            //     {
            //         console.log(res)
            //         const constituency_name = res.data
            //         //console.log(constituency_name)
            //         this.setState({constituency_name})
            //         // console.log(constituency_name)
            //     })
                $('.formss').css('border-color','green')
         }

         constituency_change = constituency_value =>
         {
             this.setState({constituency_value})
             const value1 = constituency_value.value
             axios.post('http://localhost:8000/polling_station_name/',{
                 key1 : value1
             })
             .then(res=>
                {
                    const polling_station_name = res.data
                    this.setState({polling_station_name})
                    //console.log(polling_station_name)
                })
                const holder = ""
                this.setState({ polling_station_value : holder });

         }
         polling_station_change = polling_station_value => {
            this.setState({polling_station_value});
            const booth = polling_station_value.value
            console.log(booth)
            }

            state_change = change_value => {
                this.setState({change_value});
                const value1 = change_value.value
                axios.post('http://localhost:8000/constituancy_name_value/',{
                 key1 : value1
             })
             .then(res=>
                {
                    const constituancy_name_value = res.data
                    console.log(constituancy_name_value)
                    this.setState({constituency_name : constituancy_name_value})
                    //console.log(polling_station_name)
                })
                const holder = ""
                this.setState({ constituency_value : holder });
                this.setState({ polling_station_value : holder });

                }

            handleImageChange = (e) => {
                this.setState({
                  image: e.target.files[0]
                })
              };

              gender_change (value){
                  this.setState({
                      gender:value
                  })
              }

              dob_change = (event)=>{
                  this.setState({
                      dob:event.target.value
                  })
              }
              voter_change = (event)=>{
                  this.setState({
                      voter_id : event.target.value
                  })
              }
              street_change = (event)=>{
                  this.setState({
                      street : event.target.value
                  })
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

    render()
    {
       
        //console.log(this.state.gender.value)
        //console.log(this.state.state_value)
        //console.log(this.state.change_value.value)
        // console.log(this.state.constituency_value.value)
        // console.log(this.state.polling_station_value.value)
        const { constituency_value } = this.state;
        const { polling_station_value } = this.state;
        const {change_value} = this.state;
        //console.log(this.state.image)
        return(
            <div class="signup-form">
                
                <form onSubmit={this.handleSubmit}>
                <h2>Register</h2>
                <p>Please fill in this form to create an account!</p>
                <hr></hr>

                
                <div>
                        <input type="file"
                            id="image"
                            accept="image/png, image/jpeg"  onChange={this.handleImageChange} />
                </div>

                <div  className="form-group">
                <label> Email <span>*</span></label><br></br>
                <input type="email" name="username" value={this.state.username} onChange={this.usernamehandler} placeholder="Enter Your Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required autocomplete="off"></input><br></br>
                </div>


                <div  className="form-group">
                <label> Password<span>*</span> </label><br></br>
                <input type="password" name="password" id="password" value={this.state.password} onChange={this.passwordhandler} pattern=".{8,}" placeholder="Enter Password" required></input> <spans onClick={this.show_password}> <BiHide /></spans><br></br>
                 
                </div>
                <div >                
                                                               
                {/* <input type="checkbox" onClick={this.show_password}></input><label>Show password</label> */}
                </div>

                <div  className="form-group">
                <label> First Name <span>*</span></label><br></br>
                <input type="text" name="name" value={this.state.first_name} onChange={this.first_name} placeholder="Enter First Name" required autocomplete="off"></input><br></br>
                </div>

                <div  className="form-group">
                <label> Last Name/Father Name/Guardian Name <span>*</span></label><br></br>
                <input type="text" name="lname" value={this.state.last_name} onChange={this.last_name} placeholder="Enter Last name" required autocomplete="off"></input><br></br>
                </div>

                <div  className="form-group">
                <label> Phone Number </label><br></br>
                <input type="number" name="phone" value={this.state.phone} onChange={this.phone_change} placeholder="Enter phone" autocomplete="off"></input><br></br>
                </div>

                <div  className="form-group">
                <label> Gender </label><br></br>
                <Select className="select"
                            value={this.state.gender}
                            onChange={value => this.gender_change(value)}
                            options={gender}
                            
                    />
                </div>

                <div  className="form-group">
                <label>Date Of  Birth</label><br></br>
                <input type="date" name="dob" value={this.state.dob} onChange={this.dob_change}></input>
                </div>

                <div  className="form-group">
                <label>Voter ID</label><br></br>
                <input type="voter_id" name="voter_id" value={this.state.voter_id} onChange={this.voter_change} autocomplete="off"></input>
                </div>

                <div  className="form-group">
                <label>Street</label><br></br>
                <input type="text" name="street" value={this.state.street} onChange={this.street_change} autocomplete="off"></input>
                </div>

                <div  className="form-group">
                <label> State <span>*</span></label><br></br>
                <Select className="test"
                     value={change_value}
                     onChange={this.state_change}
                     options={this.state.state_value}
                />
               
                </div>

                <div  class="form-group">
                <label> Constituency<span>*</span> </label><br></br>
                <Select
                
                    value={constituency_value}
                    onChange={this.constituency_change}
                    options={this.state.constituency_name}
                  />
               
                </div>

                <div  class="form-group">
                <label> Polling Station<span>*</span> </label><br></br>
                <Select
                     value={polling_station_value}
                     onChange={this.polling_station_change}
                    options={this.state.polling_station_name}
                  />
                </div>

                <div class="form-group">
                    <button>Signup</button>
                </div>

                </form>
            </div>
        );
    }
}
export default Register;
