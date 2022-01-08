import React, { Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom';

class JoinedCLBFeature extends Component {
    constructor(props) {
        super(props)
        this.state = {
           loading: true,
           userclubs: [],
        };
     }
 
     componentDidMount(){
        const token = localStorage.getItem('access_token');
        console.log('userId', token);

       fetch('http://localhost:8080/users/joined-clubs', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
       })
             .then(response => response.json())
             .then(clubs => {
                console.log('clubs', clubs);
                 this.setState({
                     userclubs: clubs,
                     loading: true,
                 })
             })
          .catch(error => console.log(error))
    }

     render() {
         return (
             <div className='club-form'>
                <h3 className='table-name'><b>CÁC CÂU LẠC BỘ</b></h3>
               <table className='table'>
                   <thead>
                      <tr>
                         <th>Club ID</th>
                         <th>Club Name</th>
                         <th>Unit</th>
                      </tr>
                   </thead>
                   <tbody>
                      {this.state.userclubs.map((item) => (
                        <tr>
                           <Link className='row-link' to={`/newfeed/${item.clubId}`}> <td>{item.clubId}</td></Link>
                           <td>{item.clubName}</td>
                           <td>{item.affiliatedUnit}</td>
                        </tr>
                      ))}
                   </tbody>
               </table>
 
             </div>
          );
    }
}

export default JoinedCLBFeature;