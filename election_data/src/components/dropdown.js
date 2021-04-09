import React, { Component } from 'react';
class dropdown extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
          values : [],
        };
       
      }
    addClick = () =>{
        this.setState(prevState => ({ values: [...prevState.values,'']}))
        
      }
    render(){
        return(
            <div>
                <input type='button' value='Add Your Questions' onClick={this.addClick}/>
            </div>
        )
    }
}
export default dropdown