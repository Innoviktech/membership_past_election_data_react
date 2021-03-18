import MemberCount from './member_count';
import PartyCandidateName from './partyCandidateName';
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom';
export default function subMenu(){
    return(
        <div>
      <Router>
            <div>
            <div className="row">
                <div className="col-xs-6" align="center"><a><Link to="/home/candidate/">Candidate List</Link></a></div>
                <div className="col-xs-6" align="center"><a><Link to="/home/member/">Member Details</Link></a></div>
            </div><br></br>
                          
          </div>
          <Switch>
          <Route path="/home/candidate/" component={PartyCandidateName} />
          <Route path="/home/member/" component={MemberCount} />
          </Switch>
      </Router>

    </div>
    )
}