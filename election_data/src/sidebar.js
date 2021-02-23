import React from 'react';
import reactDom from 'react-dom';
import Maindata from './maindata';
import Member_count from './member_count';
import {BrowserRouter as Router,Link,Switch,Route,} from 'react-router-dom';
class Sidebar extends React.Component
{
    render()
    {
        return(
            <Router>
              
              
                  <div className="menu">
                      
                      <a><Link to="/Maindata">Election data</Link></a><br></br>
                      <a><Link to="/member_report">Member Report</Link></a>
                      
                   </div>
                <Switch>
                
                <Route path="/Maindata" component={Maindata} />
                <Route path="/member_report" component={Member_count} />
               
               
                
            </Switch>
              
            </Router> 
            
        );
    }
}
export default Sidebar;