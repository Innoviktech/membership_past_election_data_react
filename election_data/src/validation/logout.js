import { event } from 'jquery';
import React from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
// class Logout extends React.Component{

//     componentDidMount(event) 
//     {
//         axiosInstance.post('logout/blacklist/', {
// 			refresh_token: localStorage.getItem('refresh_token'),
// 		});
// 		localStorage.removeItem('access_token');
// 		localStorage.removeItem('refresh_token');
//         localStorage.removeItem('role');
//         localStorage.removeItem('uname');
//         localStorage.removeItem('user');
//         localStorage.removeItem('username');
// 		axiosInstance.defaults.headers['Authorization'] = null;
// 		window.location = './login';
//         event.preventDefault();
	
//          }
         
//     render()
//     {
//         return(
//             <div>
                
//             </div>
//         );
//     }
// }
//export default Logout;

function Logout(event) {
    
   
                axiosInstance.post(`logout/blacklist/`, {
        			refresh_token: localStorage.getItem('refresh_token'),
        		});
        		localStorage.removeItem('access_token');
        		localStorage.removeItem('refresh_token');
                localStorage.removeItem('role');
                localStorage.removeItem('uname');
                localStorage.removeItem('user');
                localStorage.removeItem('username');
        		axiosInstance.defaults.headers['Authorization'] = null;
             
                    // let path = "/login";
                    // let history = useHistory();
                    // history.push("/login");
                    window.location = "/login"
                    // const history = useHistory();
                    // history.push({
                    //     pathname: '/login',
                        
                    //   });
   
}
export default Logout;
