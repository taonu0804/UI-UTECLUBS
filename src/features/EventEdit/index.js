import React from 'react';
import './style.css';
import AVA from '../../image/1.png';

EventEditFeature.propTypes = {
    
};

function EventEditFeature(props) {
    return (
        <div className='eventdetail'>
            <div className='detail-contain'>
            <h2 className='titletxt'><b>Thông tin sự kiện </b></h2>
              <div className='ename-area'>
                <input type='text' className='ename' name='eName' placeholder='' required/>
              </div>
              <div className='eimg-area'>
                <progress value='' max="100" hidden={true}/>
                <label htmlFor="files" className='img'>Tải ảnh lên</label>
                <input id='files' type='file' className='img' onChange='' hidden={true} required/>
                <button className='changeimg' onClick=''></button>
                <img src={AVA} name='logoUrl' value={AVA} className='club-img' alt=" "/>
              </div>
              <div className='eunit-area'>
                <div className='edesc-area'>
                    <p className='edesc'><b>Mô tả: </b></p>
                    <textarea className='edesc-detail' name='edescription' placeholder='' required/>
                </div>

                <p className='begtime-title'><b>Thời gian: Từ</b></p>
                <div className="begtime-area">
                    <input type="date" name='begdate' onChange='' placeholder="" className="begdate-text" required/>
                </div>

                <div className="endtime-area">
                    <p className='endtime-title'><b>đến:</b></p>
                    <input type="date" name='enddate' onChange='' placeholder="" className="enddate-text" required/>
                </div>

                <div className="maxp-area">
                    <p className='maxp-title'><b>Số lượng người tham gia:</b></p>
                    <input type="number" name='maxp' onChange='' placeholder="" className="maxp-text" required/>
                </div>

                <button type="submit" className="ebutton" ><b>Cập nhật</b></button>
                </div>
            </div>
        </div>
    );
}

export default EventEditFeature;