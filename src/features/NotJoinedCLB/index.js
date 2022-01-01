import React, { Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import IMG from '../../image/edit.png';

class NotJoinedCLBFeature extends Component {
    constructor(props) {
        super(props)
        this.state = {
           clubs: [],
           loading: true
        };
     }
 
     componentDidMount(){
       fetch('http:/localhost:8080/users/not-joined-clubs')
             .then(response => response.json())
             .then(clubs => {
                 this.setState({
                     clubs: clubs
                 })
             })
          .catch(error => console.log(error))
    }
     render() {
       const contents = this.state.clubs.forEach(item => {
          return <tr><Link className='row-link' to={`/clubdetail/${item.clubId}`}>
             <td>{item.clubId}</td> 
             <td>{item.clubName}</td>
             <td>{item.affiliatedUnit}</td>
             <td><img src={IMG}/></td>
          </Link></tr>
       })
       const {loading, clubs} = this.state;
       if(!loading){
          return(
             <h1>Loading...</h1>
          )
       }
 
         return (
             <div className='club-form'>
                <h3 className='table-name'><b>CÁC CÂU LẠC BỘ</b></h3>
               <table className='table'>
                   <thead>
                      <tr>
                         <th>Club ID</th>
                         <th>Club Name</th>
                         <th>Unit</th>
                         <th>Tham gia</th>
                      </tr>
                   </thead>
                   <tbody>
                      {contents}
                   </tbody>
               </table>
 
             </div>
          );
    }
}

export default NotJoinedCLBFeature;