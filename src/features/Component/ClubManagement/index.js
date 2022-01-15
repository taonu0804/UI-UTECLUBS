import React, { Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import AMOUNT from '../../../image/soluong.png';
import NUM from '../../../image/number.jpg';

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
       var value = this.state.clubs.map((item) => {
          return (
             <tr key={item.value.id}>
                <Link className='row-link' to={`/clubdetail/${item.value.clubId}`}> <td>{item.value.clubId}</td></Link>
                <td>{item.value.clubName}</td>
                <td>{item.value.affiliatedUnit}</td>
             </tr>)
       });
        return (
           <div className='clubmanage'>
            <div className='slider'>
               {this.state.clubs.map((item) => (
                  <img class="slide" id="slide-1" src={item.value.logoUrl}/>
               ))}
            </div>

            <div className='total'>
               <img className='amount' src={AMOUNT}/><p className='clbtxt'><b>Số Câu lạc bộ hiện tại:</b></p>
               <img className='nobg' src={NUM}/>
               <p className='clubnum'>{this.state.clubs.length}</p>
            </div>

            <div className='club-form'>
               <Link className='addbtn' to='/addclb'> + Thêm Câu lạc bộ</Link>
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
                     {value.length ? value : <p className='empty'>Không có câu lạc bộ nào</p>}
                  </tbody>
              </table>

            </div>
         </div>
         );
   }
}
export default ClubManagementFeature;