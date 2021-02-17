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
            panchayat_data : [],
            constituency_result : "",
            constituency_count : [],
            panchayat_count : [],
            selectedOption: null,
            selectedOption1: null,
            panchayat_drops :"",  
           }
    }
    componentDidMount() {
        axios.get('http://localhost:8000/constituency/')
          .then(res => {
            const constituency_data = res.data;
            this.setState({ constituency_data });
          })
        }
    constituency_change = selectedOption => {
        this.setState({ selectedOption:selectedOption.value});
        const vars =this.state.selectedOption
        console.log(vars)
        axios.post('http://localhost:8000/constituency_count/', {
        key1:vars
        })
        .then((testing) => {
          const constituency_count=testing.data;
            this.setState({ constituency_count });
    });

    this.setState({ selectedOption1:selectedOption.value});
    const varsone =this.state.selectedOption1
    console.log(varsone)
    axios.post('http://localhost:8000/panchayat_drops/', {
    key1:varsone
    })
    .then((testing) => {
        const panchayat_drops=testing.data;
        this.setState({ panchayat_drops });
    });
    };
        //   panchayat_change = selectedOption1 => {
        //     this.setState({ selectedOption1:selectedOption1.value});
        //     const vars =this.state.selectedOption;
        //     console.log(vars)

        //     const vars2 =this.state.selectedOption1;
        //     console.log(vars2)
        //     axios.post('http://localhost:8000/panchayat_count/', {
        //   key1:vars,key2:vars2
        // })
        // .then((testing) => {
        //   const panchayat_count=testing.data;
        //     this.setState({ panchayat_count });
        // });
        //   };
    render(){
        //console.log(this.state.selectedOption)
        console.log(this.state.panchayat_drops)
    
        const { selectedOption } = this.state;
        const { selectedOption1 } = this.state;
       
        const tableicons = {
            Filter : forwardRef((props, ref) => <FilterList {...props} ref={ref} />)
        };
        // console.log(this.state.constituency_count)
        return(
           <div>
               <div>
                   <label>Constituency</label>
<Select
        value={selectedOption}
        onChange={this.constituency_change}
        options={this.state.constituency_data}
/>
<label>Panchayat</label>
<Select
        value={selectedOption1}
        onChange={this.constituency_change}
        options={this.state.panchayat_drops}
/>
{/* <label>Polling Number</label> */}
{/* <Select
        value={selectedOption2}
        onChange={this.constituency_change}
        options={this.state.panchayat_drops}
/> */}

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
