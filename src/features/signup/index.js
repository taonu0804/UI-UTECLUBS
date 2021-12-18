import React, { Component, useState } from 'react';
import './style.css';
import { Button  } from '@material-ui/core';
import BGDK from '../../image/bgdk.png';
import { useHistory } from 'react-router-dom';
import HG from '../../image/huong.jpg';

function SignupFeature(props) {
  const history = useHistory();

  const [state, setState] = useState();
  const _onChange = (e) => {
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (acceptedImageTypes.includes(e.target.files[0].type)) {
      setState({
        ...state,
        avatarFile: e.target.files[0],
      });
    }
};

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [id, setStudentID] = useState('');
  const [gender, setGender] = useState('');
  const [major, setMajor] = useState('');
  const [faculty, setFaculty] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [username, setUserName] = useState('');

  const register = (e) => {
    e.preventDefault();
    let userData = {fullName, email, dob, id, gender, major, faculty, password, repassword, username};
    console.warn(userData);

    fetch('http://localhost:8080/users/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  }).then((Response) => Response.json())
    .then((Result) => {
      console.log('result', Result);
      localStorage.setItem("user-info", JSON.stringify(Result));
      if (Result.Status === 'Success')
          history.push("/signupconfirm");
      else
        alert('Un-authenticated User');
    })
}

  return (
      <div>
        <div className='square-signup'></div>
        <button onClick={register}><h2 className='signuptext'>ĐĂNG KÝ</h2></button>
        <div className='BGDK-area'>
          <img alt='' className='BGDK' src={BGDK}/>
        </div>

        <div className='signup-area'>
          <form method="POST" className="signup-form" source="custom" style={{padding: '10px'}}>
              <div className="name-area">
                <input type="text" onChange={(e) => setFullName(e.target.value)} placeholder="Nhập tên của bạn" className="name-text" required />
              </div>
              <div className="email-area">
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" className="email-text" required />
              </div>
              <div className="id-area">
                <input type="number" onChange={(e) => setStudentID(e.target.value)} placeholder="Nhập mã số sinh viên" className="id-text" required />
              </div>
              <div className="gender-area">
                <input type="text" onChange={(e) => setGender(e.target.value)} placeholder="Nhập giới tính" className="gender-text" required />
              </div>
              <div className="major-area">
                <input type="text" onChange={(e) => setMajor(e.target.value)} placeholder="Nhập chuyên ngành học" className="major-text" required />
              </div>
              <div className="faculty-area">
                <input type="text" onChange={(e) => setFaculty(e.target.value)} placeholder="Nhập tên Khoa" className="faculty-text" required />
              </div>
              <div className="date-area">
                <input type="date" onChange={(e) => setDOB(e.target.value)} placeholder="Ngày tháng năm sinh" className="date-text" required />
              </div>
              <div className="pass-area">
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" className="pass-text" required/>
              </div>
              <div className="repass-area">
                <input type="password" onChange={(e) => setRePassword(e.target.value)} placeholder="Nhập lại mật khẩu" className="repass-text" required/>
              </div>
              <div className="username-area">
                <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Nhập tên đăng nhập" className="username-text" required/>
              </div>
            </form>
            <div className='newavatar-group'>
                  <img alt="" className="newavatar" src={HG} />
                  <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    accept="image/*"
                    onChange={_onChange}
                  />

                  <Button
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
            </div>
        </div>
      </div>
  );
}

export default SignupFeature;