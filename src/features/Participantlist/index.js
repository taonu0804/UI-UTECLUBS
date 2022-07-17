import React, { Component } from 'react';
import './style.css';
import { matchPath } from 'react-router';
import { Link } from 'react-router-dom';

class ParticipantListFeature extends Component {
    constructor(props) {
        super(props)
        this.state = {
           mems: [],
           showAb: false,
           loading: true
        }
        
        this.handleInput = this.handleInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
     }

     handleInput(e) {
         this.setState({
             [e.target.name]: e.target.value,
         })
     }
    
     handleSearch() {
        const match = matchPath(this.props.history.location.pathname, {
            path: '/participant/:eventId',
            exact: true,
            strict: false
        })
        const id = match.params.eventId;
        console.log('id', id);
         const token = localStorage.getItem('access_token');
         const body ={
             search: this.state.search,
         }
         fetch(`https://uteclubs.herokuapp.com/events/${id}/participants/find?query=1234560`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`,
             },
             body: JSON.stringify(body),
         })
             .then(response => {
                 console.log(response.statusText);
                 return (response.text());
             }).then(item => {
                 console.log(item);
                 if (item !== '') {
                     const arr = JSON.parse(item);
                     console.log(arr);
                     var data = [];
    
                     for (var i in arr)
                     {
                         data.push({name: i, value: arr[i]})
                     }
    
                     this.setState({mems: data});
                 }
                 else {
                     alert('Không có kết quả');
                 }
             })
             .catch((e) => {
                 console.log('error', e);
             })
     }

     componentDidMount(){
      const match = matchPath(this.props.history.location.pathname, {
          path: '/participant/:eventId',
          exact: true,
          strict: false
        })
      const linkId = match.params.eventId;
      console.log('LinkId', linkId);

        const token = localStorage.getItem('access_token');
        console.log('userId', token);
         fetch(`https://uteclubs.herokuapp.com/events/${linkId}/participants`, {
           headers: {
             Authorization: `Bearer ${token}`,
             Accept: 'application/json',
             'Content-Type': 'application/json'
           }
        })
               .then(response => response.json())
               .then(mems => {
                   this.setState({
                       clubs: mems,
                       loading: true,
                   })
               })
            .catch(error => console.log(error))

            fetch(`https://uteclubs.herokuapp.com/events/${linkId}/get-edit-permission`, {
         headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
      })
            .then((response) => {
                response.json();
                console.log(response.ok);

                if(response.ok == true) {
                    this.setState({showAb: true})
                }
                else {
                    this.setState({showAb: false})
                }

            })
            .catch(error => console.log(error))
      }

    render() {
      console.log(this.state);
      var value = this.state.mems.map((item) => {
          var sex = '';
          if (item.value.gender === 'female') {
              sex = 'Nữ';
          }
          else {
              sex = 'Nam';
          }
          return (
            <tr>
               <td>{item.value.studentId}</td>
               <Link className='row-link' to={`/userdetail/${item.value.userId}`}> <td>{item.value.fullName}</td></Link>
               <td>{sex}</td>
               <td>{item.value.major}</td>
               <td>{item.value.faculty}</td>
               <td>{item.value.email}</td>
               <td style={{display: this.state.showAb ? 'block' : 'none'}}><input type="checkbox" id="checkbox" name="checkbox" value="" /></td>
            </tr>)
      });
         return (
          <div>
            <div className='searcha'>
                <input type='text' className='searchtxt1' name='search'  onChange={this.handleInput}></input>
                <button className='searchbtn1' onClick={() => {this.handleSearch()}}>Tìm</button>
            </div>

            <div className='club-form'>
                <h3 className='tablepart-name'><b>DANH SÁCH NGƯỜI THAM GIA</b></h3>
              <table className='table'>
                  <thead>
                      <tr>
                        <th>MSSV</th>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Ngành</th>
                        <th>Khoa</th>
                        <th>Email</th>
                        <th style={{display: this.state.showAb ? 'block' : 'none'}}>Diểm danh</th>
                      </tr>
                  </thead>
                  <tbody>
                      {value.length ? value : <p className='empty'>Chưa có ai tham gia sự kiện</p>}
                  </tbody>
              </table>

            </div>
         </div>
    );
    }
}

export default ParticipantListFeature;