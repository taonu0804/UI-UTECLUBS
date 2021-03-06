import React, { Component } from 'react';
import './style.css';
import Validator from '../../utils/validator.js';
import { storage } from '../../firebase';
import { matchPath } from 'react-router';

class InfoChangeFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      users: [],
      errors: {},
      showImg: false,
      showGender: true,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;

    const rules = [
      {
        field: 'fullName',
        method: 'isEmpty',
        validWhen: false,
        message: 'The name is required.',
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
  }

  passwordMatch = (confirmation, state) => (state.password === confirmation)
    handleInput = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    const token = localStorage.getItem('access_token');
    console.log(token);
    const match = matchPath(this.props.history.location.pathname, {
      path: '/infochange/:userId',
      exact: true,
      strict: false
    })
    const id = match.params.userId;
    console.log('id', id);

    fetch('https://uteclubs.herokuapp.com/users/' + `${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
   },
   {withCredentials: false})
    .then((response) => response.json())
    .then(item => {
        this.setState({ users: item });
        this.setState({showGender: true});
        console.log(item);
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
    this.setState({showGender: false});
  };

  handleSubmit = (fullName, gender, avatarUrl) => {
    if (this.state.oldPassword !== undefined) {
      this.setState({showImg: true});
    }
    else {
      this.setState({showImg: false});
    }
    if (window.confirm('B???n ch???c ch???n mu???n thay ?????i?') == true ){
    const access_token = localStorage.getItem('access_token');
    console.log('token', access_token);

    var body = {
      fullName: (this.state.fullName === undefined) ? fullName : this.state.fullName,
      gender: (this.state.gender === undefined) ? gender : this.state.gender,
      avatarUrl: (this.state.avatarUrl === undefined) ? avatarUrl : this.state.url,
    }

    console.log(body);

    fetch('https://uteclubs.herokuapp.com/users/update-info', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(body),
       },
       {withCredentials: false}
        )
          .then(() => {
              let item = {fullName, gender, avatarUrl};
                this.setState({ users: item });
                this.setState({showGender: true});
                console.log('item', item);
          })
          .catch((e) => {
            console.log(e);
            this.setState({
              errors: this.validator.validate(this.state),
            });
          })

      if (this.state.oldPassword !== undefined) {
        fetch('https://uteclubs.herokuapp.com/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(this.state),
    },
    {withCredentials: false}
    )
      .then((res) => {
            res.json();
            this.setState({showGender: true});
            console.log('item', res);
            if (res.status === 400) {
              alert('M???t kh???u c?? kh??ng tr??ng kh???p');
              this.setState({
                errors: this.validator.validate(this.state),
              });
            }
            else {
            alert('C???p nh???t th??nh c??ng');
            }
      })
      .catch((e) => {
        console.log(e);
        alert('Kh??ng th??? c???p nh???t!');
      })
    }
    else {
      alert('C???p nh???t th??nh c??ng');
    }
  }
  else {
    return;
  }
  };
  
  handleLogout = () => {
    if (window.confirm('B???n ch???c ch???c mu???n ????ng xu???t?') == true) {
      localStorage.removeItem('access_token');
      this.props.history.push('/');
    }
    else {
      return;
    }
  }

    render() {
      const {errors} = this.state;
      var img;
      if (this.state.url !== '') {
        img = this.state.url;
      }
      else {
        img = this.state.users.avatarUrl;
      }

      var sex='';
      if (this.state.users.gender === 'female') {
        sex='N???';
      }
      else {
        sex='Nam';
      }

    return (
        <div>
            <div className='decos'>
              <p className='helo'><b>XIN CH??O</b></p>
              <p className='name'><b>{this.state.users.fullName}</b></p>
            </div>
            <div className="info-form">
              <p className='label'><b>Ch???nh s???a th??ng tin</b><hr/></p>
              <div className='avatar-group'>
                  <progress value={this.state.progress} max="100" hidden={true}/>
                  <label htmlFor="files" className='ava'>T???i ???nh l??n</label>
                  <input id='files' type='file' className='ava' onChange={this.handleChange} hidden={true} required/>
                  <button className='changeava' onClick={this.handleUpload}></button>
                  <img src={img} name='avatarUrl' value={img} onChange={this.handleInput} className='avatar' alt=" "/>
                </div>
                <button className='logout' onClick={this.handleLogout}>????NG XU???T</button>
                <div className="fullName-group">
                    <label className="fullName-label">H??? v?? t??n</label>
                    <input type="text" name='fullName' className="fullName" placeholder={this.state.users.fullName} value={this.state.fullName} onChange={this.handleInput}/>
                    {errors.fullName && <div className="validation" style={{display: 'block'}}>{errors.fullName}</div>}
                </div>
                <div className="gender-group">
                    <label className="gender-label">Gi???i t??nh</label>
                    <p className='sex' style={{display: this.state.showGender ? 'block' : 'none'}}>{sex}</p>
                    <select 
                        className='gender'
                        value={this.state.gender}
                        onChange={this.handleInput}
                        name='gender'
                        required
                    >
                        <option value="male">Nam</option>
                        <option value="female">N???</option>
                    </select>
                    {errors.gender && <div className="validation" style={{display: 'block'}}>{errors.gender}</div>}
                </div>
                <div className="pass-group">
                    <label className="pass-label">M???t kh???u c??</label>
                    <input type="password" name='oldPassword' placeholder="Vui l??ng nh???p m???t kh???u c??" className="oldpassword" value={this.state.oldPassword} onChange={this.handleInput}/>
                    {errors.oldPassword && <div className="validation" style={{display: 'block'}}>{errors.oldPassword}</div>}
                </div>
                <div className="newpass-group">
                    <label className="newpass-label">M???t kh???u m???i</label>
                    <input type="password" name='newPassword' placeholder="Vui l??ng nh???p m???t kh???u m???i" className="newpassword" value={this.state.newPassword} onChange={this.handleInput}/>
                    {errors.newPassword && <div className="validation" style={{display: 'block', display: this.state.showImg ? 'block' : 'none'}}>{errors.newPassword}</div>}
                </div>
                <div className="repass-group">
                    <label className="repass-label" wfd-invisible="true">Nh???p l???i m???t kh???u m???i</label>
                    <input type="password" name='confirmedPassword' placeholder="Vui l??ng nh???p l???i m???t kh???u m???i" className="renewpassword"  value={this.state.confirmedPassword} onChange={this.handleInput}/>
                    {errors.confirmedPassword && <div className="validation" style={{display: 'block', display: this.state.showImg ? 'block' : 'none'}}>{errors.confirmedPassword}</div>}
                </div>
                <div className="change-group">
                    <button className="change-link" onClick={() => {this.handleSubmit(this.state.users.fullName, this.state.users.gender, this.state.users.avatarUrl)}}>THAY ?????I</button>
                </div>
            </div>
        </div>
    );
  }
}
export default InfoChangeFeature;