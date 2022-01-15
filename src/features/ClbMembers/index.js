import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import ContentComponent from '../Component/AddMember/Content';
import Popup from 'reactjs-popup';
import ADD from '../../image/add.png';
import CHANGE from '../../image/change.png';
import DEL from '../../image/del.png';
import DeleteMemberComponent from '../Component/DeleteMember/Content';
import ChangeComponent from '../Component/ChangeMember/Content';
import jwt from 'jwt-decode';

class ClbMembersFeature extends Component {
    constructor(props) {
    super(props)
    this.state = {
       members: [],
       role: '',
       clubId:'',
       show: false,
       isLoaded: false,
       showBtn: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOff = this.handleOff.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
 }

 handleOff(e) {
     this.setState({show: false})
 }

 componentDidMount() {
     const token = localStorage.getItem('access_token');
    const match = matchPath(this.props.history.location.pathname, {
        path: '/clbmember/:clubId',
        exact: true,
        strict: false
    })
    const id = match.params.clubId;
    console.log('id', id);

    const roleadm = jwt(token);
    console.log('role', roleadm);
    if (roleadm.roles[0] === 'ROLE_ADMIN') {
        this.setState({showBtn: true});
    }
    else {
        fetch(`http://localhost:8080/clubs/${id}/get-role`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            if (response.status === 400 ) {
                this.setState({showBtn: false});
            }
            console.log(response.statusText);
            return response.text();
        })
        .then(item => {
            console.log(item);
            this.setState({role: item});
            if (item === 'ROLE_LEADER') {
                this.setState({showBtn: true});
            }
            else {
                this.setState({showBtn: false});
            }
        })
    }
 }

 handleBlur(e) {
    const match = matchPath(this.props.history.location.pathname, {
        path: '/clbmember/:clubId',
        exact: true,
        strict: false
    })
    const id = match.params.clubId;
    console.log('id', id);

    this.setState({
        show: true,
        clubId: id,
     })
 }

 handleChange(e){
    this.setState ({
        [e.target.name]: e.target.value,
        isLoaded: true,
    });
}

    handleView(e) {
        const match = matchPath(this.props.history.location.pathname, {
            path: '/clbmember/:clubId',
            exact: true,
            strict: false
        })
        const id = match.params.clubId;
        console.log('id', id);

        var role = this.state.role;
        console.log(role);

        const token = localStorage.getItem('access_token');
        const roleadm = jwt(token);
        console.log('role', roleadm);
        if (roleadm.roles[0] !== 'ROLE_ADMIN') {
            if (role === 'ROLE_LEADER') {
                this.setState({showBtn: false});
            }
            else if (this.state.role === 'ROLE_LEADER') {
                this.setState({showBtn: true});
            }
            else {
                this.setState({showBtn: false});
            }
        }
        else {
            this.setState({showBtn: true});
        }

    fetch(`http://localhost:8080/clubs/${id}/members?role=${role}`, {
        headers: {
            Accept: 'application/json',
        }
    })
            .then(response => response.json())
            .then(members => {
                console.log(members);
                let details = [];

                for (var i in members) {
                    details.push({ name: i, value: members[i] })
                }

                this.setState({
                    members: details,
                    loading: true,
                })
            })
        .catch(error => console.log(error))
    }

    handleDel(userId) {
        const match = matchPath(this.props.history.location.pathname, {
        path: '/clbmember/:clubId',
        exact: true,
        strict: false
    })
    const id = match.params.clubId;
    console.log('id', id);

    const token = localStorage.getItem('access_token');

    fetch(`http://localhost:8080/club-management/${id}/remove-member/${userId}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => {response.json()
            console.log(response);
            alert('Xóa thành công');
        })
        .catch(error => console.log(error))
    }

    render() {
        console.log(this.state);
        var value = this.state.members.map((item) => {
            var sex = '';
            if (item.value.gender === 'female') {
                sex = 'Nữ';
            }
            else {
                sex = 'Nam';
            }
            return (
              <tr>
                 <Link className='row-link' to={`/userdetail/${item.value.userId}`}> <td>{item.value.fullName}</td></Link>
                 <td>{item.value.studentId}</td>
                 <td>{sex}</td>
                 <td>{item.value.faculty}</td>
                 <td style={{display: this.state.showBtn ? 'block' : 'none'}}><Popup modal trigger={<button className='delete'><img src={DEL} className='delete' onClick={this.handleBlur}/></button>}>
                      {<DeleteMemberComponent userId={item.value.userId} clubId={this.state.clubId} handleBlur={this.state.show}/>}
                  </Popup>
                  <Popup modal trigger={<button className='change'><img src={CHANGE} className='change' onClick={this.handleBlur}/></button>}>
                      {<ChangeComponent userId={item.value.userId} clubId={this.state.clubId} role={this.state.role} fullName={item.value.fullName}/>}
                  </Popup></td>
              </tr>)
        });
        return (
            <div className='member-form' style={{filter: this.state.show ? 'grayscale(50%) blur(5px)' : 'none'}}>
                <div className='adminbtn' style={{display: this.state.showBtn ? 'block' : 'none'}}>
                    <Popup modal trigger={<button className='add'><img src={ADD} className='add' onClick={this.handleBlur}/></button>}>
                        {<ContentComponent clubId={this.state.clubId}/>}
                    </Popup>
                </div>
               <h3 className='table-name' onClick={this.handleView}><b>CÁC THÀNH VIÊN</b></h3>
               <div className="role-area">
                <select
                    className='role-text'
                    name='role'
                    value={this.state.role}
                    onChange={this.handleChange}
                    required
                >
                    <option value="#">Chọn vai trò</option>
                    <option value="ROLE_MEMBER">Thành viên</option>
                    <option value="ROLE_MODERATOR">Người chỉnh sửa</option>
                    <option value="ROLE_LEADER">Chủ nhiệm</option>
                </select>
              </div>
              <table className='table' onClick={this.handleOff}>
                  <thead>
                     <tr>
                        <th>Họ  và tên</th>
                        <th>Mã số sinh viên</th>
                        <th>Giới tính</th>
                        <th>Khoa</th>
                        <th style={{display: this.state.showBtn ? 'block' : 'none'}}>Tác vụ</th>
                     </tr>
                  </thead>
                  <tbody>
                    {value.length ? value : <p className='empty'>Không có thành viên nào. Vui lòng chọn vai trò khác</p>}
                  </tbody>
              </table>

            </div>
        );
    }
}

export default ClbMembersFeature;