import React from 'react';
import './style.css';
import TNXK from '../../image/tnxk.png';

ClubDetailFeature.propTypes = {
    
};

function ClubDetailFeature(props) {
    return (
        <div>
            <div className='detail-contain'>
                <h3 className='club-name'><b>Thanh Niên Xung Kích</b></h3>
                <img className='club-img' src={TNXK}/>
                <h5 className='lead-text'><b>Chủ nhiệm: </b></h5>
                <p className='lead-name'>Nguyễn Văn A</p>
                <p className='desc'><b>Mô tả: </b></p>
                <p className='desc-detail'>Là câu lạc bộ lâu đời của trường Đại học Sư phạm kỹ thuật Tp.HCM. Với phương châm sống hết mình học hết cỡ...</p>
            </div>
        </div>
    );
}

export default ClubDetailFeature;