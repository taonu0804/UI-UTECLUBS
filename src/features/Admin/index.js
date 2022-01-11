import React, { Component, useState } from 'react';
import './style.css';
import ADMIN from '../../image/admin.png';
import CTXH from '../../image/ctxh.jpg';
import KN from '../../image/kn.png';
import ESC from '../../image/esc.png';
import TNXK from '../../image/tnxk.png';
import { useHistory } from 'react-router-dom';

class AdminFeature extends Component {
    constructor (props) {
      super(props);
      this.state = {
          user: [],
      }

      this.handleClubManagement = this.handleClubManagement.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('access_token');
        console.log(token);

        fetch('http://localhost:8080/users/current-user', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        {withCredentials: false})
            .then((response) => response.json())
            .then(item => {
                this.setState({ user: item });
                console.log('item', item);
            });
    }

    handleClubManagement() {
        this.props.history.push('/clubmanage');
    }

    handleLogout() {
        this.props.history.push(`/infochange/${this.state.user.userId}`);
    }
    render() {
    return (
        <div>
            <img className='admin-bg' src={ADMIN}/>
            <p className='welcome-txt'><b>Xin chào<br/><span className='fullname'>{this.state.user.fullName}</span></b></p>
            <div className='adminbtn-group'>
                <button className='admin-btn' onClick={this.handleClubManagement}><b>Quản lý CLB</b></button>
                <button className='admin-btn' onClick={this.handleLogout}><b>Trang cá nhân</b></button>
            </div>

            <div className='clb-group'>
                <img className='clb-img' src={KN}/>
                <img className='clb-img' src={TNXK}/>
                <img className='clb-img' src={ESC}/>
                <img className='clb-img' src={CTXH}/>
            </div>
        </div>

    );
    }
}

export default AdminFeature;