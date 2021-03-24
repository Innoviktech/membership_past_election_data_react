import React, { Component } from 'react'

class Grievance extends Component {
    constructor(props) {
      super(props)
  
        this.state = {
            question :[
                { fq:'firstquestion' }, 
                { SQ:'secondquestion'},
                {TQ:'thirdquestion'},
            ],

            // qs : "value"
        }
      }
      
render ()
{
    return(
        <div>
           <div>
               {/* <label>{this.state.question}</label> */}
              <h3>{this.state.question.f}</h3>
           </div>
        </div>
    )
}
}
export default Grievance;