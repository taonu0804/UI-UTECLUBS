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
      url: '',
      progress: 0,
      info: [],
      errors: {},
    }

    this.handleInput = this
      .handleInput
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);

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
        field: 'confirmedpassword',
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

    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  handleInput = e => {
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

  passwordMatch = (confirmation, state) => (state.password === confirmation)
    handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleChange(e) {
    this.setState({
      [this.state.name]: this.state.value
    });
  }
  
  register(e) {
    this.setState({
      errors: this.validator.validate(this.state),
    });

    axios.post('http://localhost:8080/users/signup', {
      user: {
        fullName: this.state.fullName,
        email: this.state.email,
        studentId: this.state.studentId,
        gender: this.state.gender,
        major: this.state.major,
        faculty: this.state.faculty,
        password: this.state.password,
        confirmedpassword: this.state.confirmedpassword,
        username: this.state.username,
        avatarUrl: this.state.avatarUrl
      }
    },
    {withCredentials: true}
    ).then(res => {
    <Redirect
      to={{
          pathname: "/signupconfirm",
          state: { email: "this.state.email" }
      }}
    />
      console.log('registration res', res); 
    }).catch(error => {
      console.log('registration error', error);
    })
    e.preventDefault();
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
                <input type="text" name='studentId' value={this.state.gender} onChange={this.handleChange} placeholder="Nhập giới tính" className="gender-text" required />
                {errors.gender && <div className="validation" style={{display: 'block'}}>{errors.gender}</div>}
              </div>
              <div className="major-area">
                <input type="text" name='major' value={this.state.major} onChange={this.handleChange} placeholder="Nhập chuyên ngành học" className="major-text" required />
                {errors.major && <div className="validation" style={{display: 'block'}}>{errors.major}</div>}
              </div>
              <div className="faculty-area">
                <input type="text" name='faculty' value={this.state.faculty} onChange={this.handleChange} placeholder="Nhập tên Khoa" className="faculty-text" required />
                {errors.faculty && <div className="validation" style={{display: 'block'}}>{errors.faculty}</div>}
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
                <input type="password" name='confirmedpassword' value={this.state.confirmedpassword} onChange={this.handleChange} placeholder="Nhập lại mật khẩu" className="repass-text" required/>
                {errors.confirmedpassword && <div className="validation" style={{display: 'block'}}>{errors.confirmedpassword}</div>}
              </div>
              <div className="username-area">
                <input type="text" name='username' value={this.state.username} onChange={this.handleChange} placeholder="Nhập tên đăng nhập" className="username-text" required/>
                {errors.username && <div className="validation" style={{display: 'block'}}>{errors.username}</div>}
              </div>
            </form>
            <div className='newavatar-group'>
              <progress value={this.state.progress} max="100" hidden={true}/>
              <label for="files" className='uploadbtn'>Tải ảnh lên</label>
              <input id='files' type='file' className='uploadbtn' name='img' onChange={this.handleInput} hidden='true' required/>
              <button className='uploadbtn' onClick={this.handleUpload}></button>
              <img src={this.state.url} value={this.state.avatarUrl} className='newavatar' alt=" "/>
            </div>
        </div>
      </div>
  );
  }
}

export default SignupFeature;