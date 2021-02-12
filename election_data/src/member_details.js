import React from 'react';
import {BrowserRouter as Router,Link,Switch,Route,} from 'react-router-dom';
import axios from "axios";
import MaterialTable from "material-table";
import FilterList from '@material-ui/icons/FilterList';
import { forwardRef } from 'react';
class Member extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            election_type : "",
             year : "",
             member_data : [],
        };
    }
componentWillReceiveProps=() =>
{ 
    this.setState({
        election_type:this.props.element.election_type,
        year:this.props.element.year
        })
    const value1 = (this.state.election_type)
    const value2 = (this.state.year)
    
    
    axios.post('http://localhost:8000/election_member/', {
              key1:value1,key2:value2
            })
            .then((testing) => {
              const member_data=testing.data;
                this.setState({ member_data });
            });
}
    render()
    {
        console.log(this.state.items);
        const tableicons = {
            Filter : forwardRef((props, ref) => <FilterList {...props} ref={ref} />)
        };
        console.log(this.state.member_data);
        return(
        <div>
            <MaterialTable
        icons={tableicons}
        options={{
        filtering: true,
        grouping: true,
        actionsColumnIndex: -1,
   
   }}
          columns={[
            {title:"id",field:"id"},
            { title: "name", field: "name"},
            { title: "polling number", field: "polling number"},
            {title:"panchayat",field:"panchayat"},
            { title: "gender", field: "gender"},
            { title: "constituency", field: "constituency"},
            { title: "Election Type", field: "election_type"},
            { title: "year", field: "year"}
            
           
          ]}
          data={this.state.member_data}
          title="Member's Data"
        />
        </div>
        )
       
    }
}
export default Member;

