import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';
import BGDK from '../../image/bgdk.png';
import Validator from '../../utils/validator.js';
import { storage } from '../../firebase';
import DAVA from '../../image/dava.jpg';

class SignupFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      image: null,
      progress: 0,
      url: '',
      errors: {},
      info: [],
      img: null,
      showtxt: true,
    }

    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;

    const rules = [
      {
        field: 'fullName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Yêu cầu nhập họ tên.',
      },
      {
        field: 'avatarUrl',
        method: 'isEmpty',
        validWhen: false,
        message: 'Yêu cầu chọn ảnh đại diện.',
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Yêu cầu nhập email',
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
        message: 'Yêu cầu nhập mã số sinh viên',
      },
      {
        field: 'gender',
        method: 'isEmpty',
        validWhen: false,
        message: 'Yêu cầu chọn giới tính',
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
        message: 'Yêu cầu chọn khoa.',
      },
      {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'Yêu cầu nhập tên đăng nhập.',
      },
      {
        field: 'dob',
        method: 'isEmpty',
        validWhen: false,
        message: 'Yêu cầu chọn ngày tháng năm sinh.',
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Yêu cầu nhập mật khẩu.',
      },
      {
        field: 'confirmedPassword',
        method: 'isEmpty', 
        validWhen: false,
        message: 'Yêu cầu nhập mật khẩu.',
      },
      {
        field: 'password',
        method: 'isLength',
        args: [{min: 8}],
        validWhen: true,
        message: 'Yêu cầu nhập mật khẩu.',
      },
      {
        field: 'confirmedPassword',
        method: this.passwordMatch,
        validWhen: true,
        message: 'Mật khẩu không khớp.'
      },
    ];
    this.validator = new Validator(rules);

    this.handleInput = this.handleInput.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  passwordMatch = (confirmation, state) => (state.password === confirmation)
    handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleInput(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
    this.setState({showtxt: false})
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
        this.setState({
          avatarUrl: url,
        });
      });
    });
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.setState({showtxt: false})
  }

  register() {
    this.setState({
      errors: this.validator.validate(this.state),
    });
   fetch('https://uteclubs.herokuapp.com/users/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
   },
   {withCredentials: false}
  )
      .then(response => {
        console.log(response);
        if (response.ok === true) {
          this.props.history.push('/signupconfirm');
          localStorage.setItem('pass', JSON.stringify(this.state.password));
        }
        else{
          alert('Đã xảy ra lỗi');
          return;
        }
      })
      .catch(error => {
        console.log('Đã xảy ra lỗi', error);
      })
}

render() {
  const {errors} = this.state;
  return (
      <div>
        <div className='BGDK-area'>
          <img alt='' className='BGDK' src={BGDK}/>
        </div>

        <div className='signup-area'>
          <div className="signup-form">
              <div className="name-area">
                <input type="text" name='fullName' onChange={this.handleChange} placeholder="Nhập tên của bạn" className="name-text" required />
                {errors.fullName && <div className="validation" style={{display: 'block'}}>{errors.fullName}</div>}
              </div>
              <div className="email-area">
                <input type="email" name='email' onChange={this.handleChange} placeholder="Nhập email" className="email-text" required />
                {errors.email && <div className="validation" style={{display: 'block'}}>{errors.email}</div>}
              </div>
              <div className="id-area">
                <input type="number" name='studentId' onChange={this.handleChange} placeholder="Nhập mã số sinh viên" className="id-text" required />
                {errors.studentId && <div className="validation" style={{display: 'block'}}>{errors.studentId}</div>}
              </div>
              <div className="gender-area">
                <select
                    className='gender-text'
                    onChange={this.handleChange}
                    name='gender'
                    required
                >
                    <option value="">Giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                </select>
              </div>
              <div className="major-area">
                <input type="text" name='major' onChange={this.handleChange} placeholder="Nhập chuyên ngành học" className="major-text" required />
                {errors.major && <div className="validation" style={{display: 'block'}}>{errors.major}</div>}
              </div>
              <div className="faculty-area">
                <select
                    className='faculty-text'
                    onChange={this.handleChange}
                    name='faculty'
                    required
                >
                    <option value="">Khoa</option>
                    <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                    <option value="Kinh tế">Kinh tế</option>
                    <option value="Điện - Điện tử">Điện - Điện tử</option>
                    <option value="Cơ khí">Cơ khí</option>
                </select>
              </div>
              <div className="date-area">
                <p className='datealt' style={{display: this.state.showtxt ? 'block' : 'none'}}>Ngày tháng năm sinh</p>
                <input type="date" name='dob' onChange={this.handleChange} placeholder="Ngày tháng năm sinh" className="date-text" required />
                {errors.dob && <div className="validation" style={{display: 'block'}}>{errors.dob}</div>}
              </div>
              <div className="pass-area">
                <input type="password" name='password' onChange={this.handleChange} placeholder="Mật khẩu" className="pass-text" required/>
                {errors.password && <div className="validation" style={{display: 'block'}}>{errors.password}</div>}
              </div>
              <div className="repass-area">
                <input type="password" name='confirmedPassword' onChange={this.handleChange} placeholder="Nhập lại mật khẩu" className="repass-text" required/>
                {errors.confirmedPassword && <div className="validation" style={{display: 'block'}}>{errors.confirmedPassword}</div>}
              </div>
              <div className="username-area">
                <input type="text" name='username' onChange={this.handleChange} placeholder="Nhập tên đăng nhập" className="username-text" required/>
                {errors.username && <div className="validation" style={{display: 'block'}}>{errors.username}</div>}
              </div>
            </div>
            <img className='avaAlt' src={DAVA} style={{display: this.state.showtxt ? 'block' : 'none'}}/>
            <div className='newavatar-group'>
              <progress value={this.state.progress} max="100" hidden={true}/>
              <label htmlFor="files" className='uploadbtn'>Tải ảnh lên</label>
              <input id='files' type='file' className='uploadbtn' onChange={this.handleInput} hidden={true} required/>
              <button className='uploadbtn' onClick={this.handleUpload}></button>
              <img src={this.state.url} name='avatarUrl' value={this.state.avatarUrl} onChange={this.handleChange} className='newavatar' alt="Ảnh đại diện"/>
            </div>
        <button onClick={this.register} className='signupbtn'>ĐĂNG KÝ</button>
        </div>
      </div>
  );
  }
}

export default SignupFeature;