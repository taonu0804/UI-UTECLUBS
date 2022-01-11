import React, { Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom';

class ClubManagementFeature extends Component {
    constructor(props) {
       super(props)
       this.state = {
          clubs: [],
          loading: true
       };
    }

    componentDidMount(){
      const token = localStorage.getItem('access_token');
      console.log('userId', token);
      fetch('http://localhost:8080/admin/club-management?page=0', {
         headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
      })
            .then(response => response.json())
            .then(clubs => {
               let details = [];

               for (var i in clubs.content) {
                   details.push({ name: i, value: clubs.content[i] })
               }
   
                this.setState({
                    clubs: details,
                    loading: true,
                })
            })
         .catch(error => console.log(error))
   }
    render() {
       console.log(this.state);
        return (
           <div>
           <Link className='addbtn' to='/addclb'> + Thêm Câu lạc bộ</Link>
            <div className='club-form'>
               <h3 className='table-name'><b>CÁC CÂU LẠC BỘ</b></h3>
              <table className='table'>
                  <thead>
                     <tr>
                        <th>Club ID</th>
                        <th>Club Name</th>
                        <th>Unit</th>
                     </tr>
                  </thead>
                  <tbody>
                  {this.state.clubs.map((item) => (
                        <tr key={item.value.id}>
                           <Link className='row-link' to={`/clubdetail/${item.value.clubId}`}> <td>{item.value.clubId}</td></Link>
                           <td>{item.value.clubName}</td>
                           <td>{item.value.affiliatedUnit}</td>
                        </tr>
                      ))}
                  </tbody>
              </table>

            </div>
         </div>
         );
   }
}
export default ClubManagementFeature;