import React, { Component } from 'react';
import './style.css';
import Validator from '../../utils/validator.js';
import { storage } from '../../firebase';
import { matchPath } from 'react-router';

class InfoChangeFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      users: [],
      errors: {},
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;

    const rules = [
      {
        field: 'fullName',
        method: 'isEmpty',
        validWhen: false,
        message: 'The name is required.',
      },
      {
        field: 'newPassword',
        method: 'isLength',
        args: [{min: 8}],
        validWhen: true,
        message: 'The password must be at least 8 characters, one upper letter, one lower letter, one special character.',
      },
      {
        field: 'confirmedPassword',
        method: this.passwordMatch,
        validWhen: true,
        message: 'Password and password confirmation do not match.'
      },
    ];
    this.validator = new Validator(rules);
  }

  passwordMatch = (confirmation, state) => (state.password === confirmation)
    handleInput = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }

  handleUpload = () => {
    const {image} = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed',
    (snapshot) => {
      // progrss function ....
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    },
    (error) => {
         // error function ....
      console.log(error);
    },
  () => {
      // complete function ....
      storage.ref('images').child(image.name).getDownloadURL().then(url => {
        console.log(url);
        this.setState({url});
      });
    });
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    const match = matchPath(this.props.history.location.pathname, {
      path: '/infochange/:userId',
      exact: true,
      strict: false
    })
    const id = match.params.clubId;
    console.log('id', id);

    fetch('http://localhost:8080/users/' + `${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html',
        'access-control-allow-headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'access-control-allow-methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
      },
   },
   {withCredentials: false})
    .then((response) => response.json())
    .then(item => {
        this.setState({ users: item });
        console.log(item);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      errors: this.validator.validate(this.state),
    });
    
    const access_token = localStorage.getItem('access_token');
  };
  
  handleLogout = () => {
    localStorage.removeItem('user');
    this.props.history.push('/');
  }

    render() {
      const {errors} = this.state;
    return (
        <div>
            <div className='frame'></div>
            <form method="POST" className="info-form" style={{padding: 0}} source="custom" name="form">
              <div className='avatar-group'>
                  <progress value={this.state.progress} max="100" hidden={true}/>
                  <label for="files" className='ava'>Tải ảnh lên</label>
                  <input id='files' type='file' className='ava' name='img' onChange={this.handleChange} hidden='true' required/>
                  <button className='changeava' onClick={this.handleUpload}></button>
                  <img src={this.state.url} name='avatarUrl' value={this.state.url} className='avatar' alt=" "/>
                </div>
                <button className='logout' onClick={this.handleLogout}>ĐĂNG XUẤT</button>
                <div className="fullName-group">
                    <label className="fullName-label">Họ và tên</label>
                    <input type="text" name='fullName' className="fullName" value={this.state.fullName} onChange={this.handleInput} required />
                    {errors.fullName && <div className="validation" style={{display: 'block'}}>{errors.fullName}</div>}
                </div>
                <div className="gender-group">
                    <label className="gender-label">Giới tính</label>
                    <select 
                        className='gender'
                        value={this.state.gender}
                        onChange={this.handleInput}
                        name='gender'
                        required
                    >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                    {errors.gender && <div className="validation" style={{display: 'block'}}>{errors.gender}</div>}
                </div>
                <div className="dob-group">
                    <label className="dob-label">Ngày sinh</label>
                    <input type="date" name='dob' value={this.state.dob} onChange={this.handleInput} placeholder="Ngày tháng năm sinh" className="dob" required />
                    {errors.dob && <div className="validation" style={{display: 'block'}}>{errors.dob}</div>}
                </div>
                <div className="pass-group">
                    <label className="pass-label">Mật khẩu cũ</label>
                    <input type="password" name='oldPassword' placeholder="Vui lòng nhập mật khẩu cũ" className="oldpassword" value={this.state.oldPassword} onChange={this.handleInput}/>
                    {errors.oldPassword && <div className="validation" style={{display: 'block'}}>{errors.oldPassword}</div>}
                </div>
                <div className="newpass-group">
                    <label className="newpass-label">Mật khẩu mới</label>
                    <input type="password" name='newPassword' placeholder="Vui lòng nhập mật khẩu mới" className="newpassword" value={this.state.newPassword} onChange={this.handleInput}/>
                    {errors.newPassword && <div className="validation" style={{display: 'block'}}>{errors.newPassword}</div>}
                </div>
                <div className="repass-group">
                    <label className="repass-label" wfd-invisible="true">Nhập lại mật khẩu mới</label>
                    <input type="password" name='confirmedPassword' placeholder="Vui lòng nhập lại mật khẩu mới" className="renewpassword"  value={this.state.confirmedPassword} onChange={this.handleInput}/>
                    {errors.confirmedPassword && <div className="validation" style={{display: 'block'}}>{errors.confirmedPassword}</div>}
                </div>
                <div className="change-group">
                    <button className="change-link" onClick={this.handleSubmit}>THAY ĐỔI</button>
                </div>
            </form>
        </div>
    );
  }
}
export default InfoChangeFeature;