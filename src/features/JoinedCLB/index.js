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

       fetch('https://uteclubs.herokuapp.com/users/joined-clubs', {
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
         fetch(`https://uteclubs.herokuapp.com/clubs/${clubId}/leave`, {
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
               <div className='item1'>
                  <div className="w3-third-w3-container-w3-margin-bottom">
                     <img src={item.logoUrl} alt="Norway" className="logoimg"/>
                     <button className='outgr' onClick={() => {this.hanldeOut(item.clubId)}}><img src={OUT} className='outgr'/></button>
                     <div className="w3-container-w3-white">
                           <Link to={`/newfeed/${item.clubId}`}><b>{item.clubName}</b></Link>
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
                     {joined.length ? joined : <p>Bạn chưa tham gia câu lạc bộ nào</p>}
                  </div>
             </div>
          );
    }
}

export default JoinedCLBFeature;