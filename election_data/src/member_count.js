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
            constituency_result : "",
            constituency_count : [],
            constituency_value : null,
            panchayat_drops : [],
            polling_booth_drops : [],
            polling_booth_value : null,
            name_list : [],
           
           
        }
    }
    componentDidMount() {
      
        axios.get('http://localhost:8000/constituency/')
          .then(res => {
            const constituency_data = res.data;
            this.setState({ constituency_data });
          })
          const element = document.getElementById("dev");
          element.classList.remove("MTableHeader-header-13");
          
          
          $("th").removeClass("MTableHeader-header-13");
                
            
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
        const holder = ""
        const holder1 = []
        this.setState({ panchayat_value : holder });
        this.setState({ polling_booth_value : holder });
        this.setState({ name_list : holder1 });
       
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
        const holder = ""
        const holder1 = []
        this.setState({ polling_booth_value : holder });
        this.setState({ name_list : holder1 });
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
        const holder1 = []
        this.setState({ name_list : holder1 });
    });
};

render()

    {
      console.log(this.state.name_list)
      const { constituency_value } = this.state;
      const { panchayat_value } = this.state;
      const { polling_booth_value } = this.state;
      const tableicons = {
            Filter : forwardRef((props, ref) => <FilterList {...props} ref={ref} />)
        };
       
  return(
  <div>
    <div className="row">
                <div className="text-center">
                <h3>CURRENT VOTER DETAILS</h3>
                </div>
                </div>
  <div className="row">
      <div className="col-sm-4">
      <label>Constituency</label>
      <Select 
            value={constituency_value}
            onChange={this.constituency_change}
            options={this.state.constituency_data}
          />
        </div>

        <div className="col-sm-4">

        <label>Panchayat</label>
        <Select id="reset"
                value={panchayat_value}
                onChange={this.panchayat_change}
                options={this.state.panchayat_drops}
        />
        </div>
          <div className="col-sm-4">
          <label>Polling Booth Number</label>
          <Select
                  value={polling_booth_value}
                  onChange={this.polling_booth_change}
                  options={this.state.polling_booth_drops}
          />
          </div>
</div><br></br>
<div id="dev" className="material">
          
    <MaterialTable
      icons={tableicons}
      options={{
         
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
            
          }
        
        }}
      actions={[
        {
          icon: PeopleIcon,
          
          onClick: (event,rowData) => {
            const var1 = this.state.constituency_count[0].constituency_id
            console.log(var1)
            const vars2 = this.state.constituency_count[0].panchayat_id
            console.log(vars2)
            const vars3 = this.state.constituency_count[0].polling_booth_id
            console.log(vars3)
            axios.post('http://localhost:8000/constituency_member_name_list/', {
                key1:var1,key2:vars2,key3:vars3
              })
              .then((testing) => {
                const name_list=testing.data;
                  this.setState({ name_list });
              });
                
           }
           
           
        }
      ]}

    columns={[
      
      {title:"Constituency",field:"constituency"},
      {title:"Panchayat",field:"panchayat"},
      {title:"Polling Booth Number",field:"booth_number"},
      {title:"Male",field:"male"},
      {title:"Female",field:"female"},
      {title:"Other", field: "other"},
      {title:"Total",field:"total"},
            
            ]}
            data={this.state.constituency_count}
            title="Member Count"
            />

        
        </div>
        <div className="test">
          
        </div>
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
            data={this.state.name_list}
            title="Member Detail's"
            />

        </div>
        </div>
);
    }
    
}

export default Member_count;
