import React from 'react';
import reactDom from 'react-dom';
import axios from "axios";
import MaterialTable from "material-table";
import FilterList from '@material-ui/icons/FilterList';
import { forwardRef } from 'react';
import Select from 'react-select';
class Member_name_list extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            name_list : [],
        }

    }
    componentWillReceiveProps=() =>
    { 
    this.setState({
    name_list : this.props.member_name_list
       
        })
    }
    render()
    {
        const tableicons = {
            Filter : forwardRef((props, ref) => <FilterList {...props} ref={ref} />)
        };
        return(
            <div>
        <MaterialTable
        icons={tableicons}
        options={{
        filtering: true,
        grouping: true,
        
    }}
    columns={[
            {title:"Name",field:"name"},
            { title: "Party Name", field: "party_name"},
            { title: "Voter ID", field: "voter_id"},
            
            ]}
            data={this.state.name_list}
            title="Name List"
            />
            </div>
        )
    }
}

export default Member_name_list;
