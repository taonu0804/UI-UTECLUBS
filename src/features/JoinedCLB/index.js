import React, { Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import OUT from '../../image/out.png';

class JoinedCLBFeature extends Component {
    constructor(props) {
        super(props)
        this.state = {
           loading: true,
           userclubs: [],
        };

        this.hanldeOut = this.hanldeOut.bind(this);
     }
 
     componentDidMount(){
        const token = localStorage.getItem('access_token');
        console.log('userId', token);

       fetch('http://localhost:8080/users/joined-clubs', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
       })
             .then(response => response.json())
             .then(clubs => {
                console.log('clubs', clubs);
                 this.setState({
                     userclubs: clubs,
                     loading: true,
                 })
             })
          .catch(error => console.log(error))
    }

    hanldeOut(clubId) {
      const token = localStorage.getItem('access_token');
      console.log('userId', token);
       if (window.confirm('Bạn chắc chắn muốn rời Câu lạc bộ?') == true) {
         fetch(`http://localhost:8080/clubs/${clubId}/leave`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            }
         })
            .then(response => {
               response.json();
               alert('Thoát thành công');
               window.location.reload();
            })
            .catch(error => console.log(error))
         }
         else {
            return;
         }
    }

     render() {
        var joined = this.state.userclubs.map((item) => {
           return (
         <tr>
            <Link className='row-link' to={`/newfeed/${item.clubId}`}> <td>{item.clubId}</td></Link>
            <td>{item.clubName}</td>
            <td>{item.affiliatedUnit}</td>
            <td><button className='outgr' onClick={() => {this.hanldeOut(item.clubId)}}><img src={OUT} className='outgr'/></button></td>
         </tr>)
        });
         return (
             <div className='club-form'>
                <h3 className='table-name'><b>CÁC CÂU LẠC BỘ</b></h3>
               <table className='table'>
                   <thead>
                      <tr>
                         <th>Club ID</th>
                         <th>Club Name</th>
                         <th>Unit</th>
                         <th>Rời Câu lạc bộ</th>
                      </tr>
                   </thead>
                   <tbody>
                      {joined.length ? joined : <p>Bạn chưa tham gia câu lạc bộ nào</p>}
                   </tbody>
               </table>
 
             </div>
          );
    }
}

export default JoinedCLBFeature;