import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

class ClbMembersFeature extends Component {
    constructor(props) {
    super(props)
    this.state = {
       members: [],
       role: '',
       loading: true
    };
    this.handleChange = this.handleChange.bind(this);
 }

 handleChange(e){
    this.setState ({role: e.target.value});
    const value=queryString.parse(this.props.location.search);
    const clubId=value.clubId;
    
    const roles = this.state.role;
    console.log('role', roles);

   fetch(`http://localhost:8080/clubs/${clubId}/members?role=`, {
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json'
       }
   })
         .then(response => response.json())
         .then(members => {
            let details = [];

            for (var i in members.content) {
                details.push({ name: i, value: members.content[i] })
            }

             this.setState({
                 members: details,
                 loading: true,
             })
         })
      .catch(error => console.log(error))
}
    render() {
        console.log(this.state);
        return (
            <div className='member-form'>
               <h3 className='table-name'><b>CÁC THÀNH VIÊN</b></h3>
               <div className="role-area">
                <select 
                    className='role-text'
                    value={this.state.role}
                    onChange={this.handleChange}
                    required
                >
                    <option value="ROLE_MEMBER">Thành viên</option>
                    <option value="ROLE_MODERATOR">Người chỉnh sửa</option>
                    <option value="ROLE_LEADER">Chủ nhiệm</option>
                </select>
              </div>
              <table className='table'>
                  <thead>
                     <tr>
                        <th>Họ  và tên</th>
                        <th>Mã số sinh viên</th>
                        <th>Giới tính</th>
                        <th>Ngành học</th>
                        <th>Khoa</th>
                     </tr>
                  </thead>
                  <tbody>
                  {this.state.members.map((item) => (
                        <tr>
                           <Link className='row-link' to={`/clubdetail/${item.value.userId}`}> <td>{item.value.fullName}</td></Link>
                           <td>{item.value.studentId}</td>
                           <td>{item.value.gender}</td>
                           <td>{item.value.major}</td>
                           <td>{item.value.faculty}</td>
                        </tr>
                      ))}
                  </tbody>
              </table>

            </div>
        );
    }
}

export default ClbMembersFeature;