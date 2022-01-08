import React, {Component} from 'react';
import './style.css';
import { Redirect } from "react-router-dom";
import Validator from '../../utils/validator.js';

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

  performVerify = async event => {
    event.preventDefault();
    this.setState({
      errors: this.validator.validate(this.state),
    });

    var data = {
      email: this.props.email,
      otp: this.state.otpCache
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    };
    const url = "/users/signup/verify";
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      if (result.data === "verified") {
        this.props.history.push('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {errors} = this.state;
    return (
        <div className='signupConfirm-area'>
          <form method="POST" className="signupConfirm-form" source="custom" style={{padding: '10px'}}>
              <div className="code-area">
                <input type="text" name='otp' value={this.state.otp} placeholder="Nhập mã xác thực ở đây" onChange={this.onchange} className="code-text" required />
                  {errors.otp && <div className="validation" style={{display: 'block'}}>{errors.otp}</div>}
              </div>
              <button className='confirmbtn' onClick={this.performVerify}><b>Xác nhận</b></button>
            </form>
        </div>
    );
  }
}

export default SignupConfirmFeature;