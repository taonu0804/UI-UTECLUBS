import React, { Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import IMG from '../../image/edit.png';
import jwt from 'jwt-decode';

class NotJoinedCLBFeature extends Component {
    constructor(props) {
        super(props)
        this.state = {
           clubs: [],
           loading: true
        };
     }
 
     componentDidMount(){
      const token = localStorage.getItem('access_token');
      console.log('userId', token);
       fetch('http://localhost:8080/users/not-joined-clubs', {
         headers: {
           Authorization: `Bearer ${token}`,
           Accept: 'application/json',
           'Content-Type': 'application/json'
         }
      })
             .then(response => response.json())
             .then(clubs => {
                 this.setState({
                     clubs: clubs,
                     loading: true,
                 })
             })
          .catch(error => console.log(error))
    }
     render() {
        const notjoin = this.state.clubs.map((item) => {
           return (
             <tr>
                <Link className='row-link' to={`/clbmember/${item.clubId}`}> <td>{item.clubId}</td></Link>
                <td>{item.clubName}</td>
                <td>{item.affiliatedUnit}</td>
                <Link className='row-link' to={`/userclubdetail/${item.clubId}/notjoin`}> <td><img className='delbtn' src={IMG}/></td></Link>
             </tr>)
        });
         return (
             <div className='club-form'>
                <h3 className='table-name'><b>CÁC CÂU LẠC BỘ</b></h3>
               <table className='table'>
                   <thead>
                      <tr>
                         <th>Club ID</th>
                         <th>Club Name</th>
                         <th>Unit</th>
                         <th>Tham gia</th>
                      </tr>
                   </thead>
                   <tbody>
                      {notjoin.length ? notjoin : <p>Bạn đã tham gia hết câu lạc bộ</p>}
                   </tbody>
               </table>
 
             </div>
          );
    }
}

export default NotJoinedCLBFeature;