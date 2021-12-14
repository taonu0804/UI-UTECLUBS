import React from 'react';
import './style.css';
import ADMIN from '../../image/admin.png';
import CTXH from '../../image/ctxh.jpg';
import KN from '../../image/kn.png';
import ESC from '../../image/esc.png';
import TNXK from '../../image/tnxk.png';

AdminFeature.propTypes = {
    
};

function AdminFeature(props) {
    return (
        <div>
            <img className='admin-bg' src={ADMIN}/>
            <p className='welcome-txt'><b>CHÀO MỪNG ĐẾN VỚI TRANG ADMIN</b></p>
            <div className='adminbtn-group'>
                <button className='admin-btn'><b>Quản lý CLB</b></button>
                <button className='admin-btn'><b>Thêm vai trò</b></button>
            </div>

            <div className='clb-group'>
                <img className='clb-img' src={KN}/>
                <img className='clb-img' src={TNXK}/>
                <img className='clb-img' src={ESC}/>
                <img className='clb-img' src={CTXH}/>
            </div>
        </div>

    );
}

export default AdminFeature;