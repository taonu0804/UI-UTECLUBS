import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import ClubManagementFeature from '../Component/ClubManagement';

class AdminFeature extends Component {
    constructor (props) {
      super(props);
      this.state = {
          user: [],
      }
    }

    componentDidMount() {
        const token = localStorage.getItem('access_token');
        console.log(token);

        fetch('https://uteclubs.herokuapp.com/users/current-user', {
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
    render() {
    return (
        <div>
            <div className='infoadm-group'>
                <p className='helo'><b>XIN CHÀO</b></p>
                <img className='avaadm' src={this.state.user.avatarUrl}/><br/>
                <Link className='nameadm' to={`/infochange/${this.state.user.userId}`}><b>{this.state.user.fullName}</b></Link>
            </div>

            <div className='adm-club'>
                {<ClubManagementFeature/>}
            </div>
        </div>

    );
    }
}

export default AdminFeature;