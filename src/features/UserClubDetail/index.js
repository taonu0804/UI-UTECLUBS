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
            <div className='detailcontain'>
                      <div className='nameare1'>
                        <div className='ename-area1'>
                            <p className='enametitle1'><b>Tên câu lạc bộ</b></p>
                            <input type='text' className='ename' name='clubName' value={clubs.clubName}required/>
                        </div>

                        <p className='begtimetitle'><b>Đơn vị</b></p>
                        <div className="begtime-area">
                            <p className='begdateopt' style={{display: this.state.showUnit ? 'block' : 'none'}}>{clubs.affiliatedUnit}</p>
                            <input type='text' className='begdatetext' name='affiliatedUnit' value={clubs.clubName}required/>
                        </div>

                        <button type="submit" className="e-button" onClick={this.handleRegister} style={{display: this.state.showBtn ? 'block' : 'none'}}><b>Yêu cầu tham gia</b></button>
                        <button type="submit" className="e-button" onClick={this.handleCancel} style={{display: this.state.showCancel ? 'block' : 'none'}}><b>Hủy yêu cầu</b></button>
                      </div>

                            <div className='avaarea1'>
                                <div className='eimgarea'>
                                    <img src={clubs.logoUrl} name='logoUrl' className='eve-img' alt=" "/>
                                </div>

                                <div className='eunit-area'>
                                    <div className='edesc-area'>
                                        <p className='edesc1'><b>Mô tả: </b></p>
                                        <textarea className='edescdetail' name='description' value={clubs.description} required/>
                                    </div>
                                </div>
                    </div>
              </div>
          </div>
      );
    }
}

export default UserClubDetailFeature;