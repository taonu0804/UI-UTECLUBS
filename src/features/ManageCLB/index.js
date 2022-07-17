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
            <div className='item1'>
               <div className="w3-third-w3-container-w3-margin-bottom">
                  <img src={item.logoUrl} alt="Norway" className="logoimg"/>
                  <div className="w3-container-w3-white">
                        <Link to={`/newfeed/${item.clubId}`}><b>{item.clubName}</b></Link>
                        <p>{item.affiliatedUnit}</p>
                        <p>{item.description}</p>
                  </div>
               </div>
            </div>)
        });
         return (
            <div className='joinbody'>
               <h3 className='o-name'><b>CÁC CÂU LẠC BỘ</b></h3><hr className='line'/>
                 <div className="w3-row">
                    {notjoin.length ? notjoin : <p>Bạn chưa tham gia câu lạc bộ nào</p>}
                 </div>
            </div>
          );
    }
}

export default ManageCLBFeature;