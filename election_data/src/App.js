import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Link,Switch,Route,Redirect} from 'react-router-dom';
import Login from './validation/login';
import Register from './validation/register';
import Home from './components/home';
import Demo from './components/demo';
import ProtectedRoute from './validation/ProtectedRouter';
import Digital_sign from './validation/digital_sign';
import View from './validation/view';
import Admin from './validation/admin';
import './App.css';
import './components/home.css';
import PartyCandidateName from './components/partyCandidateName';
import background from './frieden-1600.jpg'
import { IconName } from "react-icons/";
import Forgotpassword from './validation/forgotpassword'
function App() {
  return (
    <div className="App">
       
      <div className="cont" >
           
      <img className="imgs" src={background} />
      {/* <div>
        <Login />
      </div> */}
      <Router>
              <div >
                  <div id="menus" className=" row menu">
                    {/* <div className="col-sm-6 text-center">
                      <a><Link to="/register">Register</Link></a><br></br>
                      </div> */}
                      {/* <div className="col-sm-6 text-center">
                      <a><Link to="/login">Login</Link></a><br></br>
                     </div> */}
                     </div>
                <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                {/* <Route path="/demo" component={Demo} /> */}
                {/* <Route path="/sign" component={Digital_sign} />
                <Route path="/view" component={View} /> */}
                <Route path="/admin" component={Admin} />
                <Route path="/candidates" component={PartyCandidateName} />
                <Route path="/forgotPassword" component={Forgotpassword} />
                <ProtectedRoute>
                  <Route  path="/" to="/" component={Home} />
                </ProtectedRoute> 

                </Switch>
                
              </div>
            </Router>
            </div>
    </div>
  );
}
export default App;
