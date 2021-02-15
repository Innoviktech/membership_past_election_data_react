import React from 'react';
import reactDom from 'react-dom';
import axios from "axios";
class Member_count extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            constituency_data : [],
            constituency_result : "",
        }
    }
    componentDidMount() {
        axios.get('http://localhost:8000/constituency/')
          .then(res => {
            const constituency_data = res.data;
            this.setState({ constituency_data });
          })
      }

      constituency = ({ target: { value } }) => {
        
        this.setState({
            constituency_result:value
        })
        console.log(value);
        // axios.post('http://localhost:8000/university_filter/', {
        //   key1:value
        // })
        // .then((testing) => {
        //   const select_university=testing.data;
        //     this.setState({ select_university });
        // });
        // $( "#reset" ).empty();
        }
    render()
    {
        console.log(this.state.constituency_result)
        return(
           <div>
               <div>
                <label>Constituency</label>
                <select name="constituency"  onChange={this.constituency}>
                    <option disabled="True" selected>Select Your Constituency</option>
                    {this.state.constituency_data.map((option,index) => (
                      <option value={option.id}>{option.constituency}</option>
                      ))}
                </select>
              </div>
            
           </div>
            
        );
    }
}
export default Member_count;