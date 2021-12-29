import React, { useState, Component } from 'react';
import { Button  } from '@material-ui/core';
import './style.css';
import HG from '../../image/huong.jpg';
import Validator from '../../utils/validator.js';

class InfoChangeFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: {},
    }
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

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    this.setState({
      errors: this.validator.validate(this.state),
    });
    console.log(this.state);
  };

    _onChange = (e) => {
        const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (acceptedImageTypes.includes(e.target.files[0].type)) {
          this.setState({
            avatarFile: e.target.files[0],
          });
        }
    };

    render() {
      const {errors} = this.state;
    return (
        <div>
            <div className='frame'></div>
            <form method="POST" className="info-form" style={{padding: 0}} source="custom" name="form">
                <div className='avatar-group'>
                    <img alt="" className="avatar" src={HG} />
                    <label htmlFor="upload-photo">
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      accept="image/*"
                      onChange={this._onChange}
                    />

                    <Button
                      component="span"
                    >
                      Upload
                    </Button>
                  </label>
                </div>
                <button className='logout'>ĐĂNG XUẤT</button>
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