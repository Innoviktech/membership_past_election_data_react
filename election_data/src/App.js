//import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar';
import {BrowserRouter as Router,Link,Switch,Route,} from 'react-router-dom';
function App() {
  return (
     <div className="App">
     
      <Router>
          <div className="wrapper">
          <a><Link to="/Sidebar">Election Data Management</Link></a>
          </div>
      <Switch>
        <Route path="/Sidebar" component={Sidebar} />
      </Switch>
    </Router> 
     </div>
     
   
  );
}

export default App;