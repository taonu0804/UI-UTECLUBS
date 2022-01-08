import React, { Component } from 'react';
import './style.css';
import BG from '../../image/Dawn\ live\ wallpaper.gif';
import NOTJOIN from '../../image/ingroup.png';
import JOINED from '../../image/group.png';
import LEAD from '../../image/leader.png';
import { Link } from "react-router-dom";

class UserWelcomeFeature extends Component {
    constructor (props) {
    super(props);
    this.state = {
        userclubs: [],
        loading: false
    }
}

    componentDidMount() {
        const token = localStorage.getItem('access_token');
        console.log('userId', token);

       fetch('http://localhost:8080/club-management', {
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
        const {userclubs} = this.state; 
        console.log(this.state);
        const clubId = userclubs.map((item) => ( item.clubId ));
    return (
        <div className='welcome-form'>
            <img className='bg-area' src={BG}/>
            <h3 className='welcome-txt'><b>Xin chào, Tạ Thị Mai Hương</b></h3>
            <div className='clbbtn-group'>
                <div className='manageclb'>
                    <img className='logobtn' src={LEAD}/><br/>
                    <Link className='managebtn' to={`/newfeed/${clubId}`}><b>Quản lý CLB</b></Link>
                </div>
                <div className='joinedclb'>
                    <img className='logobtn' src={JOINED}/><br/>
                    <Link className='joinedbtn' to='/joinedclb'><b>Nhóm đã tham gia</b></Link>
                </div>
                <div className='notjoinedclb'>
                    <img className='logobtn' src={NOTJOIN}/><br/>
                    <Link className='notjoinedbtn' to='/notjoinedclb'><b>Nhóm chưa tham gia</b></Link>
                </div>
            </div>
        </div>
    );
}}

export default UserWelcomeFeature;