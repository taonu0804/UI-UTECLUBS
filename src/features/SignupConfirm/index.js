import React, {Component} from 'react';
import './style.css';
import { Redirect } from "react-router-dom";
import Validator from '../../utils/validator.js';
import Moment from 'moment';

class SignupConfirmFeature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      errors: {},
    };

    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;

    const rules = [
      {
        field: 'otp',
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required.',
      },
    ];
    this.validator = new Validator(rules);

    this.onchange = this.onchange.bind(this);
  }
  onchange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  performVerify = event => {
    event.preventDefault();
    this.setState({
      errors: this.validator.validate(this.state),
    });

    var info = JSON.parse(localStorage.getItem('info'));
    var pass = JSON.parse(localStorage.getItem('pass'));

    Moment.locale('en');
    var data = {
      avatarUrl: info.avatarUrl,
      fullName: info.fullName,
      studentId: info.studentId,
      gender: info.gender,
      dob: Moment(info.dob).format('yyyy-MM-DD'),
      faculty: info.faculty,
      major: info.major,
      email: info.email,
      username: info.username,
      password: pass,
      otp: this.state.otp
    };
    console.log(data);
    fetch('http://localhost:8080/users/signup/verify', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
   },
   {withCredentials: false}
  )
      .then(response => {
        if (response.status === 409) {
          return response.json();
        }
        return response.json();
      })
      .then(obj => {
        if (obj.message === undefined) {
          alert('Đăng ký thành công');
          this.props.history.push('/login');
        }
        else {
          alert(obj.message);
        }
      })
      .catch(error => {
        console.log('registration error', error);
      })
  };

  render() {
    const {errors} = this.state;
    return (
        <div className='signupConfirm-area'>
          <form method="POST" className="signupConfirm-form" source="custom" style={{padding: '10px'}}>
              <div className="code-area">
                <input type="text" name='otp' placeholder="Nhập mã xác thực ở đây" onChange={this.onchange} className="code-text" required />
                  {errors.otp && <div className="validation" style={{display: 'block'}}>{errors.otp}</div>}
              </div>
              <button className='confirmbtn' onClick={this.performVerify}><b>Xác nhận</b></button>
            </form>
        </div>
    );
  }
}

export default SignupConfirmFeature;