import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import axios from 'axios'
import ReactTable from "react-table"; 
import 'react-table/react-table.css'

class NotiFeature extends Component {
    constructor(props) {
       super(props)
       this.state = {
          students: [],
          loading: true,
       };
    }

    async getUsersData(){
      const res = await axios.get('http://localhost:8080/club-management/:clubId/member-requests?page=0')
      console.log(res.data)
      this.setState({loading:false, users: res.data})
    }
    componentDidMount(){
      this.getUsersData()
    }

    render() {
       const columns = [{
          Header: 'ID',
          accessor: 'id',
       },
      {
         Header: 'Họ và Tên',
         accessor: 'fullName',
      },
      {
         Header: 'MSSV',
         accessor: 'studentID',
      }]
        return (
            <div className='pending-form'>
               <div className='button-group'>
                  <button className='event-btn'><b>Phê duyệt tất cả</b></button>
                  <button className='event-btn'><b>Phê duyệt</b></button>
                  <button className='event-btn'><b>Xóa yêu cầu</b></button>
               </div>
               <Link className='row-link'><ReactTable className='member-table'
                  data={this.state.students}  
                  columns={columns}  
               /></Link>

            </div>
         );
   }
}

export default NotiFeature;