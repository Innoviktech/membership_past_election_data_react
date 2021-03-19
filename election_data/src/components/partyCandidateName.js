// import React, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import Select from 'react-select';
import MaterialTable from "material-table";
import axiosInstance from '../axios';
import $ from 'jquery';
// export default function PartyCandidateName() {

//         const [constituencyData, setconstituencyData] = useState(
//             []
//         );
//         const [constituency, setconstituency] = useState(
//           'null'
//         );

//         useEffect(() => {

//             axiosInstance.get(`constituancy_name/`)
//           .then(res => {
//             console.log(res)
//             const constituencyData = res.data;
//             setconstituencyData(constituencyData);
//           })


//           });
      
//     return(<div>
//       <div className="col-sm-6">
//       <label>Constituency</label>
//       <Select 
//             value={constituency}
//             onChange={event => setconstituency(event.target.value)}
//             options={constituencyData}
//           />
//         </div>
//     </div>)
// }

class PartyCandidateName extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            constituency_data : [],
            polling_station_name_result : [],
            constituency_value : "",
            partyCandidateName : [],
           
        }
    }
    componentDidMount() {
        axiosInstance.get(`constituancy_name/`)
          .then(res => {
            console.log(res)
            const constituency_data = res.data;
            this.setState({ constituency_data });
          })
          $("th").removeClass("MTableHeader-header-13");
    }

        constituency_change = constituency_value => {
            this.setState({constituency_value});
            const vars =constituency_value.value;
            console.log(vars)
            axiosInstance.post(`partyCandidateName/`, {
                key1:vars
            }).then((testing) => {
                const partyCandidateName =testing.data;
                console.log(partyCandidateName)
                this.setState({ partyCandidateName });
                
            });
            
    }

    render()

    {
        const { constituency_value } = this.state;
        const { polling_booth_value } = this.state;

        return(<div>
                   <div>
                        <label>Constituency</label>
                        <Select 
                                value={constituency_value}
                                onChange={this.constituency_change}
                                options={this.state.constituency_data}
                            />
                        </div>
                    <div><br></br>
                    {/* <table>
             <thead>
             <tr>
                <th>Party Name</th>
                 <th>Candidate Name</th>
             </tr>
           </thead>
           <tbody>

            {this.state.partyCandidateName.map((option,index) => (
                   <tr>   
                   <td>{option.partyname}</td>
                   <td>{option.candidatename}</td>
                </tr>
                   ))}

         </tbody>

         </table>  */}

            <MaterialTable
                    columns={[
                        { title: "Party Name", field: "partyname" },
                        { title: "Candidate First Name", field: "candidatefirstname" },
                        { title: "Candidate Last Name", field: "candidatelastname" },
                
                    ]}
                    data={this.state.partyCandidateName}
                    title=""
                    />
                    </div>

             </div>
             )
    }
}
export default PartyCandidateName;