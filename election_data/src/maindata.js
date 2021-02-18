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
                // this.setState({
                //   election_type:rowData.type_id,
                //   year:rowData.year_id
                // });
            const value1 = rowData.type_id
            const value2 = rowData.year_id
          axios.post('http://localhost:8000/election_member/', {
                      key1:value1,key2:value2
                    })
                    .then((testing) => {
                      const member_data=testing.data;
                        this.setState({ member_data });
                    });
                    
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
        

      </div>
      <div className="table2">
            <MaterialTable
        icons={tableicons}
        options={{
        filtering: true,
        grouping: true,
        actionsColumnIndex: -1,
    }}
    columns={[
            {title:"District",field:"district"},
            { title: "Union", field: "union"},
            { title: "polling number", field: "polling_number"},
            {title:"panchayat",field:"panchayat_name"},
            { title: "gender", field: "gender"},
            { title: "Election Type", field: "election_type"},
            { title: "year", field: "year"},
            { title: "party name", field: "party_name"},
            ]}
            data={this.state.member_data}
            title="Member's Data"
            />
        </div>
    </div>

        );
            
    }
}
export default Maindata;