import React from 'react';
import './style.css';
import AVA from '../../../image/1.png';

AddEventSmallFeature.propTypes = {
    
};

function AddEventSmallFeature(props) {
    return (
        <div>
            <div className='newava'>
              <progress value='' max="100" hidden={true}/>
              <label htmlFor="files" className='upbtn'>Tải ảnh lên</label>
              <input id='files' type='file' className='upbtn' onChange='' hidden={true} required/>
              <button className='upbtn' onClick=''></button>
              <img src={AVA} name='avaURL' value='' onChange='' className='newava' alt=" "/>
            </div>

            <div className="eventname-area">
                <input type="text" name='eventname' onChange='' placeholder="Nhập tên sự kiện" className="eventname-text" required/>
            </div>

            <div className="detail-area">
                <input type="text" name='detail' onChange='' placeholder="Nhập chi tiết sự kiện" className="detail-text" required/>
            </div>
        </div>
    );
}

export default AddEventSmallFeature;