import React, { Component } from 'react';
import axiosInstance from '../axios';
import Select from 'react-select';

class MemberView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            member : [],
            constituency_data : [],
            constituency: [{ label: this.props.view.constituancy_name, value: this.props.view.constituancy_name }],
            polling_booth : [{label: this.props.view.polling_station_id, value: this.props.view.polling_station_id}],
            dropdown : true
        }
    }

   componentDidMount()
   {
       this.setState({member : this.props.view})
   }

   edit =()=>{
    axiosInstance.get(`constituancy_name/`)
    .then(res => {
      console.log(res)
      const constituency = res.data;
      console.log(constituency)
      this.setState({ constituency });
    })
    const vars = 1
    axiosInstance.post(`polling_station_name/`, {
        key1:vars
    }).then((testing) => {
        const polling_booth=testing.data;
        this.setState({ polling_booth });
    });

        var i;
        for (i = 0; i < 20; i++) {
           document.getElementsByClassName("edit")[i].removeAttribute("disabled"); 
        }
        this.setState({dropdown:false})
        
   }

   cancel =()=>{
    var i;
    for (i = 0; i < 20; i++) {
        document.getElementsByClassName("edit")[i].setAttribute('disabled', 'disabled');
    }
    this.setState({dropdown:true})
   }

   handleChange(value) {
    this.setState({ constituency: value })
    const vars = value.value
    console.log(vars)
    axiosInstance.post(`polling_station_name/`, {
        key1:vars
    }).then((testing) => {
        const polling_booth=testing.data;
        this.setState({ polling_booth });
    });
}   

pollingBoothChange(value) {
    this.setState({ polling_booth: value })
}
    render()
    {
        console.log(this.state.value)
        console.log(this.state.polling_booth)
        return(
            <div id="view">
               <form onSubmit={this.handlesubmit}>
                   <div><label>First Name</label>
                   <input type="text" className="edit" value={this.state.member.member_id} disabled></input>
                   </div>
                   <div><label>Last Name</label>
                   <input type="text" className="edit" value={this.state.member.last_name} disabled></input>
                   </div>
                   <div>
                   <label>Constituency</label>
                    <Select 
                            value={this.state.constituency}
                            onChange={value => this.handleChange(value)}
                            options={this.state.constituency}
                            isDisabled = {this.state.dropdown}
                        />

                   </div>
                    <div><label>Polling Station Name</label>
                    <Select
                            value={this.state.polling_booth}
                            onChange={value => this.pollingBoothChange(value)}
                            options={this.state.polling_booth}
                            isDisabled = {this.state.dropdown}
                    />
                   </div>
                   <div><label>Voter Details Verified</label>
                   <input type="text" className="edit" value={this.state.member.voter_details_verified} disabled></input>
                   </div>
                   <div><label>Voting Done</label>
                   <input type="text" className="edit" value={this.state.member.voting_done} disabled></input>
                   </div>
                   <div><label>Voter List Part Number & Serial Number</label>
                   <input type="text" className="edit" value={this.state.member.voter_id} disabled></input>
                   </div>
                   <div><label>Part Agent Election Identity Card</label>
                   <input type="text" className="edit" value={this.state.member.election_id_card} disabled></input>
                   </div>
                   <div><label>Party Name</label>
                   <input type="text" className="edit" value={this.state.member.party_name} disabled></input>
                   </div>
                   <div><label>Gender</label>
                   <input type="text" className="edit" value={this.state.member.gender} disabled></input>
                   </div>
                   <div><label>Member Age</label>
                   <input type="text" className="edit" value={this.state.member.age} disabled ></input>
                   </div>
                   <div><label>Birth Date</label>
                   <input type="text" className="edit" value={this.state.member.birth_date} disabled></input>
                   </div>
                   <div><label>Social Classification</label>
                   <input type="text" className="edit" value={this.state.member.caste} disabled></input>
                   </div>
                   <div><label>Ward Number</label>
                   <input type="text" className="edit" value={this.state.member.ward_number} disabled ></input>
                   </div>
                   <div><label>Door Number</label>
                   <input type="text" className="edit" value={this.state.member.door_number} disabled></input>
                   </div>
                   <div><label>Email</label>
                   <input type="text" className="edit" value={this.state.member.email} disabled></input>
                   </div>
                   <div><label>Mobile</label>
                   <input type="text" className="edit" value={this.state.member.mobile} disabled></input>
                   </div>
                   <div><label>Phone</label>
                   <input type="text" className="edit" value={this.state.member.phone} disabled></input>
                   </div>
                   <div><label>Street</label>
                   <input type="text" className="edit" value={this.state.member.street} disabled></input>
                   </div>
                   <div><label>City</label>
                   <input type="text" className="edit" value={this.state.member.city} disabled></input>
                   </div>
                   <div><label>State</label>
                   <input type="text" className="edit" value={this.state.member.state} disabled></input>
                   </div>
                   <div><label>ZIP Code</label>
                   <input type="text" className="edit" value={this.state.member.zip} disabled></input>
                   </div>

                </form>
                  <div>
                       <button onClick={this.edit}>Edit</button>
                   </div>
                   <div>
                       <button onClick={this.cancel}>cancel</button>
                   </div>
            </div>
        );
    }
}
export default MemberView;