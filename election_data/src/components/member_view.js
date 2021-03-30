import React, { Component } from 'react';
import axiosInstance from '../axios';
import Select from 'react-select';
import { colors } from '@material-ui/core';
import $ from 'jquery';
import { Link } from 'react-router-dom';

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
  


class MemberView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {

            member_id :  this.props.view.member_id,
            last_name :  this.props.view.last_name,
            
            voter :  this.props.view.voter,
            election_id_card : this.props.view.election_id_card,
            //gender :  this.props.view.gender,
            age :  this.props.view.age,
            birth_date :  this.props.view.birth_date,
            caste :  this.props.view.caste,
            ward_number :  this.props.view.ward_number,
            door_number :  this.props.view.door_number,
            email :  this.props.view.email,
            mobile :  this.props.view.mobile,
            phone :  this.props.view.phone,
            street :  this.props.view.street,
            city :  this.props.view.city,
            zip :  this.props.view.zip,
            image : this.props.view.image,
            constituency_data : [],
            constituency: { label: this.props.view.constituancy_name, value: this.props.view.constituancy_id },
            polling_booth : { label: this.props.view.polling_station_id, value: this.props.view.polling_id},
            partyName : { label: this.props.view.party_name, value: this.props.view.party_name_id},
            stateName : { label: this.props.view.state, value: this.props.view.state_id},
            gender : {label:this.props.view.gender},
            voter_details_verified :{label:this.props.view.voter_details_verified,value: this.props.view.voter_details_verified},
            voting_done : {label:this.props.view.voting_done,value:this.props.view.voting_done},
            polling_booth_data : [],
            partyNameData : [],
            stateNameData : [],
            dropdown : true,
            edit : false,
            cancel : true,
            save : true,
            imgs : false,
            image_view : true,
            span : false,
            form : false,
            admin_view : '',
            Voter_attention : this.props.view.Voter_attention,
            attention : '',
           
        }
    }
