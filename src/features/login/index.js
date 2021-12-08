import React from 'react';
import './style.css'; 
import { Link } from 'react-router-dom';
import BG from '../../image/dh-su-pham-ky-thuat.jpg';
import { useHistory } from 'react-router-dom';

LoginFeature.propTypes = {
    
};

function LoginFeature() {
    const history = useHistory();
    const handleSubmit = () => {history.push('/signup')};

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
                        <input type="email" placeholder="Nhập email của bạn" className="email" required />
                    </div>
                    <div className="password">
                        <input type="password" placeholder="Nhập mật khẩu của bạn" id="password" name="password" className="password" required />
                    </div>
                    <div className="button">
                        <button className="login-btn" onClick={handleSubmit}><b>ĐĂNG NHẬP</b><br />
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