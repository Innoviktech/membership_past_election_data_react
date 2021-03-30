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
import $ from 'jquery';
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
    
    // rolehandler = (event) => {
    //     this.setState({
    //         role: event.target.value
    //     })
    //     }

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
                phone : event.target.value
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
                alert(alert_msg)
                window.location = './login';
              })
              .catch(err => console.log(err))
              event.preventDefault()

        }      
    
    componentDidMount()
         {
             axios.get('http://localhost:8000/state_name/')
             .then(res=>{
                 const state_value = res.data
                 console.log(state_value)
                 this.setState({state_value})
             })

             axios.get('http://localhost:8000/constituancy_name/')
             .then(res=>
                {
                    console.log(res)
                    const constituency_name = res.data
                    //console.log(constituency_name)
                    this.setState({constituency_name})
                    // console.log(constituency_name)
                })
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

         }
         polling_station_change = polling_station_value => {
            this.setState({polling_station_value});
            const booth = polling_station_value.value
            console.log(booth)
            }

            state_change = change_value => {
                this.setState({change_value});
                }

            handleImageChange = (e) => {
                this.setState({
                  image: e.target.files[0]
                })
              };

    

    render()
    {
        //console.log(this.state.state_value)
        console.log(this.state.change_value.value)
        // console.log(this.state.constituency_value.value)
        // console.log(this.state.polling_station_value.value)
        const { constituency_value } = this.state;
        const { polling_station_value } = this.state;
        const {change_value} = this.state;
        //console.log(this.state.image)
        return(
            <div class="signup-form">
                {/* <div>
                        <input type="file"
                            id="image"
                            accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
                </div> */}
                <form onSubmit={this.handleSubmit}>
                <h2>Register</h2>
                <p>Please fill in this form to create an account!</p>
                <hr></hr>

                {/* <div  class="form-group">
                <label> Role </label><br></br>
                <select onChange={this.rolehandler}>
                <option value="superAdmin">Super Admin</option>
                <option value="staff">Staff</option>

                </select>
                </div> */}
                <div>
                        <input type="file"
                            id="image"
                            accept="image/png, image/jpeg"  onChange={this.handleImageChange} />
                </div>

                <div  className="form-group">
                <label> Email <span>*</span></label><br></br>
                <input type="email" name="username" value={this.state.username} onChange={this.usernamehandler} placeholder="Enter Your Email" required></input><br></br>
                </div>


                <div  className="form-group">
                <label> Password<span>*</span> </label><br></br>
                <input type="password" name="password" value={this.state.password} onChange={this.passwordhandler} placeholder="Enter Password" required ></input><br></br>
                </div>

                <div  className="form-group">
                <label> First Name <span>*</span></label><br></br>
                <input type="text" name="name" value={this.state.first_name} onChange={this.first_name} placeholder="Enter First Name" required></input><br></br>
                </div>

                <div  className="form-group">
                <label> Last Name/Initial <span>*</span></label><br></br>
                <input type="text" name="lname" value={this.state.last_name} onChange={this.last_name} placeholder="Enter Last name" required></input><br></br>
                </div>

                <div  className="form-group">
                <label> Phone Number </label><br></br>
                <input type="number" name="phone" value={this.state.phone} onChange={this.phone_change} placeholder="Enter phone" ></input><br></br>
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




// import React, { useState } from 'react';
// import axiosInstance from '../axios';
// import { useHistory } from 'react-router-dom';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// const useStyles = makeStyles((theme) => ({
// 	paper: {
// 		marginTop: theme.spacing(8),
// 		display: 'flex',
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 	},
// 	avatar: {
// 		margin: theme.spacing(1),
// 		backgroundColor: theme.palette.secondary.main,
// 	},
// 	form: {
// 		width: '100%', // Fix IE 11 issue.
// 		marginTop: theme.spacing(3),
// 	},
// 	submit: {
// 		margin: theme.spacing(3, 0, 2),
// 	},
// }));

// export default function Register() {
// 	const history = useHistory();
// 	const initialFormData = Object.freeze({
// 		email: '',
// 		username: '',
// 		password: '',
// 	});

// 	const [formData, updateFormData] = useState(initialFormData);

// 	const handleChange = (e) => {
// 		updateFormData({
// 			...formData,
// 			// Trimming any whitespace
// 			[e.target.name]: e.target.value.trim(),
// 		});
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		console.log(formData);

// 		axiosInstance
// 			.post(`user/create/`, {
// 				email: formData.email,
// 				user_name: formData.username,
// 				password: formData.password,
// 			})
// 			.then((res) => {
// 				history.push('/login');
// 				console.log(res);
// 				console.log(res.data);
// 			});
// 	};

// 	const classes = useStyles();

// 	return (
// 		<Container component="main" maxWidth="xs">
// 			<CssBaseline />
// 			<div className={classes.paper}>
// 				<Avatar className={classes.avatar}></Avatar>
// 				<Typography component="h1" variant="h5">
// 					Sign up
// 				</Typography>
// 				<form className={classes.form} noValidate>
// 					<Grid container spacing={2}>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								id="email"
// 								label="Email Address"
// 								name="email"
// 								autoComplete="email"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								id="username"
// 								label="Username"
// 								name="username"
// 								autoComplete="username"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								name="password"
// 								label="Password"
// 								type="password"
// 								id="password"
// 								autoComplete="current-password"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<FormControlLabel
// 								control={<Checkbox value="allowExtraEmails" color="primary" />}
// 								label="I want to receive inspiration, marketing promotions and updates via email."
// 							/>
// 						</Grid>
// 					</Grid>
// 					<Button
// 						type="submit"
// 						fullWidth
// 						variant="contained"
// 						color="primary"
// 						className={classes.submit}
// 						onClick={handleSubmit}
// 					>
// 						Sign Up
// 					</Button>
// 					<Grid container justify="flex-end">
// 						<Grid item>
// 							<Link href="#" variant="body2">
// 								Already have an account? Sign in
// 							</Link>
// 						</Grid>
// 					</Grid>
// 				</form>
// 			</div>
// 		</Container>
// 	);
// }