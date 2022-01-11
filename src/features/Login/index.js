import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; 
import BG from '../../image/dh-su-pham-ky-thuat.jpg';
import { useHistory } from "react-router-dom";
import jwt from 'jwt-decode';

LoginFeature.propTypes = {
    
};

function LoginFeature() {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.warn(username, password);
        let userData = {username, password};

        var formBody = [];
        for (var property in userData) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(userData[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
            body: formBody
        })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message) {
          } else {
            console.log('access_token', data.access_token);
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));
            const role = jwt(data.access_token);
            console.log('role', role);
            if (role.roles[0] === 'ROLE_ADMIN') {
                history.push("/admin");
            } else {
                history.push("/userwelcome");
            }
          }
        })
        .catch((error) => {
            alert('Username hoặc mật khẩu không đúng');
            console.error(error);
        })
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
                        <button className="login-btn" onClick={handleLogin}><b>ĐĂNG NHẬP</b><br />
                        </button>
                    </div>
                    <input type="hidden" defaultValue name="recaptchaResponse" wfd-invisible="true" />
                </form>
                <Link className="signup-link" to='/signup'>Chưa có tài khoản? Đăng ký ngay</Link><br/>
                <Link className="forgetpass-link" to='/inputemail'>Quên mật khẩu?</Link>
            </div>
        </div>

    );
}

export default LoginFeature;
