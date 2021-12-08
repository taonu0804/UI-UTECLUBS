import React from 'react';
import './style.css';
import BGDK from '../../image/bgdk.png';
import { Link } from 'react-router-dom';

SignupFeature.propTypes = {
    
};

function SignupFeature(props) {
    return (
        <div>
          <div className='square-signup'></div>
          <Link><h2 className='signuptext'>ĐĂNG KÝ</h2></Link>
          <div className='BGDK-area'>
            <img className='BGDK' src={BGDK}/>
          </div>

          <div className='signup-area'>
            <form method="POST" className="signup-form" source="custom" style={{padding: '10px'}}>
                <div className="name-area">
                  <input type="text" placeholder="Nhập tên của bạn" className="name-text" required />
                </div>
                <div className="email-area">
                  <input type="email" placeholder="Nhập email" className="email-text" required />
                </div>
                <div className="date-area">
                  <input type="date" placeholder="Ngày tháng năm sinh" className="date-text" required />
                </div>
                <div className="pass-area">
                  <input type="password" placeholder="Mật khẩu" className="pass-text" required/>
                </div>
                <div className="repass-area">
                  <input type="password" placeholder="Nhập lại mật khẩu" className="repass-text" required/>
                </div>
              </form>
          </div>
        </div>
    );
}

export default SignupFeature;