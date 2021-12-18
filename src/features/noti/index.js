import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class NotiFeature extends Component {
    constructor(props) {
       super(props)
       this.state = {
          students: [
             { id: 1, name: 'Tạ Thị Mai Hương', mssv: 18110298 },
             { id: 2, name: 'Võ Trần Minh Quân', mssv: 18110344 },
             { id: 3, name: 'Nguyễn Trung Tín', mssv: 18110381 },
             { id: 4, name: 'Huỳnh Thị Thúy Vy', mssv: 18110400 }
          ]
       };
    }

    renderTableData() {
        return this.state.students.map((student, index) => {
          const { id, name, mssv } = student
          return (
            <tr>
              <td>{id}</td>
              <td><Link className='member-link' to='/'>{name} </Link></td>
              <td>{mssv}</td>
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
            <div className='pending-form'>
               <div className='button-group'>
                  <button className='event-btn'><b>Phê duyệt tất cả</b></button>
                  <button className='event-btn'><b>Phê duyệt</b></button>
                  <button className='event-btn'><b>Xóa yêu cầu</b></button>
               </div>
               <table className='students'>
                  <tbody>
                     <tr>{this.renderTableHeader()}</tr>
                     {this.renderTableData()}
                  </tbody>
               </table>

            </div>
         );
   }
}

export default NotiFeature;