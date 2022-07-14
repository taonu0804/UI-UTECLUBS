import React, { Component } from 'react';
import './style.css';

class ParticipantListFeature extends Component {
    constructor(props) {
        super(props)
        this.state = {
           parts: [],
           loading: true
        };
     }

     componentDidMount(){
        const token = localStorage.getItem('access_token');
        console.log('userId', token);
         fetch('https://uteclubs.herokuapp.com/users/not-joined-clubs', {
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
         return (
            <div className='club-form'>
            <h3 className='tablepart-name'><b>DANH SÁCH NGƯỜI THAM GIA</b></h3>
           <table className='table'>
               <thead>
                  <tr>
                     <th>MSSV</th>
                     <th>Họ và tên</th>
                     <th>Giới tính</th>
                     <th>Ngành</th>
                     <th>Khoa</th>
                     <th>Email</th>
                     <th>Diểm danh</th>
                  </tr>
               </thead>
               <tbody>
                
               </tbody>
           </table>

         </div>
    );
    }
}

export default ParticipantListFeature;