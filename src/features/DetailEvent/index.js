import React from 'react';
import './style.css';
import AVA from '../../image/spkt.jpg';

DetailEventFeature.propTypes = {
    
};

function DetailEventFeature(props) {
    return (
        <div className='eventlist'>
            <div className='body-main'>
                <img className='ava-main' src={AVA}/>
                <p className='event-name'><b>Event Follow Up</b></p>
                <hr className='line'/>

                <div className='body-one'>
                    <p className='title1'><b>Chi tiết sự kiện:</b></p>
                    <p className='detailed'>Sự kiện được dựa trên cơ sở...
                    Sự kiện được dựa trên cơ sở...Sự kiện được dựa trên cơ sở...
                    Sự kiện được dựa trên cơ sở...Sự kiện được dựa trên cơ sở...</p>
                    <p className='begin-time'><b>Thời gian bắt đầu: </b></p>
                    <p className='begin'>13/02/2022</p>
                    <p className='end-time'><b>Thời gian kết thúc: </b></p>
                    <p className='end'>13/02/2022</p>
                </div>

                <div className='body-two'>
                    <img className='ava-two' src={AVA}/>
                    <img className='ava-two' src={AVA}/>
                    <img className='ava-two' src={AVA}/>
                    <p className='amount'>45 người tham gia</p>
                </div>
                
                <div className='body-three'>
                <p className='title-rela'><b>Sự kiện liên quan</b></p>
                    <img className='ava-three' src={AVA}/> <p className='name1'>Sự kiện 1</p>
                    <img className='ava-three' src={AVA}/> <p className='name1'>Sự kiện 2</p>
                </div>
            </div>

            <div className='buttongr'>
                <button className='add1'><b>Add</b></button>
                <button className='edit1'><b>Edit</b></button>
                <button className='del1'><b>Delete</b></button>
                <button className='join1'><b>Join</b></button>
                <button className='leave1'><b>Leave</b></button>
                <button className='follow1'><b>Follow</b></button>
                <button className='unfollow1'><b>Unfollow</b></button>
            </div>
        </div>
    );
}

export default DetailEventFeature;