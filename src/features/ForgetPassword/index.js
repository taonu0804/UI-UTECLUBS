import React, { Component } from 'react';
import './style.css';
import Validator from '../../utils/validator.js';
import { storage } from '../../firebase';

class InfoChangeFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      errors: {},
    }

    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);

    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;

    const rules = [
      {
        field: 'oldpassword',
        method: 'isEmpty',
        validWhen: false,
        message: 'The old password is required.',
      },
      {
        field: 'newpassword',
        method: 'isEmpty',
        validWhen: false,
        message: 'The new password is required.',
      },
      {
        field: 'confirmedpassword',
        method: 'isEmpty',
        validWhen: false,
        message: 'The password confirmation is required.',
      },
      {
        field: 'newpassword',
        method: 'isLength',
        args: [{min: 8}],
        validWhen: true,
        message: 'The password must be at least 8 characters, one upper letter, one special character.',
      },
      {
        field: 'confirmedpassword',
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

  handleSubmit(e)  {
    this.setState({
      errors: this.validator.validate(this.state),
    });
    console.log(this.state);
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
                  <img src={this.state.url} value={this.state.logoUrl} className='avatar' alt=" "/>
                </div>
                <button className='logout' onClick={this.handleLogout}>ĐĂNG XUẤT</button>
                <div className="pass-group">
                    <label className="pass-label">Mật khẩu cũ</label>
                    <input type="password" name='oldpassword' placeholder="Vui lòng nhập mật khẩu cũ" className="oldpassword" value={this.state.oldpassword} onChange={this.handleInput} required />
                    {errors.oldpassword && <div className="validation" style={{display: 'block'}}>{errors.oldpassword}</div>}
                </div>
                <div className="newpass-group">
                    <label className="newpass-label">Mật khẩu mới</label>
                    <input type="password" name='newpassword' placeholder="Vui lòng nhập mật khẩu mới" className="newpassword" value={this.state.newpassword} onChange={this.handleInput} required />
                    {errors.newpassword && <div className="validation" style={{display: 'block'}}>{errors.newpassword}</div>}
                </div>
                <div className="repass-group">
                    <label className="repass-label" wfd-invisible="true">Nhập lại mật khẩu mới</label>
                    <input type="password" name='confirmedpassword' placeholder="Vui lòng nhập lại mật khẩu mới" className="renewpassword"  value={this.state.confirmedpassword} onChange={this.handleInput} required />
                    {errors.confirmedpassword && <div className="validation" style={{display: 'block'}}>{errors.confirmedpassword}</div>}
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