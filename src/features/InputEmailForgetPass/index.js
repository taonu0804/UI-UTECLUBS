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
          [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
      this.setState({
          errors: this.validator.validate(this.state),
      });
        fetch('https://uteclubs.herokuapp.com/users/reset-password/input-email', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
       },
       {withCredentials: false}
      )
          .then(response => {
            if (response.status === 404) {
                return response.json();
            }
            return response.json();
          })
          .then(obj => {
            if (obj.message === undefined) {
              this.props.history.push('/forgetpass');
            }
            else {
              alert('Người dùng không tồn tại');
            }
          })
          .catch(error => {
            console.log('error', error);
          })
    }

    render() {
        const {errors} = this.state;
        return (
            <div className='forgetpassemail-body'>
                <input type='email' className='emailtxt' name='email' onChange={this.handleChange} placeholder='Email address' required/>
                {errors.email && <div className="validationemail" style={{display: 'block'}}>{errors.email}</div>}
                <button className='emailsubmit' onClick={this.handleSubmit}>Next</button>
            </div>
        );
    }
}

export default InputEmailForgetPassFeature;