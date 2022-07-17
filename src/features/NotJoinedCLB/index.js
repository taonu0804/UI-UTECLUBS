import React, { Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import IMG from '../../image/edit.png';
import jwt from 'jwt-decode';

class NotJoinedCLBFeature extends Component {
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
       fetch('https://uteclubs.herokuapp.com/users/not-joined-clubs', {
         headers: {
           Authorization: `Bearer ${token}`,
           Accept: 'application/json',
           'Content-Type': 'application/json'
         }
      })
             .then(response => response.json())
             .then(clubs => {
                 this.setState({
                     clubs: clubs,
                     loading: true,
                 })
             })
          .catch(error => console.log(error))
    }
     render() {
        const notjoin = this.state.clubs.map((item) => {
           return (
               <div className='item1'>
                  <div className="w3-third-w3-container-w3-margin-bottom">
                     <img src={item.logoUrl} alt="Norway" className="logoimg"/>
                           <Link className='row-link' to={`/userclubdetail/${item.clubId}/notjoin`}> <img className='delbtn' src={IMG}/></Link>
                     <div className="w3-container-w3-white">
                           <Link to={`/clbmember/${item.clubId}`}><b>{item.clubName}</b></Link>
                           <p>{item.affiliatedUnit}</p>
                           <p>{item.description}</p>
                     </div>
                  </div>
               </div>
            )
        });
         return (
            <div className='joinbody'>
                <h3 className='o-name'><b>CÁC CÂU LẠC BỘ</b></h3><hr className='line'/>
                  <div className="w3-row">
                     {notjoin.length ? notjoin : <p>Bạn đã tham gia hết câu lạc bộ</p>}
                  </div>
             </div>
          );
    }
}

export default NotJoinedCLBFeature;