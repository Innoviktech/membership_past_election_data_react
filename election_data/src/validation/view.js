import axios from "axios";
import React from 'react';
import axiosInstance from '../axios';

class View extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            view : [],


        }
    }
    showimage = () =>{
        axios.get('http://localhost:8000/view/')
                .then(res => {
                    console.log(res.data)
                    const result = res.data;
                    // console.log(result)
                    // const view = result[0]
                    // console.log(view.image)
                    this.setState({ view : result });
                })
    }
    
    render(){
        console.log(this.state.view[0])
        return(
            <div>
                <div>
                    <button onClick={this.showimage}>Show image</button>
                </div>
                {this.state.view.map((options)=>
                 <img src={`http://localhost:8000/media/${options.image}`}></img>
                )}
               
            </div>
        );
    }
}
export default View