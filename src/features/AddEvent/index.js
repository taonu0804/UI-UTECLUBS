import React, {useState} from 'react';
import './style.css';
import AVA from '../../image/1.png';
import GAME from '../../image/puzzle.jpg';
import XTN from '../../image/xtn.jpg';
import XTN1 from '../../image/xtn1.jpg';
import MHX from '../../image/mhx.jpg';
import TT from '../../image/tt.jpg';
import AddEventSmallFeature from '../Component/AddEvent';

AddEventFeature.propTypes = {
    
};

function AddEventFeature(props) {

    return (
        <div className='fullbody'>
            <div className='add-sk'>
                <AddEventSmallFeature/>
            </div>

            <div className='samplee1'>
                <p className='sample-title'>Sự kiện mẫu</p>

                <div className='samplee'>
                    <img src={XTN} className='sampleava'/><p className='samplename'><b>Xuân tình nguyện</b></p>
                    <p className='sampledetail'>Sự kiện dành cho toàn thể sinh viên trường</p>
                    <img className='game' src={XTN1}/>
                </div>
            </div>

            <div className='sample2'>
                <div className='sample21'>
                    <img className='skava' src={MHX}/>
                    <p className='skname'>Mùa hè xanh</p>
                </div>
                <div className='sample21'>
                    <img className='skava' src={XTN}/>
                    <p className='skname'>Xuân tình nguyện</p>
                </div>
                <div className='sample21'>
                    <img className='skava' src={TT}/>
                    <p className='skname'>Trung thu</p>
                </div>
                <div className='sample21'>
                    <img className='skava' src={AVA}/>
                    <p className='skname'>Hackathon</p>
                </div>
            </div>
        </div>
    );
}

export default AddEventFeature;