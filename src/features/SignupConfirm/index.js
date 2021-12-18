import React from 'react';
import './style.css';

SignupConfirmFeature.propTypes = {
    
};

function SignupConfirmFeature(props) {
    return (
        <div className='signupConfirm-area'>
          <form method="POST" className="signupConfirm-form" source="custom" style={{padding: '10px'}}>
              <div className="code-area">
                <input type="text" placeholder="Nhập mã xác thực ở đây" className="code-text" required />
              </div>
              <button className='confirmbtn'><b>Xác nhận</b></button>
            </form>
        </div>
    );
}

export default SignupConfirmFeature;