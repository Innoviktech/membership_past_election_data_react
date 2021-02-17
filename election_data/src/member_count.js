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
            constituency_value : null,
            panchayat_drops : [],
            polling_booth_drops : [],
            polling_booth_value : null,
           
        }
    }

    
    componentDidMount() {
        axios.get('http://localhost:8000/constituency/')
          .then(res => {
            const constituency_data = res.data;
            this.setState({ constituency_data });
          })
          
      }
      constituency_change = constituency_value => {
            this.setState({constituency_value});
            const vars =constituency_value.value;
            console.log(vars)
            axios.post('http://localhost:8000/constituency_count/', {
          key1:vars
        })
        .then((testing) => {
          const constituency_count=testing.data;
            this.setState({ constituency_count });
        });


        axios.post('http://localhost:8000/panchayat_drops/', {
          key1:vars
        })
        .then((testing) => {
          const panchayat_drops=testing.data;
            this.setState({ panchayat_drops });
        });
          };

          panchayat_change = panchayat_value => {
            this.setState({ panchayat_value});
            const vars2 =panchayat_value.value;
            //console.log(vars2)
            const vars = this.state.constituency_value.value
            console.log(vars)
            axios.post('http://localhost:8000/panchayat_count/', {
          key1:vars, key2:vars2
        })
        .then((testing) => {
          const constituency_count=testing.data;
            this.setState({ constituency_count });
        });

        axios.post('http://localhost:8000/polling_booth_drops/', {
          key1:vars, key2:vars2
        })
        .then((testing) => {
          const polling_booth_drops=testing.data;
            this.setState({ polling_booth_drops });
        });
      };

      polling_booth_change = polling_booth_value => {
        this.setState({ polling_booth_value});
        const vars3 =polling_booth_value.value;
        console.log(vars3)
        const vars = this.state.constituency_value.value
        console.log(vars)
        const vars2 = this.state.panchayat_value.value
        console.log(vars2)
        axios.post('http://localhost:8000/polling_booth_count/', {
      key1:vars, key2:vars2,key3:vars3
    })
    .then((testing) => {
      const constituency_count=testing.data;
        this.setState({ constituency_count });
    });
};
render()

    {
      // console.log(this.state.constituency_value2)
        // console.log(this.state.panchayat_drops)
      
        const { constituency_value } = this.state;
        const { panchayat_value } = this.state;
        const { polling_booth_value } = this.state;
        const tableicons = {
            Filter : forwardRef((props, ref) => <FilterList {...props} ref={ref} />)
        };
        // console.log(this.state.constituency_count)
        
        return(
           <div>
               <div className="drop_down_box1">
                   <label>Constituency</label>
                <Select 
        value={constituency_value}
        onChange={this.constituency_change}
        options={this.state.constituency_data}
/></div>
<div className="drop_down_box2">

<label>Panchayat</label>
<Select 
        value={panchayat_value}
        onChange={this.panchayat_change}
        options={this.state.panchayat_drops}
/>
</div>
<div className="drop_down_box3">
<label>Polling Booth Number</label>
<Select
        value={polling_booth_value}
        onChange={this.polling_booth_change}
        options={this.state.polling_booth_drops}
/>
</div>

<div className="material">
            <MaterialTable
        icons={tableicons}
        options={{}}
    columns={[
            {title:"Constituency",field:"constituency"},
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