componentDidMount()
   {
       this.setState({member : this.props.view})
       $("div").removeClass("css-1fhf3k1-control");
       $("svg").remove(".css-tj5bde-Svg");
       //$(".css-107lb6w-singleValue").removeProp(colors);
       $(".css-107lb6w-singleValue").css("color","black");

      const roles =  localStorage.getItem('role')
      //console.log(roles)
      if(roles == 'is_staff'){
          this.setState({admin_view:true})
      }
      else{
          this.setState({admin_view:false})
      }
      const reason = this.state.voter_details_verified.value;
      //console.log(reason)
      if (reason == 'Need Attention'){
          this.setState({attention : false})
      }
      else{
       this.setState({attention : true})

      }
      //$("div").removeClass("abc")
   }

   edit =()=>{
            axiosInstance.get(`constituancy_name/`)
            .then(res => {
            console.log(res)
            const constituency_data = res.data;
            console.log(constituency_data)
            this.setState({ constituency_data });
            })

            const vars = this.props.view.constituancy_id;
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
        document.getElementsByClassName("new")[0].removeAttribute("disabled"); 
        var i;
        for (i = 0; i < 15; i++) {
           document.getElementsByClassName("edit")[i].removeAttribute("disabled"); 
        }
        this.setState({dropdown:false})
        this.setState({edit:true})
        this.setState({cancel:false})
        this.setState({save:false})
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

    partyNameChange(value) {
        this.setState({ partyName: value })
    }

    stateNameChange(value) {
        this.setState({ stateName: value })
    }
    gender_change(value){
        this.setState({gender:value})
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
         this.setState({Voter_attention : ''})

  
        }
        
    }
    votingdone_change(value){
        this.setState({voting_done:value})
    }

    inputChange = (event) =>{ 
        this.setState({ 
            [event.target.name] : event.target.value 
        }) 
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
     form_span = ()=>{
         

         this.setState({form:true})
         localStorage.setItem('show1',false)
        
        
     }
    
    
      handleSubmit = (event) => {
       
        const value1 = this.state.member_id
        const value2= this.state.last_name
        const value3 = this.state.voter_details_verified
        const value4 = this.state.voting_done
        const value5 = this.state.voter
        console.log(value5)
        const value6 = this.state.election_id_card
        const value7 = this.state.gender
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
        const value19 = this.state.constituency.value
        console.log(value19)
        const value20 = this.state.polling_booth.value
        console.log("error")
        console.log(value20)
        const value21 = this.state.partyName.value
        console.log(value21)
        const value22 = this.state.stateName.value
        console.log(value22)
        const value23 = this.props.view.id
        console.log(value23)
        const value24 = this.state.Voter_attention
        console.log(value24)

        axiosInstance.post(`update_member/`, {
            id:value23,member_id:value1, last_name:value2, voter_details_verified:value3,voting_done:value4,voter:value5,election_id_card:value6,gender:value7,
            age:value8,birth_date:value9,caste:value10,ward_number:value11,door_number:value12,email:value13,mobile:value14,phone:value15,street:value16,
            city:value17,zip:value18,constituency_id:value19,polling_st_id:value20,
            party_name_id:value21,state_id_val:value22,Voter_attention:value24
        })
        .then((testing) => {
            console.log(testing.data)
        });
            event.preventDefault()
          
}
    
    render()
    {   
        console.log(this.state.Voter_attention)
        //console.log(this.state.birth_date)
        // console.log(this.state.constituency)
        // console.log("error")
        // console.log(this.state.polling_booth)
        // console.log(this.state.partyName)
        // console.log(this.state.stateName)
        return(
            <div id="view">
                <div id ="admin_view" hidden = {this.state.admin_view}>
                <div className="form-view" hidden={this.state.form}>
                 <div className="row">
                    <div>
                    <div className="col-sm-1">
                    <button onClick={this.edit} hidden={this.state.edit}>Edit</button>
                    <button onClick={this.handleSubmit} hidden={this.state.save}>Save</button>
                    </div>
                    <div className="col-sm-1">
                   <button onClick={this.cancel} hidden={this.state.cancel}>cancel</button>  
                    </div>
                    </div>
                </div>
                </div>
                </div>
                
               <form onSubmit={this.handlesubmit} className="form-view" hidden={this.state.form}>
               <span class="close" onClick={this.form_span}>&times;</span>

                   <div className="row">
                       {/* <div>
                       <label className="col-sm-3">Profile</label>
                       </div> */}
                       
                   </div><br></br>
                   <div className="row" >
                       <div className="image" hidden={this.state.imgs}>
                       <img  src={`http://localhost:8000/media/${this.state.image}`}height="150px" width="150px" onClick={this.image_click} hidden={this.state.fimg}></img>
                       {/* <img id="img" src={`http://localhost:8000/media/${this.state.image}`}  hidden={this.state.image_set}></img> */}
                       </div>
                       <div className="view_img" hidden={this.state.image_view}>
                       <span class="close" onClick={this.span} hidden={this.state.span}>&times;</span>
                      
                      <img src={`http://localhost:8000/media/${this.state.image}`} height="500px" width="500px"></img>
                      <img class="modal-content" id="img01"></img>
                    <div id="caption"></div>
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
                       <textarea type="text" className="new" name='Voter_attention' value={this.state.Voter_attention} onChange={this.inputChange} disabled/>
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
                   <div className="row">
                   <div className="text-center" >
                       {/* <button class="btn btn-success" onClick={this.handleSubmit}>Save</button> */}
                   </div>
                   </div>


                   {/* <div>
                       <label>Profile</label>
                       <img src={`http://localhost:8000/media/${this.state.image}`} width="40px" height="80px"></img>
                   </div>
                   <div><label>First Name</label>
                   <input type="text" className="edit" name='member_id' value={this.state.member_id} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Last Name</label>
                   <input type="text" className="edit" name='last_name' value={this.state.last_name} onChange={this.inputChange} disabled></input>
                   </div>
                   <div>
                   <label>Constituency</label>
                    <Select 
                            value={this.state.constituency}
                            onChange={ value =>this.handleChange(value)}
                            options={this.state.constituency_data}
                            isDisabled = {this.state.dropdown}
                        />

                   </div>
                    <div><label>Polling Station Name</label>
                    <Select
                            value={this.state.polling_booth}
                            onChange={value => this.pollingBoothChange(value)}
                            options={this.state.polling_booth_data}
                            isDisabled = {this.state.dropdown}
                    />
                   </div>
                   <div><label>Voter Details Verified</label>
                   <input type="text" className="edit" name='voter_details_verified' value={this.state.voter_details_verified} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Voting Done</label>
                   <input type="text" className="edit" name='voting_done' value={this.state.voting_done} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Voter List Part Number & Serial Number</label>
                   <input type="text" className="edit" name='voter' value={this.state.voter} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Part Agent Election Identity Card</label>
                   <input type="text" className="edit" name='election_id_card' value={this.state.election_id_card} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Party Name</label>
                   <Select
                            value={this.state.partyName}
                            onChange={value => this.partyNameChange(value)}
                            options={this.state.partyNameData}
                            isDisabled = {this.state.dropdown}
                    />
                   </div>
                   <div><label>Gender</label>
                   <input type="text" className="edit" name='gender' value={this.state.gender} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Member Age</label>
                   <input type="text" className="edit" name='age' value={this.state.age} onChange={this.inputChange} disabled ></input>
                   </div>
                   <div><label>Birth Date</label>
                   <input type="text" className="edit" name='birth_date' value={this.state.birth_date} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Social Classification</label>
                   <input type="text" className="edit" name='caste' value={this.state.caste} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Ward Number</label>
                   <input type="text" className="edit" name='ward_number' value={this.state.ward_number} onChange={this.inputChange} disabled ></input>
                   </div>
                   <div><label>Door Number</label>
                   <input type="text" className="edit" name='door_number' value={this.state.door_number} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Email</label>
                   <input type="text" className="edit" name='email' value={this.state.email} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Mobile</label>
                   <input type="text" className="edit" name='mobile' value={this.state.mobile} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Phone</label>
                   <input type="text" className="edit" name='phone' value={this.state.phone} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>Street</label>
                   <input type="text" className="edit" name='street' value={this.state.street} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>City</label>
                   <input type="text" className="edit" name='city' value={this.state.city} onChange={this.inputChange} disabled></input>
                   </div>
                   <div><label>State</label>
                   <Select
                            value={this.state.stateName}
                            onChange={value => this.stateNameChange(value)}
                            options={this.state.stateNameData}
                            isDisabled = {this.state.dropdown}
                    />
                   </div>
                   <div><label>ZIP Code</label>
                   <input type="text" className="edit" name='zip' value={this.state.zip} onChange={this.inputChange} disabled></input>
                   </div>
                   <div>
                       <button onClick={this.handleSubmit}>submit</button>
                   </div> */}

                </form>
               
            </div>
        );
    }
}
export default MemberView;