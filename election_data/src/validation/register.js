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
class Register extends React.Component{

    constructor(props) {
        super(props)
  
          this.state = {
              
              password : "",
              username : "",
              role : "",
              first_name : "",
              last_name : "",
              constituency_name : [],
              constituency_value : "",
              polling_station_name : [],
              polling_station_value : [],
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
    
    rolehandler = (event) => {
        this.setState({
            role: event.target.value
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

    
    handleSubmit = (event) => {
       
        const value1 = this.state.username
        const value2= this.state.role
        const value3 = this.state.password
        const value4 = this.state.first_name
        const value5 = this.state.last_name
        const value6 = this.state.constituency_value.value
        const value7 = this.state.polling_station_value.value
        axios.post('http://localhost:8000/create/', {
          username:value1, password:value3, role:value2, first_name : value4, last_name : value5, constituency_name : value6, polling_station_value : value7
        })
        .then((testing) => {
           window.location = './login';
        });
            event.preventDefault()
          }

          
    componentDidMount()
         {
             axios.get('http://localhost:8000/constituancy_name/')
             .then(res=>
                {
                    console.log(res)
                    const constituency_name = res.data
                    console.log(constituency_name)
                    this.setState({constituency_name})
                    // console.log(constituency_name)
                })
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
                    console.log(polling_station_name)
                })

         }
         polling_station_change = polling_station_value => {
            this.setState({polling_station_value});
            const booth = polling_station_value.value
            console.log(booth)
            }

    render()
    {
        const { constituency_value } = this.state;
        const { polling_station_value } = this.state;
        return(
            <div class="signup-form">
                <form onSubmit={this.handleSubmit}>
                <h2>Register</h2>
                <p>Please fill in this form to create an account!</p>
                <hr></hr>

                <div  class="form-group">
                <label> Role </label><br></br>
                <select onChange={this.rolehandler}>
                <option value="superAdmin">Super Admin</option>
                <option value="staff">Staff</option>

                </select>
                </div>

                <div  class="form-group">
                <label> Email </label><br></br>
                <input type="email" name="username" value={this.state.username} onChange={this.usernamehandler} placeholder="Enter Your Email" required></input><br></br>
                </div>


                <div  class="form-group">
                <label> Password </label><br></br>
                <input type="password" name="password" value={this.state.password} onChange={this.passwordhandler} placeholder="Enter Password" required></input><br></br>
                </div>

                <div  class="form-group">
                <label> First Name </label><br></br>
                <input type="text" name="name" value={this.state.first_name} onChange={this.first_name} placeholder="Enter First Name" required></input><br></br>
                </div>

                <div  class="form-group">
                <label> Last Name </label><br></br>
                <input type="text" name="lname" value={this.state.last_name} onChange={this.last_name} placeholder="Enter Last name" required></input><br></br>
                </div>

                <div  class="form-group">
                <label> Constituency </label><br></br>
                <Select
                    value={constituency_value}
                    onChange={this.constituency_change}
                    options={this.state.constituency_name}
                  />
               
                </div>

                <div  class="form-group">
                <label> Polling Station </label><br></br>
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