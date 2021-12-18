import React, { Component} from 'react';
import './style.css';
import EDIT from '../../image/edit.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTable from "react-table"; 
import 'react-table/react-table.css';

class ClubManagementFeature extends Component {
    constructor(props) {
       super(props)
       this.state = {
          students: [],
          loading: true
       };
    }

    async getUsersData(){
      const res = await axios.get('http://localhost:8080/club-mangement')
      console.log(res.data)
      this.setState({loading:false, students: res.data})
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
        Header: 'CÂU LẠC BỘ',
        accessor: 'club',
     },
      {
         Header: 'CHỦ NHIỆM',
         accessor: 'host',
      },
      {
         Header: 'CHỈNH SỬA',
      }]
        return (
            <div className='club-form'>
               <h3 className='table-name'><b>CÁC CÂU LẠC BỘ</b></h3>
               <Link className='table-link' to='/clubdetail'><ReactTable  
               data={this.state.students}  
               columns={columns}  
            /></Link>

            </div>
         );
   }
}
export default ClubManagementFeature;