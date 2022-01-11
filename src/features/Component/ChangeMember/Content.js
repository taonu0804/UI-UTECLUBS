import React, { Component } from 'react';
import './style.css';
import Validator from '../../../utils/validator.js';
import { matchPath } from 'react-router';

class ChangeComponent extends Component {
    constructor(props) {
    super(props)
    this.state = {
        userId: '',
        showLead: true,
        showMod: true,
        showMem: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
 }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        const role = this.props.role;
        console.log(role);

        if (role === 'ROLE_LEADER') {
            this.setState({showLead: false});
        }
        else if (role === 'ROLE_MODERATOR') {
            this.setState({showMod: false});
        }
        else {
            this.setState({showMem: false});
        }
    }

    handleAdd(e) {
        const token = localStorage.getItem('access_token');
        console.log(token);
        
        const id = this.props.clubId;
        console.log(id);

        const userId = this.props.userId;
        console.log(userId);
        this.setState({userId: userId})

        fetch('http://localhost:8080/admin/club-management/' + `${id}` + '/change-role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(this.state),
        },
        {withCredentials: false}
        )
            .then((response) => {
                response.json();
            })
            .catch((error) => console.log('error', error))
    };

    render() {
        return (
            <div className='rolemanage'>
                <h1 className='rolemanage-title'>Quản lý thành viên</h1>
                <hr/>
                <div className='addmember'>
                    <h5 className='addtxt'><b>Thay đổi vai trò thành viên: </b></h5>
                    <input type='text' className='studentId' placeholder='Nhập mã số sinh viên' defaultValue={this.props.fullName}/>
                    <select
                    className='roleInClub'
                    name='newRole'
                    onChange={this.handleChange}
                >
                    <option value="#">Chọn chức danh</option>
                    <option value="ROLE_LEADER" style={{display: this.state.showLead ? 'block' : 'none'}}>Chủ nhiệm</option>
                    <option value="ROLE_MODERATOR" style={{display: this.state.showMod ? 'block' : 'none'}}>Người chỉnh sửa</option>
                    <option value="ROLE_MEMBER" style={{display: this.state.showMem ? 'block' : 'none'}}>Thành viên</option>
                </select><br/>
                    <button className='addsubmit' onClick={this.handleAdd}>Thay đổi</button>
                </div>
            </div>
        );
    }
}

export default ChangeComponent;