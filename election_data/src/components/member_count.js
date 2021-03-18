import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import MaterialTable from "material-table";
import FilterList from '@material-ui/icons/FilterList';
import { forwardRef } from 'react';
import Select from 'react-select';
import PeopleIcon from '@material-ui/icons/People';
import $ from 'jquery';
import axiosInstance from '../axios';
import { Hidden } from '@material-ui/core';
import MemberView from './member_view';

import reactDom from 'react-dom';
import {BrowserRouter as Router,Link,Switch,Route,Redirect} from 'react-router-dom';
class MemberCount extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            constituency_data : [],
            polling_station_name_result : [],
            polling_booth_value : [],
            constituency_value : [],
            member_data : [],
            edit:false,
           
        }
    }
    componentDidMount() {
      const role =localStorage.getItem('role')
      console.log(role)
      if (role == 'is_superuser'){
        
        this.setState({ edit: !this.state.edit });
      }

      axiosInstance.get(`constituancy_name/`)
          .then(res => {
            console.log(res)
            const constituency_data = res.data;
            this.setState({ constituency_data });
          })
         
           $("th").removeClass("MTableHeader-header-13");
      }

      constituency_change = constituency_value => {
        this.setState({constituency_value});
        const vars =constituency_value.value;
        console.log(vars)
        axiosInstance.post(`polling_station_name/`, {
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
        const booth = polling_booth_value.value
        console.log(booth)
        this.change(booth)
            
        }

        change =(booth)=>{
         
        const var1 = JSON.stringify(this.state.constituency_value.value);
        console.log(var1)
        const vars2 = booth
        console.log(vars2)
        axiosInstance.post(`constituency_member_name_list/`, {
        key1:var1,key2:vars2
        }).then((testing) => {
        const member_data=testing.data;
        console.log(member_data)
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

        // return this.state.edit ? (
        //   <div>hello </div>
        // ) : (
        //   <div> hi</div>
        // )
  
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
          <label>Polling Station Name</label>
          <Select
                  value={polling_booth_value}
                  onChange={this.polling_booth_change}
                  options={this.state.polling_station_name_result}
          />
          </div>
</div><br></br>

        
        <div className = "Member_name_list">
        <MaterialTable
        icons={PeopleIcon}
        options={{
        filtering: true,
        grouping: true,
        actionsColumnIndex: -1,
         
    }}

    
    // editable={{
    //   isEditable: (rowData) => this.state.edit,
    //   onRowUpdate: (newData, oldData) =>
      
    //         new Promise((resolve, reject) => {
                
    //                 console.log(newData)
    //                 axiosInstance.post(`update_member/`, {
    //                   key1:newData
    //               }).then((testing) => {
    //                  console.log(testing)
    //                  const booth = JSON.stringify(this.state.polling_booth_value.value);
    //                 console.log(booth)
    //                  this.change(booth)
    //               });

    //                 resolve();
                
    //         }),
      
    // }}
    actions={[
      {
        icon: 'save',
        tooltip: 'save user',
        onClick: (event,rowData) => {
      const value1 = rowData
      //console.log(value1)
      ReactDOM.render(
        <div>
        <MemberView  view = {rowData} />
        </div>,
         document.getElementById('roots')
      );
      
        
         }
       }
    ]}

    columns={[
      
      { title: "First Name",field:"member_id"},
      // { title: "Last Name",field:"last_name"},
      // { title: "Constituancy Name", field: "constituancy_name"},
      // { title: "Polling Station Name", field: "polling_station_id"},
      // { title: "Voter Details Verified",field:"voter_details_verified"},
      // { title: "Voting Done",field:"voting_done"},
      { title: "Voter List Part Number & Serial Number",field:"voter_id"},
      // { title: "Part Agent Election Identity Card",field:"election_id_card"},
      // { title: "Party Name",field:"party_name"},
      // { title: "Gender", field: "gender"},
      // { title: "Member Age", field: "age"},
      // { title: "Birth Date", field: "birth_date"},
      // { title: "Social Classification", field: "caste"},
      // { title: "Ward Number", field: "ward_number"},
      // { title: "Door Number", field: "door_number"},
      // { title: "Email", field: "email"},
      // { title: "Mobile", field: "mobile"},
      // { title: "Phone", field: "phone"},
      { title: "Street", field: "street"},
      // { title: "City", field: "city"},
      // { title: "State", field: "state"},
      // { title: "ZIP Code", field: "zip"},
      
 
            ]}
            data={this.state.member_data}
            title=""
            />

        </div>
        <div id="roots">

        </div>
        </div>
);
    }
    
}

export default MemberCount;