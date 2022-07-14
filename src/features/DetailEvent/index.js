import React from 'react';
import './style.css';
import AVA from '../../image/spkt.jpg';
import ADDE from '../../image/addevent.png';
import EDITE from '../../image/editevent.png';
import DELE from '../../image/delevent.png';
import JOIN from '../../image/join.png';
import USER1 from '../../image/user1.png';
import USER2 from '../../image/user2.png';
import USER3 from '../../image/user3.png';
import CANCEL from '../../image/cancel.png';
import TT from '../../image/tt.jpg';
import XTN from '../../image/xtn.jpg';
import { Link } from 'react-router-dom';

DetailEventFeature.propTypes = {
    
};

function DetailEventFeature(props) {
    return (
        <div className='eventlist'>
            <div className='body-main'>
                <div className='in4body'>
                    <img className='ava-main' src={AVA}/>
                    <p className='event-name'><b>Be Tester</b></p>
                </div>

                <div className='body-one'>
                    <p className='title11'><b>Chi tiết sự kiện:</b></p>
                    <p className='detailed'>Dành cho những bạn trẻ muốn tìm hiểu về nghề tester</p>
                    <p className='begin-time'><b>Thời gian bắt đầu: </b></p>
                    <p className='begin'>13/02/2022</p>
                    <p className='end-time'><b>Thời gian kết thúc: </b></p>
                    <p className='end'>13/05/2022</p>
                </div>

                <div className='body-two'>
                    <img className='ava-two' src={USER1}/>
                    <img className='ava-two' src={USER2}/>
                    <img className='ava-two' src={USER3}/><br/>
                    <Link className='amount' to='/participant'><p>Người tham gia</p></Link>
                </div>
                
                <div className='body-three'>
                <p className='title-rela'><b>Sự kiện liên quan</b></p>
                    <img className='ava-three' src={TT}/> <p className='name1'>Đêm trung thu</p>
                    <img className='ava-three' src={XTN}/> <p className='name1'>Xuân tình nguyện</p>
                </div>
            </div>

            <div className='buttongr' >
                <Link className='add1btn' to='/addevent'><img className='addevent' src={ADDE}/><b>Thêm sự kiện</b></Link>
                <Link className='edit1' to='/eventedit'><img className='editevent' src={EDITE}/><b>  Sửa sự kiện</b></Link>
                <button className='del1'><img className='delevent' src={DELE}/><b>  Xóa sự kiện</b></button>
            </div>

            <div className='buttongr' hidden='true '>
                <button className='registerbtn'><img className='joinevent' src={JOIN}/><b>  Tham gia</b></button>
                <button className='cancelregbtn'><img className='cancelevent' src={CANCEL}/><b>  Hủy tham gia</b></button>
            </div>
        </div>
    );
}

export default DetailEventFeature;