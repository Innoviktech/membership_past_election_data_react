import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Link,Switch,Route,Redirect} from 'react-router-dom';
import Login from './validation/login';
import Register from './validation/register';
import Home from './components/home';
import Demo from './components/demo';
import ProtectedRoute from './validation/ProtectedRouter';
import Digital_sign from './validation/digital_sign';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
              <div>
                  <div id= "menus" className="menu">
                      <a><Link to="/register">Register</Link></a><br></br>
                      <a><Link to="/login">Login</Link></a><br></br>
                      <a><Link to="/demo">Demo</Link></a><br></br>
                      <a><Link to="/sign">Sign</Link></a><br></br>
                      
                  </div>
                <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/demo" component={Demo} />
                <Route path="/sign" component={Digital_sign} />
                
                <ProtectedRoute>
                  <Route  path="/home" to="/home" component={Home} />
                </ProtectedRoute> 

                </Switch>
                
              </div>
            </Router>
            
    </div>
  );
}

export default App;
