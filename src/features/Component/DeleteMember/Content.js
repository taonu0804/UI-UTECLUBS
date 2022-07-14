import React, { Component } from 'react';
import './style.css';

class DeleteMemberComponent extends Component {
    constructor(props) {
    super(props)
    this.state = {
        show: true,
    };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDel = this.handleDel.bind(this);
    }

    handleCancel(e) {
        this.setState({show: false})
    }

    handleDel(e) {
        const token = localStorage.getItem('access_token');
        console.log(token);
        
        const id = this.props.clubId;
        console.log(id);

        const userId = this.props.userId;
        console.log(userId);

        fetch('https://uteclubs.herokuapp.com/admin/club-management/' + `${id}` + '/remove-member/' + `${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        {withCredentials: false}
        )
            .then((response) => {
                response.json();
                alert('Đã xóa thành viên khỏi Câu lạc bộ');
            })
            .catch((error) => console.log('error', error))

        window.location.reload();
    }
    render() {
        return (
            <div className='delete-form' style={{display: this.state.show ? 'block' : 'none'}}>
                <h1 className='del-title'>Xóa thành viên</h1>
                <hr/>
                <div className='delmember'>
                    <h5 className='deltxt'><b>Bạn chắc chắn muốn xóa? </b></h5>
                    <button className='delsubmit' onClick={this.handleDel}>Xác nhận</button>
                    <button className='cancelsubmit' onClick={this.handleCancel}>Hủy bỏ</button>
                </div>
            </div>
        );
    }
}

export default DeleteMemberComponent;