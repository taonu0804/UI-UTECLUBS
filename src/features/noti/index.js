import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { matchPath } from 'react-router';
import ACC from '../../image/acc.png';
import REJ from '../../image/rej.png';

class NotiFeature extends Component {
    constructor(props) {
       super(props)
       this.state = {
          students: [],
          loading: true,
       };
       this.handleAcc = this.handleAcc.bind(this);
       this.handleRej = this.handleRej.bind(this);
    }

    componentDidMount(){
      const token = localStorage.getItem('access_token');
      console.log('userId', token);

      const match = matchPath(this.props.history.location.pathname, {
        path: '/noti/:clubId',
        exact: true,
        strict: false
      })
      const id = match.params.clubId;
      console.log('id', id);

     fetch(`http://localhost:8080/club-management/${id}/member-requests?page=0`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
     })
           .then(response => response.json())
           .then(students => {
              console.log('students', students);
              var data=[];

              for (var i in students.content)
              {
                 data.push({name: i, value: students.content[i]});
              }
               this.setState({
                  students: data,
               })
           })
        .catch(error => console.log(error))
  }

  handleAcc(userId) {
   const token = localStorage.getItem('access_token');
   const match = matchPath(this.props.history.location.pathname, {
       path: '/noti/:clubId',
       exact: true,
       strict: false
   })
   const id = match.params.clubId;
   console.log('id', id);
   const body = {
      userId: userId,
   }
   fetch(`http://localhost:8080/club-management/${id}/member-requests`, {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify(body),
   })
       .then(response => {response.json();
           console.log(response);
           alert('Đã duyệt thành viên');
           window.location.reload();
       })
       .catch((e) => {
           console.log('error', e);
       })
  }

  handleRej(userId) {
   const token = localStorage.getItem('access_token');
   const match = matchPath(this.props.history.location.pathname, {
       path: '/noti/:clubId',
       exact: true,
       strict: false
   })
   const id = match.params.clubId;
   console.log('id', id);
   if (window.confirm('Bạn muốn từ chối yêu cầu này?') == true){
   fetch(`http://localhost:8080/club-management/${id}/member-requests/${userId}`, {
       method: 'DELETE',
       headers: {
           Authorization: `Bearer ${token}`,
       },
   })
       .then(response => {response.json();
           console.log(response);
           alert('Đã từ chối yêu cầu');
           window.location.reload();
       })
       .catch((e) => {
           console.log('error', e);
       })
      }
      else{
         return;
      }
  }

    render() {
      const st = this.state.students.map((item) => {
         return (
            <tr>
               <Link className='row-link' to={`/userdetail/${item.value.userId}`}> <td>{item.value.userId}</td></Link>
               <td>{item.value.fullName}</td>
               <td>{item.value.studentId}</td>
               <td><button className='acc' onClick={() => {this.handleAcc(item.value.userId)}}><img src={ACC} className='acc'/></button><button className='rej' onClick={() => {this.handleRej(item.value.userId)}}><img src={REJ} className='rej'/></button></td>
            </tr>)
      });
        return (
            <div className='club-form'>
            <h3 className='table-name'><b>CÁC YÊU CẦU MỚI</b></h3>
               <table className='table'>
                   <thead>
                      <tr>
                         <th>User ID</th>
                         <th>User Name</th>
                         <th>Student ID</th>
                         <th>Thao tác</th>
                      </tr>
                   </thead>
                   <tbody>
                      {st.length ? st : <p>Chưa có đăng ký mới</p>}
                   </tbody>
               </table>
            </div>
         );
   }
}

export default NotiFeature;