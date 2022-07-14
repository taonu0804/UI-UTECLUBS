import React from 'react';
import './style.css';
import AVA from '../../image/1.png';

EventEditFeature.propTypes = {
    
};

function EventEditFeature(props) {
    return (
        <div className='eventdetail1'>
            <div className='detail-contain1'>
                <div className='namearea'>
                    <div className='ename-area'>
                        <p className='enametitle'><b>Tên sự kiện</b></p>
                        <input type='text' className='ename' name='eName' placeholder='Be Tester' required/>
                    </div>

                    <p className='begtimetitle'><b>Thời gian: Từ</b></p>
                    <div className="begtime-area">
                        <input type="date" name='begdate' onChange='' placeholder="" className="begdatetext" required/>
                    </div>

                    <div className="endtime-area">
                        <p className='endtimetitle'><b>đến:</b></p>
                        <input type="date" name='enddate' onChange='' placeholder="" className="enddatetext" required/>
                    </div>

                    <div className="maxp-area">
                        <p className='maxptitle'><b>Số lượng người tham gia:</b></p>
                        <input type="number" name='maxp' onChange='' placeholder="50" className="maxp-text" required/>
                    </div>

                <button type="submit" className="e-button" ><b>Cập nhật</b></button>
                </div>

                <div className='avaarea'>
                    <div className='eimg-area'>
                        <progress value='' max="100" hidden={true}/>
                        <label htmlFor="files" className='img'>Tải ảnh lên</label>
                        <input id='files' type='file' className='img' onChange='' hidden={true} required/>
                        <button className='img' onClick=''></button>
                        <img src={AVA} name='logoUrl' value={AVA} className='eve-img' alt=" "/>
                    </div>

                    <div className='eunit-area'>
                        <div className='edesc-area'>
                            <p className='edesc1'><b>Mô tả: </b></p>
                            <textarea className='edescdetail' name='edescription' placeholder='Dành cho những bạn trẻ muốn tìm hiểu về nghề tester' required/>
                        </div>
                    </div>
              </div>
            </div>
        </div>
    );
}

export default EventEditFeature;