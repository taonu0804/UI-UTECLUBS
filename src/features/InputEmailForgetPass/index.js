import React, { Component } from 'react';
import Validator from '../../utils/validator.js';
import './style.css';

class InputEmailForgetPassFeature extends Component {
    constructor (props) {
      super(props);
      this.state = {
        errors: {},
        email: '',
      }

      const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;
  
      const rules = [
        {
          field: 'email',
          method: 'isEmpty',
          validWhen: false,
          message: 'The email field is required.',
        },
      ];
      this.validator = new Validator(rules);

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
          email: e.target.value
        });
        console.log('input', this.state);
    }

    handleSubmit(e) {
        fetch('http://localhost:8080/users/reset-password/input-email', {
            method: 'POST',
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
                this.setState({
                    errors: this.validator.validate(this.state),
                });
                alert('Mời nhập đầy đủ thông tin');
            }
            if (response.status === 404) {
                alert('Người dùng không tồn tại')
            }
            if (response.status === 500) {
              alert('Xin thử lại email');
            }
            if (response.status === 200) {
                this.props.history.push('/forgetpass');
            }
          })
          .catch(error => {
            console.log('error', error);
            alert('The email is not existed');
          })
    }

    render() {
        const {errors} = this.state;
        return (
            <div className='forgetpassemail-body'>
                <input type='email' className='emailtxt' name='email' value={this.state.value} onChange={this.handleChange} placeholder='Email address' required/>
                {errors.email && <div className="validationemail" style={{display: 'block'}}>{errors.email}</div>}
                <button className='emailsubmit' onClick={this.handleSubmit}>Next</button>
            </div>
        );
    }
}

export default InputEmailForgetPassFeature;