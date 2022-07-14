import React, { Component } from 'react';
import './style.css';
import { matchPath } from 'react-router';

class UserClubDetailFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      clubs: [],
      showBtn: false,
      showCancel: false,
    }
    this.handleRegister = this.handleRegister.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const link = (this.props.history.location.pathname).toString();
    console.log(link);

    const condition = link.split('/userclubdetail/');
    console.log('con', condition[1]);
    
    if ( condition[1].length > 1 ) {
        this.setState({showBtn: true});
        this.setState({showCancel: false});
    }
    else {
      this.setState({showBtn: false});
      this.setState({showCancel: false});
    }
    
    const id = (condition[1].split('/notjoin'))[0];
    console.log('id', id);

    fetch('https://uteclubs.herokuapp.com/clubs/' + `${id}`, {
      method: 'GET',
      headers: {
      },
   },
   {withCredentials: false})
    .then((response) => response.json())
    .then(item => {
        this.setState({ clubs: item });
    });
  }

  handleRegister = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    console.log('token', token);
    const link = (this.props.history.location.pathname).toString();
    console.log(link);

    const condition = link.split('/userclubdetail/');
    const id = (condition[1].split('/notjoin'))[0];
    console.log('id', id);

    fetch('https://uteclubs.herokuapp.com/users/register-to-club', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
   },
   {withCredentials: false})
    .then((response) => {
      response.json();
      if (response.status === 400) {
        alert('You have already registered to this club');
        this.setState({ showCancel: true });
        this.setState({ showBtn: false });
      }
      else {
        this.setState({ showCancel: true });
        this.setState({ showBtn: false });
        alert('Đăng ký tham gia thành công');}
    })
    .catch(error => console.log(error))
  };

  handleCancel = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    console.log('token', token);
    const link = (this.props.history.location.pathname).toString();
    console.log(link);

    const condition = link.split('/userclubdetail/');
    const id = (condition[1].split('/notjoin'))[0];
    console.log('id', id);
    if (window.confirm('Bạn muốn hủy yêu cầu?') == true) {
      fetch(`https://uteclubs.herokuapp.com/users/cancel-request/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
    },
    {withCredentials: false})
      .then((response) => {
        response.json();
          this.setState({ showCancel: false });
          this.setState({ showBtn: true });
          alert('Hủy yêu cầu thành công');
      })
      .catch(error => {
        console.log(error);
        alert('Có lỗi xảy ra');
      })
    }
    else {
      return;
    }
  }
  
  render() {
    const {clubs} = this.state;
    console.log(clubs);
      return (
          <div>
              <div className='detail-contain'>
                  <input className='id' name='clubId' value={clubs.clubId} hidden={true} required/>
                <div className='name-area'>
                  <input className='club-name' value={clubs.clubName} required/>
                </div>
                <div className='img-area'>
                  <img src={clubs.logoUrl} value={this.state.url} className='club-img' alt=" "/>
                </div>
                <div className='unit-area'>
                  <h5 className='lead-text'><b>Đơn vị: </b></h5>
                  <input className='lead-name' value={clubs.affiliatedUnit} required/>
                </div>
                <div className='desc-area'>
                  <p className='desc'><b>Mô tả: </b></p>
                  <textarea className='desc-detail' value={clubs.description} required/>
                </div>
                  <button type="submit" class="register-btn" onClick={this.handleRegister} style={{display: this.state.showBtn ? 'block' : 'none'}}>Yêu cầu tham gia</button>
                  <button type="submit" class="cancel-btn" onClick={this.handleCancel} style={{display: this.state.showCancel ? 'block' : 'none'}}>Hủy yêu cầu</button>
              </div>
          </div>
      );
    }
}

export default UserClubDetailFeature;