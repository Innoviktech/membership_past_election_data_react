import React from 'react';
import MemberCount from './member_count';
import Logout from '../validation/logout';

import {BrowserRouter as Router,Link,Switch,Route,} from 'react-router-dom';
class Home extends React.Component
{
  render() {

  return (
     <div className="App">
     
     <Router>
     
      <nav class="navbar navbar-default">
          <div class="container-fluid">
          <ul class="nav navbar-nav">
               
                <li className="nav-link active heading" ><a ><Link to="/memberdetails">Election Data Management</Link></a></li>
                
                <li className="nav navbar-nav navbar-right"><a ><Link to="/logout">Logout</Link></a></li>
                
          </ul>
          </div>
        </nav>
      <Switch>
        <Route path="/memberdetails" component={MemberCount} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </Router> 
    
     </div>

  );
  }
}

export default Home;