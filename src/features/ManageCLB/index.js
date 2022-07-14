import React, { Component } from 'react';
import './style.css';
import jwt from 'jwt-decode';
import { Link } from 'react-router-dom';

class ManageCLBFeature extends Component {
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
       fetch('https://uteclubs.herokuapp.com/club-management', {
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
                <Link className='row-link' to={`/newfeed/${item.clubId}`}> <td>{item.clubId}</td></Link>
                <td>{item.clubName}</td>
                <td>{item.affiliatedUnit}</td>
             </tr>)
        });
         return (
             <div className='club-form'>
                <h3 className='table-name'><b>CÁC CÂU LẠC BỘ</b></h3>
               <table className='table'>
                   <thead>
                      <tr>
                         <th>ID Câu lạc bộ</th>
                         <th>Tên câu lạc bộ</th>
                         <th>Đơn vị</th>
                      </tr>
                   </thead>
                   <tbody>
                      {notjoin.length ? notjoin : <p>Bạn không quản lý câu lạc bộ nào</p>}
                   </tbody>
               </table>
 
             </div>
          );
    }
}

export default ManageCLBFeature;