// import React from "react";
// import {BrowserRouter as Router,Link,Switch,Route,Redirect} from 'react-router-dom';

// import reactDom from 'react-dom';
// import { Dropdown } from "semantic-ui-react";
// import axiosInstance from "../axios";



//   const countryOptions = [
//   {  text : 'Afghanistan' },
  
//   { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
  
//        ]

// class Demo extends React.Component {

//   constructor(props){
//     super(props);
//     this.state = {
//       state_value : [],
//       state_change_value : "",
//     }
//   }
// componentDidMount(){
//   axiosInstance.get(`state_name/`)
//              .then(res=>{
//                  const state_value = res.data
//                  console.log(state_value)
//                  this.setState({state_value})
//              })
// }
// oc = state_change_value =>{
//   this.setState({
//     state_change_value
//   });
//   console.log(this.state.state_change_value)
// }
  
//   render() {

//     // console.log(this.state.state_change_value)
    

    
//     return (
//       <div>
//         <div>
//         <form>
//         <Dropdown
//         placeholder='Select Country'
//         required
//         fluid
//         search
//         selection
//         onChange={this.oc}
//         value={this.state.state_change_value}
//         options={this.state.state_value}
    
//       />
// <button onClick={this.demoSubmit}>submit</button>
//         </form>

//         </div>
        
        
        
        
       
     
//       </div>
//     );
//   }
// }
// export default Demo;
// import React from "react";
// class Demo extends React.Component{


//     componentDidMount(){
//         const divi = document.createElement("div")
//         divi.className = 'block-2';
//         document.getElementById("division").appendChild(divi)
//         //document.getElementsByClassName("abc").setAttribute("id","idval")
//         document.getElementsByClassName("abc").setAttribute("id","idval")
//     }
//     render(){
//         return(
//             <div id="division">
//                 <div className="abc">

//                 </div>
//                 <div className="xyz">

//                 </div>
//             </div>
//         )
//     }
// }
// export default Demo;