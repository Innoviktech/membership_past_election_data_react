import React, { Component } from 'react';
import Logout from '../validation/logout';
import ProtectedRoute from '../validation/ProtectedRouter';
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom';
import subMenu from './subMenu';
import Import from './import';
class Home extends Component{
  constructor(props)
  {
      super(props);
      this.state = {
         
      }
  }
  componentWillReceiveProps = (props) =>{
    const val = props.appState.role_id;
    console.log(val);

    
  }

  componentDidMount() {
    document.getElementById("menus").style.display = "none";
  }
  render() {

  return (
     <div className="App">
     
     <Router>
     
      <nav class="navbar navbar-default">
          <div class="container-fluid">
          <ul class="nav navbar-nav">
               
                <li className="nav-link active heading" ><a ><Link to="/home/submenu/">Election Data Management</Link></a></li>
                <li  ><a ><Link to="/home/import/">Import</Link></a></li>
                <li className="nav navbar-nav navbar-right"><a ><Link to="/logout/">Logout</Link></a></li> 
          </ul>
          </div>
        </nav>
      <Switch>
        
        <ProtectedRoute>
          <Route path="/home/submenu/" component={subMenu} />
          <Route path="/home/import/" component={Import} />  
          <Route path="/logout/" component={Logout} />
        </ProtectedRoute>
        
      </Switch>
    </Router> 
    
     </div>

  );
  }
}

export default Home;