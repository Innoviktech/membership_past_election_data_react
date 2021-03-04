import {BrowserRouter as Router,Link,Switch,Route,Redirect} from 'react-router-dom';
import Login from './validation/login';
import Register from './validation/register';
import Home from './components/home';
import ProtectedRoute from './validation/ProtectedRouter';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
              <div>
                  <div className="menu">
                      <a><Link to="/register">Register</Link></a><br></br>
                      <a><Link to="/login">Login</Link></a><br></br>
                      {/* <a><Link to="/home">home</Link></a><br></br> */}
                      
                  </div>
                <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <ProtectedRoute>
                  <Route exact path='/home' component={Home} />
                </ProtectedRoute>  
                </Switch>
                
              </div>
            </Router>
            {/* <Router>
              <Switch>
              <ProtectedRoute>
                  <Route exact path='/home' component={Home} />
                </ProtectedRoute>
              </Switch>
            </Router> */}
    </div>
  );
}

export default App;
