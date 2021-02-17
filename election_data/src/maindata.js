import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import MaterialTable from "material-table";
import FilterList from '@material-ui/icons/FilterList';
import { forwardRef } from 'react';
import Member from './member_details';
import {BrowserRouter as Router,Link,Switch,Route,} from 'react-router-dom';
class Maindata extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            items : [],
            isLoaded : false,
            election_type : "",
            year : "",
            member_data : [],
            
        };
    }
  componentDidMount() {
    axios.get("http://localhost:8000/election_data/").then((res) => {
      const items = res.data;
      this.setState({ items,isLoaded :true });
    });
  } 
  
    render()
    {
      console.log(this.state.election_type)
      console.log(this.state.year)
      console.log(this.state.member_data)
       const tableicons = {
            Filter : forwardRef((props, ref) => <FilterList {...props} ref={ref} />)
        };
        return(
            
            <div>
               <div  className="table">          
        <MaterialTable 
         icons={tableicons}
        options={{
            filtering: true,
            grouping: true,
            actionsColumnIndex: -1,
          
          }}

          actions={[
            {
              icon: 'save',
              tooltip: 'Save User',
              onClick: (event,rowData) => {
                this.setState({
                  election_type:rowData.type_id,
                  year:rowData.year_id
                });
               //this.testfunction()
               ReactDOM.render(
                <div>
                  <Member element={rowData}/>
                </div>,
                document.getElementById('row')
                );
              }
            }
          ]}
         columns={[
            { title: "Election Type", field: "election_type"},
            { title: "Year", field: "year"},
          ]}
          data={this.state.items}
          title="Election Data"
        />
        <div id="row">

        </div>

      </div>
    </div>

        );
            
    }
}
export default Maindata;