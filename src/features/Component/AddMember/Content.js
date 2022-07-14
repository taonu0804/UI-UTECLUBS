import React, { Component } from 'react';
import './style.css';
import Validator from '../../../utils/validator.js';
import { matchPath } from 'react-router';
import jwt from 'jwt-decode';

class ContentComponent extends Component {
    constructor(props) {
    super(props)
    this.state = {
        newmem: [],
        errors: {},
        showRole: true,
    };

    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;

    const rules = [
      {
        field: 'studentId',
        method: 'isLength',
        args: [{min: 8}],
        args: [{max: 8}],
        validWhen: true,
        message: 'The student ID must be 8 characters.',
      },
    ];
    this.validator = new Validator(rules);

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
 }
 componentDidMount() {
     const token = localStorage.getItem('access_token');
     const role = jwt(token);

     if (role.roles === 'ROLE_ADMIN') {
         this.setState({showRole: true});
     }
     else {
         this.setState({showRole: false});
     }
 }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleAdd(e) {
        this.setState({
          errors: this.validator.validate(this.state),
        });
        const token = localStorage.getItem('access_token');
        console.log(token);
        const id = this.props.clubId;
        
        const roleadm = jwt(token);
        console.log('role', roleadm);
        if (roleadm.roles[0] === 'ROLE_ADMIN') {
        fetch('https://uteclubs.herokuapp.com/admin/club-management/' + `${id}` + '/add-person', {
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
                if (response.status === 400) {
                        alert('Thành viên đã ở trong câu lạc bộ');
                }
                if (response.status === 404) {
                    alert('Người dùng không tồn tại');
                }
                if (response.status === 200) {
                    alert('Đã thêm thành viên vào Câu lạc bộ');
                    window.location.reload();
                }
            })
            .catch((error) => console.log('error', error))
        }
        else {
            fetch('https://uteclubs.herokuapp.com/club-management/' + `${id}` + '/add-members', {
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
                if (response.status === 400) {
                        alert('Thành viên đã ở trong câu lạc bộ');
                }
                if (response.status === 404) {
                    alert('Người dùng không tồn tại');
                }
                if (response.status === 200) {
                    alert('Đã thêm thành viên vào Câu lạc bộ');
                    window.location.reload();
                }
            })
            .catch((error) => console.log('error', error))
        }

    };

    render() {
        const {errors} = this.state;
        return (
            <div className='rolemanage'>
                <h1 className='rolemanage-title'>Quản lý thành viên</h1>
                <hr/>
                <div className='addmember'>
                    <h5 className='addtxt'><b>Thêm thành viên: </b></h5>
                    <input type='text' className='studentId' placeholder='Nhập mã số sinh viên' name='studentId' onChange={this.handleChange}/>
                    {errors.studentId && <div className="validation" style={{display: 'block'}}>{errors.studentId}</div>}
                    <select
                    className='roleInClub'
                    name='roleInClub'
                    onChange={this.handleChange}
                >
                    <option value="#">Chọn chức danh</option>
                    <option value="ROLE_LEADER" style={{display: this.state.showRole ? 'block' : 'none'}}>Chủ nhiệm</option>
                    <option value="ROLE_MODERATOR">Người chỉnh sửa</option>
                    <option value="ROLE_MEMBER">Thành viên</option>
                </select><br/>
                    <button className='addsubmit' onClick={this.handleAdd}>Thêm</button>
                </div>
            </div>
        );
    }
}

export default ContentComponent;