import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import './style.css';
import BGDK from '../../image/bgdk.png';
import Validator from '../../utils/validator.js';
import { storage } from '../../firebase';
import axios from 'axios';

class SignupFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      image: null,
      progress: 0,
      url:'',
      errors: {},
      fullName: '',
      email: '',
      studentId: '',
      gender: '',
      major: '',
      faculty: '',
      password: '',
      confirmedPassword: '',
      username:'',
      dob: '',
      avatarUrl: '',
    }

    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;

    const rules = [
      {
        field: 'fullName',
        method: 'isEmpty',
        validWhen: false,
        message: 'The full name field is required.',
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'The email field is required.',
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'Enter valid email address.'
        },
      {
        field: 'studentId',
        method: 'isEmpty',
        validWhen: false,
        message: 'The student ID field is required.',
      },
      {
        field: 'gender',
        method: 'isEmpty',
        validWhen: false,
        message: 'The gender field is required.',
      },
      {
        field: 'major',
        method: 'isEmpty',
        validWhen: false,
        message: 'The major field is required.',
      },
      {
        field: 'faculty',
        method: 'isEmpty',
        validWhen: false,
        message: 'The faculty field is required.',
      },
      {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'The username field is required.',
      },
      {
        field: 'dob',
        method: 'isEmpty',
        validWhen: false,
        message: 'The birthday field is required.',
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'The password field is required.',
      },
      {
        field: 'confirmedPassword',
        method: 'isEmpty', 
        validWhen: false,
        message: 'The password confirmation field is required.',
      },
      {
        field: 'password',
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

    this.handleInput = this.handleInput.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  handleInput(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }}

  handleChange(e) {
    this.setState({
      [this.state.name]: this.state.value
    });
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

        const avatarUrl = url;
        this.setState({avatarUrl});
      });
    });
  };

  passwordMatch = (confirmation, state) => (state.password === confirmation)
    handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  register(e) {
    e.preventDefault();
    this.setState({
      errors: this.validator.validate(this.state),
    });

   fetch('http://localhost:8080/users/signup', {
        mode: 'cors',
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(this.state),
   },
   {withCredentials: false}
  )
      .then(response => {
        response.json();
        console.log('info', response);
        this.props.history.push('/signupconfirm', {email: this.state.email});
      })
      .catch(error => {
        console.log('registration error', error);
        alert('Can not register. The email or studentID is existed');
      })
}

render() {
  const {errors} = this.state;
  return (
      <div>
        <div className='square-signup'></div>
        <Link onClick={this.register}><h2 className='signuptext'>ĐĂNG KÝ</h2></Link>
        <div className='BGDK-area'>
          <img alt='' className='BGDK' src={BGDK}/>
        </div>

        <div className='signup-area'>
          <form method="POST" className="signup-form" source="custom" style={{padding: '10px'}}>
              <div className="name-area">
                <input type="text" name='fullName' value={this.state.fullName} onChange={this.handleChange} placeholder="Nhập tên của bạn" className="name-text" required />
                {errors.fullName && <div className="validation" style={{display: 'block'}}>{errors.fullName}</div>}
              </div>
              <div className="email-area">
                <input type="email" name='email' value={this.state.email} onChange={this.handleChange} placeholder="Nhập email" className="email-text" required />
                {errors.email && <div className="validation" style={{display: 'block'}}>{errors.email}</div>}
              </div>
              <div className="id-area">
                <input type="number" name='studentId' value={this.state.studentId} onChange={this.handleChange} placeholder="Nhập mã số sinh viên" className="id-text" required />
                {errors.studentId && <div className="validation" style={{display: 'block'}}>{errors.studentId}</div>}
              </div>
              <div className="gender-area">
                <select 
                    className='gender-text'
                    value={this.state.gender}
                    onChange={this.handleChange}
                    name='gender'
                    required
                >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                </select>
              </div>
              <div className="major-area">
                <input type="text" name='major' value={this.state.major} onChange={this.handleChange} placeholder="Nhập chuyên ngành học" className="major-text" required />
                {errors.major && <div className="validation" style={{display: 'block'}}>{errors.major}</div>}
              </div>
              <div className="faculty-area">
                <select 
                    className='faculty-text'
                    value={this.state.faculty}
                    onChange={this.handleChange}
                    name='faculty'
                    required
                >
                    <option value="fit">Công nghệ thông tin</option>
                    <option value="kt">Kinh tế</option>
                    <option value="ddt">Điện - Điện tử</option>
                    <option value="ck">Cơ khí</option>
                </select>
              </div>
              <div className="date-area">
                <input type="date" name='dob' value={this.state.dob} onChange={this.handleChange} placeholder="Ngày tháng năm sinh" className="date-text" required />
                {errors.dob && <div className="validation" style={{display: 'block'}}>{errors.dob}</div>}
              </div>
              <div className="pass-area">
                <input type="password" name='password' value={this.state.password} onChange={this.handleChange} placeholder="Mật khẩu" className="pass-text" required/>
                {errors.password && <div className="validation" style={{display: 'block'}}>{errors.password}</div>}
              </div>
              <div className="repass-area">
                <input type="password" name='confirmedPassword' value={this.state.confirmedPassword} onChange={this.handleChange} placeholder="Nhập lại mật khẩu" className="repass-text" required/>
                {errors.confirmedPassword && <div className="validation" style={{display: 'block'}}>{errors.confirmedPassword}</div>}
              </div>
              <div className="username-area">
                <input type="text" name='username' value={this.state.username} onChange={this.handleChange} placeholder="Nhập tên đăng nhập" className="username-text" required/>
                {errors.username && <div className="validation" style={{display: 'block'}}>{errors.username}</div>}
              </div>
            </form>
            <div className='newavatar-group'>
              <progress value={this.state.progress} max="100" hidden={true}/>
              <label for="files" className='uploadbtn'>Tải ảnh lên</label>
              <input id='files' type='file' className='uploadbtn' onChange={this.handleInput} hidden='true' required/>
              <button className='uploadbtn' onClick={this.handleUpload}></button>
              <img src={this.state.url} value={this.state.avatarUrl} name='avatarUrl' className='newavatar' alt=" "/>
            </div>
        </div>
      </div>
  );
  }
}

export default SignupFeature;