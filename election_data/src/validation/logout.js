import React from 'react';
import axiosInstance from '../axios';
class Logout extends React.Component{

    componentDidMount() 
    {
        axiosInstance.post('logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');
        localStorage.removeItem('uname');
        localStorage.removeItem('user')
		axiosInstance.defaults.headers['Authorization'] = null;
		window.location = './login';
	
         }
         
    render()
    {
        return(
            <div>
                
            </div>
        );
    }
}
export default Logout;

// function Logout() {
//     useEffect(() => {
        
//         axiosInstance.post('logout/blacklist/', {
//             			refresh_token: localStorage.getItem('refresh_token'),
//             		});
//             		localStorage.removeItem('access_token');
//             		localStorage.removeItem('refresh_token');
//             		axiosInstance.defaults.headers['Authorization'] = null;
//             		// window.location = './login';
        
//     })
// }
// export default Logout;
