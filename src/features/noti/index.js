import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { matchPath } from 'react-router';

class NotiFeature extends Component {
    constructor(props) {
       super(props)
       this.state = {
          students: [],
          loading: true,
       };
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
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
     })
           .then(response => response.json())
           .then(students => {
              console.log('students', students);
               this.setState({
                  students: students,
                   loading: true,
               })
           })
        .catch(error => console.log(error))
  }

    render() {
        return (
            <div className='club-form'>
               <table className='table'>
                   <thead>
                      <tr>
                         <th>Club ID</th>
                         <th>Club Name</th>
                         <th>Unit</th>
                      </tr>
                   </thead>
                   <tbody>
                      {this.state.students.map((item) => (
                        <tr>
                           <Link className='row-link' to={`/newfeed/${item.clubId}`}> <td>{item.clubId}</td></Link>
                           <td>{item.clubName}</td>
                           <td>{item.affiliatedUnit}</td>
                        </tr>
                      ))}
                   </tbody>
               </table>
            </div>
         );
   }
}

export default NotiFeature;