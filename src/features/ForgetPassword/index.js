import React, { Component } from 'react';
import './style.css';
import Validator from '../../utils/validator.js';
import { Link } from 'react-router-dom';
import KEY from '../../image/key.png';

class ForgetPassFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      forgetpass: [],
    }

    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;

    const rules = [
      {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'The username is required.',
      },
      {
        field: 'otp',
        method: 'isEmpty',
        validWhen: false,
        message: 'The otp is required.',
      },
      {
        field: 'otp',
        method: 'isLength',
        args: [{min: 6}],
        args: [{max: 6}],
        validWhen: true,
        message: 'The OTP must be 6 characters.',
      },
      {
        field: 'newPassword',
        method: 'isEmpty',
        validWhen: false,
        message: 'The new password is required.',
      },
      {
        field: 'confirmedPassword',
        method: 'isEmpty',
        validWhen: false,
        message: 'The password confirmation is required.',
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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  passwordMatch = (confirmation, state) => (state.password === confirmation)
  handleChange = event => {
  event.preventDefault();
  this.setState({
    [event.target.name]: event.target.value,
  });
}
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e)  {
    this.setState({
        errors: this.validator.validate(this.state),
    });
    fetch('https://uteclubs.herokuapp.com/users/reset-password/input-new-password', {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
       },
       {withCredentials: false}
      )
          .then(response => {
            response.json();
            console.log('info', response);
            if (response.status === 400) {
                alert('M?? OTP ch??a ????ng');
            }
            if (response.status === 404) {
                alert('Ng?????i d??ng kh??ng t???n t???i')
            }
            if (response.status === 500) {
              alert('Xin th??? l???i');
            }
            else {
              alert('?????i m???t kh???u th??nh c??ng');
              this.props.history.push('/login');
            }
          })
          .catch(error => {
            console.log('error', error);
          })
  };

    render() {
      const {errors} = this.state;
    return (
        <div className='forgetpass-body'>
          <h1 className='webname'>UTE-CLUBS</h1>
          <p className='titletxt'>Vui l??ng ?????i m???t kh???u ????? ti???p t???c s??? d???ng</p>
          <img src={KEY} className='keylogo'/>
          <div className='frame'>
          <form className="forgetpass-form" style={{padding: 0}}>
              <div className="username-group">
                  <label className="username-label">T??n ng?????i d??ng</label>
                  <input type='text' name='username' onChange={this.handleChange} placeholder="Vui l??ng nh???p t??n ng?????i d??ng" className='uname' required />
                  {errors.username && <div className="validation" style={{display: 'block'}}>{errors.username}</div>}
              </div>
              <div className="pass-group">
                  <label className="pass-label">OTP</label>
                  <input type="number" name='otp' onChange={this.handleChange} placeholder="Vui l??ng nh???p m?? OTP" className="oldPassword" required />
                  {errors.otp && <div className="validation" style={{display: 'block'}}>{errors.otp}</div>}
              </div>
              <div className="newpass-group">
                  <label className="newpass-label">M???t kh???u m???i</label>
                  <input type="password" name='newPassword' onChange={this.handleChange} placeholder="Vui l??ng nh???p m???t kh???u m???i" className="newPassword" required />
                  {errors.newPassword && <div className="validation" style={{display: 'block'}}>{errors.newPassword}</div>}
              </div>
              <div className="repass-group">
                  <label className="repass-label" wfd-invisible="true">Nh???p l???i m???t kh???u m???i</label>
                  <input type="password" name='confirmedPassword' onChange={this.handleChange} placeholder="Vui l??ng nh???p l???i m???t kh???u m???i" className="renewPassword" required />
                  {errors.confirmedPassword && <div className="validation" style={{display: 'block'}}>{errors.confirmedPassword}</div>}
              </div>
              <div className="change-group">
                  <button className="change-link" onClick={this.handleSubmit}>THAY ?????I</button>
              </div>
          </form>
          </div>
          <Link className='loginlink' to='/login'>????ng nh???p v??o t??i kho???n</Link>
        </div>
    );
  }
}
export default ForgetPassFeature;