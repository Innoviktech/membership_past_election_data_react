import React from 'react';
import reactDom from 'react-dom';
import axios from "axios";
import MaterialTable from "material-table";
import FilterList from '@material-ui/icons/FilterList';
import { forwardRef } from 'react';
import Select from 'react-select';
class Member_count extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            constituency_data : [],
            constituency_result : "",
            constituency_count : [],
            selectedOption: null,
           
        }
    }

    
    componentDidMount() {
        axios.get('http://localhost:8000/constituency/')
          .then(res => {
            const constituency_data = res.data;
            this.setState({ constituency_data });
          })
          
      }
      handleChange = selectedOption => {
            this.setState({ selectedOption});
            const vars =selectedOption.value;
            console.log(vars)
            axios.post('http://localhost:8000/constituency_count/', {
          key1:vars
        })
        .then((testing) => {
          const constituency_count=testing.data;
            this.setState({ constituency_count });
        });
          };
    render()

    {
        const { selectedOption } = this.state;
        const tableicons = {
            Filter : forwardRef((props, ref) => <FilterList {...props} ref={ref} />)
        };
        console.log(this.state.constituency_count)
        
        return(
           <div>
               <div>
                   <label>Constituency</label>
                <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.state.constituency_data}
/>
</div>
<div className="material">
            <MaterialTable
        icons={tableicons}
        options={{}}
    columns={[
            {title:"Constituency",field:"name"},
            { title: "Panchayat", field: "panchayat"},
            { title: "Polling Booth Number", field: "booth_number"},
            { title: "Male", field: "male"},
            { title: "Female", field: "female"},
            {title:"Other",field:"other"},
            { title: "Total", field: "total"},
           
            ]}
            data={this.state.constituency_count}
            title="Member's Report"
            />
        </div>
            
           </div>
);
    }
    
}

export default Member_count;
