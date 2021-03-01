//import logo from './logo.svg';
import './App.css';
import Member_count from './sidebar';


import {BrowserRouter as Router,Link,Switch,Route,} from 'react-router-dom';
function App() {
  return (
     <div className="App">
     
     <Router>
      <nav class="navbar navbar-default">
          <div class="container-fluid">
          <ul class="nav navbar-nav">

                <li className="nav-link active heading" ><a ><Link to="/memberdetails">Election Data Management</Link></a></li>
                
                
          </ul>
          </div>
        </nav>
      <Switch>
        <Route path="/memberdetails" component={Member_count} />
      </Switch>
    </Router> 
    
     </div>
     
   
  );
}

export default App;