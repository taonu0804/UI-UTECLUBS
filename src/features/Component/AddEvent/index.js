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
                <p className='name-title'><b>Tên sự kiện:</b></p>
                <input type="text" name='eventname' onChange='' placeholder="Nhập tên sự kiện" className="eventname-text" required/>
            </div>

            <div className="detail-area">
                <p className='detail-title'><b>Chi tiết:</b></p>
                <input type="text" name='detail' onChange='' placeholder="Nhập chi tiết sự kiện" className="detail-text" required/>
            </div>

            <p className='begtime-title1'><b>Thời gian: Từ</b></p>
            <div className="begtime-area1">
                <input type="date" name='begin-date' onChange='' placeholder="dd/mm/yyyy" className="begtime-text1" required/>
            </div>

            <div className="endtime-area1">
                <p className='endtime-title1'><b>đến</b></p>
                <input type="date" name='end-date' onChange='' placeholder="dd/mm/yyyy" className="endtime-text" required/>
            </div>

            <div className="maxp-area1">
                <p className='maxp-title'><b>Số lượng người tham gia:</b></p>
                <input type="number" name='maxparti' onChange='' placeholder="" className="max-text" required/>
            </div>

            <button className='submitevent'>Tạo sự kiện</button>
        </div>
    );
}

export default AddEventSmallFeature;