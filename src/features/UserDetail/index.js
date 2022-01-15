import React, { Component } from 'react';
import './style.css';
import BG from '../../image/1.png';
import Moment from 'moment';

import { matchPath } from 'react-router-dom/cjs/react-router-dom.min';

class UserDetailFeature extends Component {
    constructor (props) {
      super(props);
      this.state = {
          user: [],
      }
    }

    componentDidMount() {
        const match = matchPath(this.props.history.location.pathname, {
          path: '/userdetail/:userId',
          exact: true,
          strict: false
        })
        const id = match.params.userId;
        console.log('id', id);
        const token = localStorage.getItem('access_token');
        console.log(token);

        fetch(`http://localhost:8080/users/${id}`, {
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
    render () {
        const {user} = this.state;
        Moment.locale('en');
        var dt = Moment(user.dob).format('DD/MM/yyyy');

        var sex='';
        if (user.gender === 'female') {
            sex = 'Nữ';
        }
        else {
            sex = 'Nam';
        }
    return (
        <div className='userdetail'>
            <div className='decos'>
              <p className='helo'><b>XIN CHÀO, TÔI LÀ</b></p>
              <p className='name'><b>{user.fullName}</b></p>
              <p className='id'><b>Mã người dùng: {user.userId}</b></p>
            </div>
            <div className="infodetail">
                <p className='label'><b>Thông tin chi tiết</b><hr/></p>
                <img src={user.avatarUrl} className='avatar' alt="Ảnh đại diện"/>
                <label className="fullName-label"><b>Họ và tên:</b></label>
                <p className="fullname"><b>{user.fullName}</b></p>
                <label className="mssv-label"><b>Mã số sinh viên:</b></label>
                <p className="msv"><b>{user.studentId}</b></p>
                <label className="gender-label"><b>Giới tính:</b></label>
                <p className="gen"><b>{sex}</b></p>
                <label className="sn-label"><b>Ngày sinh:</b></label>
                <p className="sn"><b>{dt}</b></p>
                <label className="fac-label"><b>Thuộc khoa:</b></label>
                <p className="fac"><b>{user.faculty}</b></p>
                <label className="maj-label"><b>Ngành học:</b></label>
                <p className="maj"><b>{user.major}</b></p>
                <label className="mail-label"><b>Email:</b></label>
                <p className="mail"><b>{user.email}</b></p>
            </div>
        </div>
    );
    }
}

export default UserDetailFeature;