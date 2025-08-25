import React, { Component } from 'react'
import axiosInstance from '../axios';
import Select from 'react-select';
import MaterialTable from "material-table";
import FilterList from '@material-ui/icons/FilterList';
import { forwardRef } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import $ from 'jquery';
import { TiDelete} from "react-icons/ti";
import { IoIosAddCircleOutline} from "react-icons/io";

// import User from './user';
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom';
import { icons } from 'react-icons/lib';

class Grievance extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        values: [],
        question : [],
        dynamic : [],
        answer : [],
        user : "",
        username : [],
        uservalue : [],
        detailview : [],
        admin_view : '',
        staff_view : '',
        test : [],
        sub_ques : true,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

      axiosInstance.get(`grievance/`).then((testing) => {
        const question = testing.data;
        this.setState({question});
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
          this.setState({admin_view:true,staff_view:false})
      }
      else if(roles == 'is_superuser'){
          this.setState({admin_view:false,staff_view:true})
      }
      $("th").removeClass("MTableHeader-header-13");

    }
    
    createUI(){

       return this.state.test.map((el, i) => 
       
           <div key={i}>
             
              <textarea type="text" value={el.question} onChange={this.Changequestion.bind(this, i)} required></textarea>
              <span className="rm_icon" onClick={this.removeClick.bind(this, i)}><TiDelete /></span>
              {/* <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/> */}
          <div>
           <input type="button" value="choice" onClick={this.choice.bind(this, i)}></input>
           
           </div><br></br>
           <div>
           {el.choice.map((ell,ix) => (
             <div key={ix}>
                      <input type="text" value={ell} name={i} onChange={this.changechoice.bind(this, ix)}></input>
                      {/* <span className="rm_icon" name={i} onClick={this.removeChoice.bind(this, ix)}>&times;</span> */}
                      <button  name={i} onClick={this.removeChoice.bind(this, ix)}>&times;</button>
                      </div>
                    ))} 
           </div>
           </div>          
       )
    }

    removeChoice=(ix,event)=>{
      
      let questionIndex = event.target.name;
      console.log(questionIndex)
      console.log(ix)

     let values =this.state.test;
     values[questionIndex].choice.splice(ix,1);
     this.setState({ test : values });
  }


    AhandleChange = (i, event) => {
    
      let dynamic = [...this.state.dynamic];
        dynamic[i].answer = event.target.value;
          this.setState({ dynamic });
   }
  
   


    Changequestion = (i, event)=>{
        let test = [...this.state.test];
        test[i].question = event.target.value;
        this.setState({test})
}

        changechoice = (ix,event)=>{
        console.log(ix)
        let questionIndex = event.target.name;
        console.log(questionIndex)
        let test = [...this.state.test];
        test[questionIndex].choice[ix] = event.target.value;
          this.setState({ test });

        }


choice = (i,event)=>{

let array = this.state.test
array[i].choice.push('')
console.log(array)
this.setState({test:array})

}


Question (){
  return this.state.question.map((el, i) =>
  <div className = "row survey">
  <div className="col-sm-6 ques" key={i}>{i+1}{")"}{" "}{el.question}<span hidden = {this.state.admin_view} onClick={(event) => {this.clickMe(el.id, event)}}><TiDelete/></span></div>

  {(() => {
          if (el.choice.length > 0) {
            return (
              <div className="col-sm-6 ques">
              <select onChange={this.answerSubmit.bind(this, i)} required>
              <option disabled="True" value ="" selected>Select</option>
                {el.choice.map((option,index) => (
                  
                    <option>{option}</option>
                ))}
                </select>
            </div> 
            )
          } 
          else {
            return (
              <div className="col-sm-6 ques"><textarea type="text" className="text_area" value={el.answer} onChange={this.answerSubmit.bind(this, i)} width="20px" required/></div>
            )
          }
        })()}

  </div>
  )}

  clickMe =(parameter, event) =>{
   const confirm =  window.confirm("Are you want to delete this question...?")
   if(confirm==true){
     
    console.log(parameter)
    axiosInstance.post(`surveyDelete/`, {
      key1:parameter
      }).then((testing) => {
      console.log(testing)
     console.log(testing.data);
     const question = testing.data;
     this.setState({question})
      
      });
   }
  }

   
 handleChangequestion = (i, event) => {
       let values = [...this.state.values];
       values[i] = event.target.value;
       this.setState({ values });
    }
    // test[i].choice = ;

    addClick = () =>{
      this.setState(prevState => ({ test: [...prevState.test,{question : '',choice: []}]}))
   this.setState({
     sub_ques : false
   })
  
  }
    
    removeClick=(i)=>{
        console.log(i)
       let test = [...this.state.test];
       test.splice(i,1);
       this.setState({ test });
    }
  

    handleSubmit = (event) => {

      const val = this.state.test
      console.log(val)
      // this.setState({question : val})
      axiosInstance.post(`grievance/`, {
        key1:val
        }).then((testing) => {
        console.log(testing)
        const ques = testing.data;
        console.log(ques);
        this.setState({question:ques})
        });
        const holder = []
        this.setState({
          test:holder
        })
      event.preventDefault();
    }

    answerSubmithandler = (event) =>{
      const question = this.state.question;
      console.log(question)
      // const answer = this.state.answer;
      const user = this.state.user;
      axiosInstance.post(`surveyAnswer/`, {
        key1:question,key2:user
        }).then((testing) => {
        // console.log(testing)
        const detailview = testing.data;
        console.log(detailview)
         if (typeof detailview == 'object') {
          alert("Submitted Successfully")
          // const holder = []
          // this.setState({
          //   answer : []
          // })
        }
        else{
          alert("Failed to Submit")
        }
       
        this.setState({ 
          detailview,
          //  question : holder,
        })
        
        });
        

        event.preventDefault();
    }

    answerSubmit = (i,event) =>{
      console.log(i)

      let question = [...this.state.question];
      question[i].answer = event.target.value;
        this.setState({ question });

    }
render() {
      
        console.log(this.state.test)
        // console.log(this.state.test[0].choice)
        const { uservalue } = this.state;
      return (
        
        <div >
              <div id ="admin_view" hidden = {this.state.admin_view}>
                
                  <div className="row ques">
                    <div className="col-sm-4 ques_label">
                      <label >Question<span onClick={this.addClick}><IoIosAddCircleOutline /> </span> </label>
                    {this.createUI()} 
                    </div> 
                    {/* <div className="col-sm-4 "> 
                   <input type='button' value='Add Your Questions' />
                    </div>  */}
                    <div className="col-sm-4 " id="sques" hidden={this.state.sub_ques}>
                    <input type='button' value='Submit Your Questions' onClick={this.handleSubmit}/>
                    </div>
                    </div>
               
                </div>
            <div>

             <form  onSubmit={this.answerSubmithandler}> 
                  
                  <div className="question">
                  {this.Question()}
                  </div><br></br>
                  <div className="row">
                    <div hidden={this.state.staff_view} className="col-sm-12 text-center">
                  <input className="submit" type="submit" value="Submit"/>
                  </div>
                  </div>
               </form> 
              </div><br></br>

          <div  className="material" id ="admin_view" hidden = {this.state.admin_view}>

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