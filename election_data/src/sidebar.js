import React from 'react';
import reactDom from 'react-dom';
import Maindata from './maindata';
import {BrowserRouter as Router,Link,Switch,Route,} from 'react-router-dom';
class Sidebar extends React.Component
{
    render()
    {
        return(
            <Router>
              
              
                  <div className="menu">
                      
                      <a><Link to="/Maindata">Election data</Link></a>
                     
                  </div>
                <Switch>
                
                <Route path="/Maindata" component={Maindata} />
                
                
            </Switch>
              
            </Router> 
            
        );
    }
}
export default Sidebar;