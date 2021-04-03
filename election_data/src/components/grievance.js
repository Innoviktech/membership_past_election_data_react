import React, { Component } from 'react'
import axiosInstance from '../axios';
import Select from 'react-select';
import MaterialTable from "material-table";
import FilterList from '@material-ui/icons/FilterList';
import { forwardRef } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import $ from 'jquery';
// import User from './user';
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom';

class Grievance extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        values: [],
        dynamic : [],
        answer : [],
        user : "",
        username : [],
        uservalue : [],
        detailview : [],
        admin_view : '',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

      axiosInstance.get(`grievance/`).then((testing) => {
        const dynamic = testing.data;
        // console.log(question)
        this.setState({dynamic});
      })

      const user =localStorage.getItem('user')
      console.log(user)
      this.setState({user})

      axiosInstance.get(`username/`).then((testing) => {

        const detailview = testing.data;
        this.setState({ detailview})

      });

      const roles =  localStorage.getItem('role')
      console.log(roles)
      if(roles == 'is_staff'){
          this.setState({admin_view:true})
      }
      else{
          this.setState({admin_view:false})
      }
      $("th").removeClass("MTableHeader-header-13");

    }


  
    createUI(){
       return this.state.values.map((el, i) => 
       
           <div key={i}>
              <textarea type="text" value={el||''} onChange={this.handleChangequestion.bind(this, i)} required/>
              <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
           </div>          
       )
    }

    Question (){
      return this.state.dynamic.map((el, i) =>
      <div className = "row survey">
      <div className="col-sm-6 ques" key={i}>{i+1}{")"}{" "}{el.question}<input type='button' value="delete" onClick={(event) => {this.clickMe(el.id, event)}}/></div>
      <div className="col-sm-6 text-right">
       <textarea type="text" className="text_area" value={el.answer} onChange={this.AhandleChange.bind(this, i)} width="20px"/>
       </div>
      </div>
      )}

      clickMe =(parameter, event) =>{
        axiosInstance.post(`surveyDelete/`, {
          key1:parameter
          }).then((testing) => {
          console.log(testing)
         console.log(testing.data);
         const ques = testing.data;
         this.setState({dynamic:ques})
          
          });
      }
    

   AhandleChange = (i, event) => {
    
    let dynamic = [...this.state.dynamic];
      dynamic[i].answer = event.target.value;
        this.setState({ dynamic });
 }
  
 handleChangequestion = (i, event) => {
       let values = [...this.state.values];
       values[i] = event.target.value;
       this.setState({ values });
    }
    
    addClick = () =>{
      this.setState(prevState => ({ values: [...prevState.values,'']}))
      
    }
    
    removeClick=(i)=>{
        console.log(i)
       let values = [...this.state.values];
       values.splice(i,1);
       this.setState({ values });
    }
  

    handleSubmit = (event) => {

      const val = this.state.values
      console.log(val)
      // this.setState({question : val})
      axiosInstance.post(`grievance/`, {
        key1:val
        }).then((testing) => {
        console.log(testing)
        const ques = testing.data;
        console.log(ques);
        this.setState({dynamic:ques})
        });
      event.preventDefault();
    }

    answerSubmit = (event) =>{
      const question = this.state.dynamic;
      // const answer = this.state.answer;
      const user = this.state.user;
      axiosInstance.post(`surveyAnswer/`, {
        key1:question,key2:user
        }).then((testing) => {
        // console.log(testing)
        const alert_msg = testing.data;
        alert(alert_msg)
       
        });

        event.preventDefault();
    }



  
  
    render() {
      
        console.log(this.state.dynamic)
        const { uservalue } = this.state;
      return (
        
        <div >
              <div id ="admin_view" hidden = {this.state.admin_view}>
                
                  <div className="row ">
                    <div className="col-sm-4 ques_label">
                      <label>Question</label>
                    {this.createUI()} 
                    </div> 
                    <div className="col-sm-4"> 
                   <input type='button' value='Add Your Questions' onClick={this.addClick}/>
                    </div> 
                    <div className="col-sm-4">
                    <input type='button' value='Submit Your Questions' onClick={this.handleSubmit}/>
                    </div>
                    </div>
               
                </div>
            <div>

                  <form  onSubmit={this.answerSubmit}>
                  
                      <div className="question">
                      {this.Question()}
                      </div><br></br>
                      <div className="row">
                        <div className="col-sm-12 text-center">
                      <input className="submit" type="submit" value="Submit" />
                      </div>
                      </div>
                  </form>
              </div><br></br>

          <div id ="admin_view" hidden = {this.state.admin_view}>

        <MaterialTable
        icons={PeopleIcon}
        options={{
        filtering: true,
        grouping: true,
        // actionsColumnIndex: -1,
         
    }}

    
    

    columns={[
      
      { title: "Question",field:"question"},
      
      { title: "Answer",field:"answer"},
     
      { title: "User Name", field: "username"},
      
 
            ]}
            data={this.state.detailview}
            title=""
            />

          </div>
          
        </div>
       
        
      );
    }
  }
  export default Grievance;