import React, { Component} from 'react';
import './style.css';
import DEL from '../../image/trashbin.png';
import { Link } from 'react-router-dom';

class ClubManagementFeature extends Component {
    constructor(props) {
       super(props)
       this.state = {
          students: [
             { id: 11, clubname: 'Kỹ Năng', leader: 'Nguyễn Thị A', delete:'Delete' },
             { id: 12, clubname: 'Kỹ Năng', leader: 'Nguyễn Thị A', delete:'Delete' },
             { id: 13, clubname: 'Kỹ Năng', leader: 'Nguyễn Thị A', delete: 'Delete' },
             { id: 14, clubname: 'Kỹ Năng', leader: 'Nguyễn Thị A', delete:'Delete' }
          ]
       };
    }

    renderTableData() {
        return this.state.students.map((student, index) => {
          const { id, clubname, leader } = student
          return (
            <tr>
              <td>{id}</td>
              <td><Link className='row-link'>{clubname}</Link></td>
              <td>{leader}</td>
              <td><button className='btn-del'><img className='delbtn' src={DEL}/></button></td>
            </tr>
          )
        })
      }

      renderTableHeader() {
         const header = Object.keys(this.state.students[0])
         return header.map((key, index) => <th key={index}>{key.toUpperCase()}</th>)
       }

    render() {
        return (
            <div className='club-form'>
               <h3 className='table-name'><b>CÁC CÂU LẠC BỘ</b></h3>
               <table className='clubs'>
                  <tbody>
                     <tr>{this.renderTableHeader()}</tr>
                     {this.renderTableData()}
                  </tbody>
               </table>

            </div>
         );
   }
}
export default ClubManagementFeature;