import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; 
import BG from '../../image/dh-su-pham-ky-thuat.jpg';

LoginFeature.propTypes = {
    
};

function LoginFeature() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = e => {
        e.preventDefault();

    PostData(username, password).then(result => {
        console.log(result);
      });

      console.log("username", username);
      console.log("password", password);
    }

    return (
        <div className='login-page'>
            <div className='decor'></div>
            <div className='login-bg'>
                <img className='bg' src={BG}/>
            </div>

            <div className='login-area'>
                <p className='text'><b>ĐĂNG NHẬP</b></p>
                <form method="POST" className="login-form-area" style={{padding: '0px'}}>
                    <div className="email">
                        <input type="text" placeholder="Nhập email của bạn" className="email" onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="password">
                        <input type="password" placeholder="Nhập mật khẩu của bạn" id="password" name="password" className="password" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="button">
                        <button className="login-btn" ><b>ĐĂNG NHẬP</b><br />
                        </button>
                    </div>
                    <input type="hidden" defaultValue name="recaptchaResponse" wfd-invisible="true" />
                </form>
                <Link className="signup-link" to='/signup'>Chưa có tài khoản? Đăng ký ngay</Link>
            </div>
        </div>

    );
}

export default LoginFeature;

export function PostData(userData) {
    let BaseUrl = "http://localhost:8080/users/login";
    console.log("userData", userData);
    return new Promise((resolve, reject) => {
    var formBody = [];
    for (var property in userData) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(userData[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch(BaseUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
        body: formBody
    })
      .then(response => response.json())
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(error => {
        reject(error);
      });
    });
}