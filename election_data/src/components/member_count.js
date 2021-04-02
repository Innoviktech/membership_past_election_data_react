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


const gender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'others', label: 'Others' },
];

const voting_done = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
 
];


const voting_verified = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'Need Attention', label: 'Need Attention' },
  
];

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
            //member_view
            form_view : true,
            member_id : "",
            last_name : "",
            voter_attention : "",
            voter : "",
            election_id_card : "",
            age : null,
            birth_date : "",
            caste : "",
            ward_number : "",
            door_number : "",
            email : "",
            mobile : "",
            phone : "",
            street : "",
            city : "",
            zip : "",


            constituency_data : [],
            constituency: [{label : '', value : ''}],
            polling_booth_data : [],
            polling_booth : [{label : '', value : ''}],
            voter_details_verified :{label:'',value: ''},
            attention : '',
            voter_attention : "",
            voting_done : [{label:'',value:''}],
            partyName : [{label:'',value:''}],
            partyNameData : [],
            gender : [],
            stateNameData : [],
            stateName : [{label:'',value:''}],
            image : "",
            dropdown : true,
            admin_view : '',
            save : true,
            edit : false,
            cancel : true,
            image_view : true,
            imgs : false,
            id : "",
           
           
        }
    }
    componentDidMount() {
      // const role =localStorage.getItem('role')
      // console.log(role)
      // if (role == 'is_superuser'){
        
      //   this.setState({ edit: !this.state.edit });
      // }

      axiosInstance.get(`constituancy_name/`)
          .then(res => {
            console.log(res)
            const constituency_data = res.data;
            this.setState({ constituency_data });
          })
         
           $("th").removeClass("MTableHeader-header-13");
       

           
          const show2 = localStorage.getItem('show1');
          console.log(show2);
          this.setState({show : show2});

//member_view
      $("div").removeClass("css-1fhf3k1-control");
      $("svg").remove(".css-tj5bde-Svg");
      const reason = this.state.voter_details_verified.value;
      //console.log(reason)
      if (reason == 'Need Attention'){
          this.setState({attention : false})
      }
      else{
       this.setState({attention : true})

      }

      const roles =  localStorage.getItem('role')
      //console.log(roles)
      if(roles == 'is_staff'){
          this.setState({admin_view:true})
      }
      else{
          this.setState({admin_view:false})
      }

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

       
      //member view components 
        wizard = (rowData)=>{
         console.log(rowData)
         let constituency1= rowData.constituancy_name
         let constituency2 = rowData.constituancy_id
         let values1 = [{label : constituency1, value : constituency2}]
         let polling1 = rowData.polling_station_id
         let polling2 = rowData.polling_id
        let values2 = [{label : polling1, value : polling2}]
        let voter_verified = rowData.voter_details_verified
        let values3 = [{label : voter_verified, value : voter_verified}]
        let voter_done = rowData.voting_done
        let values4 = [{label : voter_done, value : voter_done}]
        let party1 = rowData.party_name
        let party2 = rowData.party_name_id
       let values5 = [{label : party1, value : party2}]
       let genders = rowData.gender
       console.log(genders)
        let values6 = [{label : genders, value : genders}]
        console.log(values6)
        let state1= rowData.state
         let state2 = rowData.state_id
         let values7 = [{label : state1, value : state2}]

       

         this.setState({
          form_view : false,
           member_id : rowData.member_id,
           last_name : rowData.last_name,
           voter_attention : rowData.voter_attention,
           voter : rowData.voter,
           election_id_card : rowData.election_id_card,
           age : rowData.age,
           birth_date : rowData.birth_date,
           caste : rowData.caste,
           ward_number : rowData.ward_number,
           door_number : rowData.door_number,
           email : rowData.email,
           mobile : rowData.mobile,
           phone : rowData.phone,
           street : rowData.street,
           city : rowData.city,
           zip : rowData.zip,
           id : rowData.id,
          constituency : values1,
          polling_booth : values2,
          voter_details_verified : values3,
          voter_attention : rowData.voter_attention,
          voting_done : values4,
          partyName : values5,
          gender : values6,
          stateName: values7,
          image : rowData.image,
          
          
          
         })

        }
       

        
        form_span = () =>{
          this.setState({
            form_view:true
          })
        }



        inputChange = (event) =>{ 
          this.setState({ 
              [event.target.name] : event.target.value 
          }) 
        }



        edit =()=>{

          document.getElementsByClassName("new")[0].removeAttribute("disabled"); 
        var i;
        for (i = 0; i < 15; i++) {
           document.getElementsByClassName("edit")[i].removeAttribute("disabled"); 
        }
        $("textarea").removeClass("area")
        this.setState({dropdown:false})
        this.setState({save:false})
        this.setState({edit:true})
        this.setState({cancel:false})

        axiosInstance.get(`constituancy_name/`)
            .then(res => {
            console.log(res)
            const constituency_data = res.data;
            console.log(constituency_data)
            this.setState({ constituency_data });
            })


            const vars = this.state.constituency[0].value;
            console.log(vars)
            console.log("hei")
            axiosInstance.post(`polling_station_name/`, {
                key1:vars
            }).then((testing) => {
                const polling_booth_data=testing.data;
                this.setState({ polling_booth_data });
            });

           

            axiosInstance.get(`party_name/`)
                .then(res => {
                    console.log(res)
                    const partyNameData = res.data;
                    this.setState({ partyNameData });
                })

                axiosInstance.get(`state_name/`)
        .then(res => {
        console.log(res)
        const stateNameData = res.data;
        this.setState({ stateNameData });
        })


        }


        handleChange(value) {
          this.setState({ constituency: value })
          const vars = value.value
          console.log(vars)
          axiosInstance.post(`polling_station_name/`, {
              key1:vars
          }).then((testing) => {
              const polling_booth_data=testing.data;
              this.setState({ polling_booth_data });
          });
      
              const holder = ""
             this.setState({ polling_booth : holder });
              
      } 

      pollingBoothChange(value) {
        this.setState({ polling_booth: value })
    }

    voterdetails_verified_change(value){
      this.setState({voter_details_verified:value})
      const reason = value.value
      console.log(reason)
      if (reason == 'Need Attention'){
          this.setState({attention : false})
      }
      else if(reason == "yes" || "no"){
       this.setState({attention : true})
       this.setState({voter_attention : ""})


      }
      
  }
  votingdone_change(value){
    this.setState({voting_done:value})
  }

partyNameChange(value) {
  this.setState({ partyName: value })
}
gender_change(value){
  this.setState({gender:value})
}
stateNameChange(value) {
  this.setState({ stateName: value })
}

cancel =()=>{
  
  var i;
  for (i = 0; i < 15; i++) {
      document.getElementsByClassName("edit")[i].setAttribute('disabled', 'disabled');
  }
  this.setState({dropdown:true})
  this.setState({edit:false})
  this.setState({cancel:true})
  this.setState({save:true})
  document.getElementsByClassName("new")[0].setAttribute('disabled', 'disabled');

  $("div").removeClass("css-1fhf3k1-control");
  $("svg").remove(".css-tj5bde-Svg");
 }
 image_click = ()=>{
  this.setState({imgs:true})
   this.setState({image_view:false})
  
      document.getElementById("view_img")
     
} 
span = ()=>{
  this.setState({image_view: true})
  this.setState({imgs : false})
}



handleSubmit = (event) => {
       
  const value1 = this.state.member_id
  const value2= this.state.last_name
  const value3 = this.state.voter_details_verified.value
  console.log("verififed")
  console.log(value3)
  const value4 = this.state.voting_done.value
  const value5 = this.state.voter
  console.log(value5)
  const value6 = this.state.election_id_card
  const value7 = this.state.gender.value
  const value8 = this.state.age
  const value9 = this.state.birth_date
  const value10 = this.state.caste
  const value11 = this.state.ward_number
  const value12 = this.state.door_number
  const value13 = this.state.email
  const value14 = this.state.mobile
  const value15 = this.state.phone
  const value16 = this.state.street
  const value17 = this.state.city
  const value18 = this.state.zip
  const value19 = this.state.constituency[0].value
  console.log(value19)
  const value20 = this.state.polling_booth[0].value
  console.log("error")
  console.log(value20)
  const value21 = this.state.partyName[0].value
  console.log("hhhhhh")
  console.log(value21)
  const value22 = this.state.stateName[0].value
  console.log(value22)
  const value23 = this.state.id
  console.log(value23)
  const value24 = this.state.voter_attention
  console.log(value24)

  axiosInstance.post(`update_member/`, {
      id:value23,member_id:value1, last_name:value2, voter_details_verified:value3,voting_done:value4,voter:value5,election_id_card:value6,gender:value7,
      age:value8,birth_date:value9,caste:value10,ward_number:value11,door_number:value12,email:value13,mobile:value14,phone:value15,street:value16,
      city:value17,zip:value18,constituency_id:value19,polling_st_id:value20,
      party_name_id:value21,state_id_val:value22,voter_attention:value24
  })
  .then((testing) => {
      console.log(testing.data)
  });
      //event.preventDefault()
    
}


render()
    {
      console.log(this.state.gender.value)
      //console.log(this.state.name_list)
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
    
  
  <div className="row ">
      <div className="col-sm-6 lables">
      <label>Constituency</label>
      <Select 
            value={constituency_value}
            onChange={this.constituency_change}
            options={this.state.constituency_data}
          />
        </div>

        
          <div className="col-sm-6 lables">
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

    actions={[
      {
        icon: 'save',
        tooltip: 'save user',
        onClick: (event,rowData) => {
          this.wizard(rowData)
        }
       }
    ]}

    columns={[
      
      { title: "First Name",field:"member_id"},
      { title: "Voter List Part Number & Serial Number",field:"voter_id"},
      { title: "Street", field: "street"},
    
    ]}
            data={this.state.member_data}
            title=""
            />

        </div>
        <div hidden={this.state.form_view} className="wizard">
        <div id ="admin_view" >
                <div className="form-view" hidden={this.state.form}>
                <div className="row">
                   
                   <div className="col-sm-12 text-right" >
                   <span   onClick={this.form_span}>&times;</span>
                   </div>
                   </div>
                 <div className="row">
             
                    <div className="col-sm-12" hidden = {this.state.admin_view}>
                    <button  onClick={this.edit} hidden={this.state.edit}>Edit</button>
                    <button  onClick={this.handleSubmit} hidden={this.state.save}>Save</button>
                    <button  hidden={this.state.cancel} onClick={this.cancel}>cancel</button>  
                    </div>
                    
 </div>
               
                </div>
                </div>
        <form onSubmit={this.handlesubmit} className="form-view">
          <div className="row">
          <div className="imagess"  hidden={this.state.imgs}>
            <img className="profile" src={`http://localhost:8000/media/${this.state.image}`}height="150px" width="150px" onClick={this.image_click} hidden={this.state.fimg}></img>
           
            </div>
            <div className="view_img" hidden={this.state.image_view}>
                       
                      
                      <img src={`http://localhost:8000/media/${this.state.image}`} height="500px" width="500px"></img>
                      <span class="close" onClick={this.span} hidden={this.state.span}>&times;</span>
                      
                       </div>
            </div><br></br>

        <div className="row">
                       <div className="col-sm-3">
                       <label>First Name</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='member_id' value={this.state.member_id} onChange={this.inputChange} disabled></input>
                       </div>
                       <div className="col-sm-3">
                       <label>Last Name</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='last_name' value={this.state.last_name} onChange={this.inputChange} disabled></input>
                       </div>
                       
                   </div><br></br>

                   <div className="row">
                   <div className="col-sm-3">
                       <label>Constituency</label>  
                       </div>
                       <div className="col-sm-3">
                       <Select className="select"
                            value={this.state.constituency}
                            onChange={ value =>this.handleChange(value)}
                            options={this.state.constituency_data}
                            isDisabled = {this.state.dropdown}
                           
                        />
                       </div>
                       <div className="col-sm-3">
                       <label>Polling Station Name</label>  
                       </div>
                       <div className="col-sm-3">
                       <Select className="select"
                            value={this.state.polling_booth}
                            onChange={value => this.pollingBoothChange(value)}
                            options={this.state.polling_booth_data}
                            isDisabled = {this.state.dropdown}
                    />
                       </div>
                   </div><br></br>

                   <div className="row">
                   <div className="col-sm-3">
                       <label>Voter Details Verified</label>  
                       </div>
                       <div className="col-sm-3">
                       {/* <input type="text" className="edit" name='voter_details_verified' value={this.state.voter_details_verified} onChange={this.inputChange} disabled></input> */}
                       <Select className="select"
                            value={this.state.voter_details_verified}
                            onChange={value => this.voterdetails_verified_change(value)}
                            options={voting_verified}
                            isDisabled = {this.state.dropdown}
                    />
                       </div>
                       <div className="col-sm-3">
                          
                       <label>Voting Done</label>  
                       </div>
                       <div className="col-sm-3">
                       {/* <input type="text" className="edit" name='voting_done' value={this.state.voting_done} onChange={this.inputChange} disabled></input> */}
                       <Select className="select"
                            value={this.state.voting_done}
                            onChange={value => this.votingdone_change(value)}
                            options={voting_done}
                            isDisabled = {this.state.dropdown}
                    />
                       
                       </div>
                   </div><br></br>

                   <div className="row" id ="attention" hidden = {this.state.attention}>
                   <div>
                        <div className="col-sm-3">
                       <label>Reason For Need Attention</label>  
                       </div>
                       <div className="col-sm-3" >
                       <textarea type="text" className="new area" name='voter_attention' value={this.state.voter_attention} onChange={this.inputChange} disabled/>
                       </div>
                       </div>
                   </div><br></br>
                   <div className="row">
                   <div className="col-sm-3">
                       <label>Voter List Part Number & Serial Number</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='voter' value={this.state.voter} onChange={this.inputChange} disabled></input>
                       </div>
                       <div className="col-sm-3">
                       <label>Part Agent Election Identity Card</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='election_id_card' value={this.state.election_id_card} onChange={this.inputChange} disabled></input>
                       </div>

                   </div><br></br>
                   <div className="row">
                   <div className="col-sm-3">
                       <label>Party Name</label>  
                       </div>
                       <div className="col-sm-3">
                       <Select className="select"
                            value={this.state.partyName}
                            onChange={value => this.partyNameChange(value)}
                            options={this.state.partyNameData}
                            isDisabled = {this.state.dropdown}
                    />
                       </div>
                       <div className="col-sm-3">
                       <label>Gender</label>  
                       </div>
                       <div className="col-sm-3">
                       {/* <input type="text" className="edit" name='gender' value={this.state.gender} onChange={this.inputChange} disabled></input> */}
                       <Select className="select"
                            value={this.state.gender}
                            onChange={value => this.gender_change(value)}
                            options={gender}
                            isDisabled = {this.state.dropdown}
                    />
                       </div>
                   </div><br></br>
                   <div className="row">
                   <div className="col-sm-3">
                       <label>Member Age</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='age' value={this.state.age} onChange={this.inputChange} disabled ></input>
                       </div>
                       <div className="col-sm-3">
                       <label>Birth Date</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="date" className="edit" name='birth_date' value={this.state.birth_date} onChange={this.inputChange} disabled></input>
                       </div>
                   </div><br></br>

                   <div className="row">
                   <div className="col-sm-3">
                       <label>Social Classification</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='caste' value={this.state.caste} onChange={this.inputChange} disabled></input>
                       </div>
                       <div className="col-sm-3">
                       <label>Ward Number</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='ward_number' value={this.state.ward_number} onChange={this.inputChange} disabled ></input>
                       </div>
                   </div><br></br>

                   <div className="row">
                   <div className="col-sm-3">
                       <label>Door Number</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='door_number' value={this.state.door_number} onChange={this.inputChange} disabled></input>
                       </div>
                       <div className="col-sm-3">
                       <label>Email</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='email' value={this.state.email} onChange={this.inputChange} disabled></input>
                       </div>
                   </div><br></br>
                   <div className="row">
                   <div className="col-sm-3">
                       <label>Mobile</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='mobile' value={this.state.mobile} onChange={this.inputChange} disabled></input>
                       </div>
                       <div className="col-sm-3">
                       <label>Phone</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='phone' value={this.state.phone} onChange={this.inputChange} disabled></input>
                       </div>
                   </div><br></br>

                   <div className="row">
                   <div className="col-sm-3">
                       <label>Street</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='street' value={this.state.street} onChange={this.inputChange} disabled></input>
                       </div>
                       <div className="col-sm-3">
                       <label>City</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='city' value={this.state.city} onChange={this.inputChange} disabled></input>
                       </div>
                   </div><br></br>

                   <div className="row">
                   <div className="col-sm-3">
                       <label>State</label>  
                       </div>
                       <div className="col-sm-3">
                       <Select className="select"
                            value={this.state.stateName}
                            onChange={value => this.stateNameChange(value)}
                            options={this.state.stateNameData}
                            isDisabled = {this.state.dropdown}
                    />
                       </div>
                       <div className="col-sm-3">
                       <label>ZIP Code</label>  
                       </div>
                       <div className="col-sm-3">
                       <input type="text" className="edit" name='zip' value={this.state.zip} onChange={this.inputChange} disabled></input>
                       </div>
                   </div><br></br>
          </form>

        </div>
       
        </div>
);
    }
    
}

export default MemberCount;