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
             year : "1",
             member_data : [],
        };
    }
componentWillReceiveProps=() =>
{ 
    this.setState({
        election_type:this.props.element.type_id,
        year:this.props.element.year_id
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
        const tableicons = {
            Filter : forwardRef((props, ref) => <FilterList {...props} ref={ref} />)
        };
        console.log(this.state.member_data);
        return(
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
        )
    }
}
export default Member;

