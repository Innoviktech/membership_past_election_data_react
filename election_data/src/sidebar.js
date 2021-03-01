import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import MaterialTable from "material-table";
import FilterList from '@material-ui/icons/FilterList';
import { forwardRef } from 'react';
import Select from 'react-select';
import PeopleIcon from '@material-ui/icons/People';
import $ from 'jquery';
class Member_count extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            constituency_data : [],
            polling_station_name_result : [],
            polling_booth_value : null,
            constituency_value : null,
            member_data : [],


            constituency_result : "",
            constituency_count : [],
            
            polling_booth_drops : [],
            
            name_list : [],
           
           
        }
    }
    componentDidMount() {
      
        axios.get('http://localhost:8000/constituency/')
          .then(res => {
            const constituency_data = res.data;
            this.setState({ constituency_data });
          })
          // const element = document.getElementById("dev");
          // element.classList.remove("MTableHeader-header-13");
           $("th").removeClass("MTableHeader-header-13");
                
            
      }

      constituency_change = constituency_value => {
        this.setState({constituency_value});
        const vars =constituency_value.value;
        console.log(vars)
        axios.post('http://localhost:8000/polling_station_name/', {
        key1:vars
    }).then((testing) => {
        const polling_station_name_result=testing.data;
        this.setState({ polling_station_name_result });
    });
        const holder = ""
        const holder1 = []
        this.setState({ polling_booth_value : holder });
        this.setState({ member_data : holder1 });
}
     
polling_booth_change = polling_booth_value => {
        this.setState({polling_booth_value});
        const var1 = this.state.constituency_value.value
        console.log(var1)
        const vars2 = polling_booth_value.value
        console.log(vars2)
        axios.post('http://localhost:8000/constituency_member_name_list/', {
        key1:var1,key2:vars2
        }).then((testing) => {
        const member_data=testing.data;
          this.setState({ member_data });
        });
                
                const holder1 = []
                this.setState({ member_data : holder1 });
            
        }
 render()

    {
      console.log(this.state.name_list)
      const { constituency_value } = this.state;
      const { polling_booth_value } = this.state;
      const tableicons = {
            Filter : forwardRef((props, ref) => <FilterList {...props} ref={ref} />)
        };
       
  return(
  <div>
  
  <div className="row">
      <div className="col-sm-6">
      <label>Constituency</label>
      <Select 
            value={constituency_value}
            onChange={this.constituency_change}
            options={this.state.constituency_data}
          />
        </div>

        
          <div className="col-sm-6">
          <label>Polling Booth Number</label>
          <Select
                  value={polling_booth_value}
                  onChange={this.polling_booth_change}
                  options={this.state.polling_station_name_result}
          />
          </div>
</div><br></br>

        
        <div className = "Member_name_list">
        <MaterialTable
        icons={tableicons}
        options={{
        filtering: true,
        grouping: true,
        
    }}
    columns={[
      
      {title:"Member",field:"name"},
      {title:"LastName",field:"last_name"},
      // {title:"Election Type",field:"election_type"},
      // {title:"Year",field:"year"},
      {title:"Voter List Part Number & Serial Number",field:"voter_id"},
      {title:"Part Agent Election Identity Card",field:"part_agent"},
      {title:"District",field:"district_id"},
      {title:"District Wing",field:"district_wing_id"},
      { title: "Union", field: "union_id"},
      {title:"Union Wing",field:"union_wing_id"},
      { title: "Panchayat", field: "panchayat_id"},
      { title: "Email", field: "email"},
      { title: "Mobile", field: "mobile"},
      { title: "Phone", field: "phone"},
      { title: "Birth Date", field: "birth_date"},
      { title: "Party name", field: "party_name"},
      { title: "Constituancy Name", field: "constituency"},
      { title: "Polling Station Name", field: "polling_station_name"},
      { title: "Polling Booth Number", field: "booth_number"},
      { title: "Gender", field: "gender"},
      { title: "Member Age", field: "age"},
      { title: "Caste", field: "caste"},
      { title: "Ward Number", field: "ward_number"},
      { title: "Door Number", field: "door_number"},
      { title: "Street", field: "street"},
      { title: "Street2", field: "street2"},
      { title: "City", field: "city"},
      { title: "State", field: "state"},
      { title: "ZIP Code", field: "zip"},
            
            ]}
            data={this.state.member_data}
            title=""
            />

        </div>
        </div>
);
    }
    
}

export default Member_count;
