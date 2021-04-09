import MemberCount from './member_count';
import PartyCandidateName from './partyCandidateName';
import Grievance from './grievance.js';
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom';
export default function subMenu(){
    return(
        <div>
      <Router>
            <div>
            <div className="row submenu">
                <div className="col-xs-4" align="center"><a><Link to="/home/submenu/candidate/">Candidate List</Link></a></div>
                <div className="col-xs-4" align="center"><a><Link to="/home/submenu/member/">Member Details</Link></a></div>
                <div className="col-xs-4" align="center"><a><Link to="/home/submenu/grievance/">Survey</Link></a></div>
            </div><br></br>
                          
          </div>
          <Switch>
          <Route path="/home/submenu/candidate/" component={PartyCandidateName} />
          <Route path="/home/submenu/member/" component={MemberCount} />
          <Route path="/home/submenu/grievance/" component={Grievance} />
          </Switch>
      </Router>

    </div>
    )
}