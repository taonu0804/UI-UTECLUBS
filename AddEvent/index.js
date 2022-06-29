import React from 'react';
import './style.css';
import DOT from '../../image/dot.png';
import AVA from '../../image/1.png';
import GAME from '../../image/puzzle.jpg';
import AddClbFeature from '../AddClb';
import AddEventSmallFeature from '../Component/AddEvent';

AddEventFeature.propTypes = {
    
};

function AddEventFeature(props) {
    var add1 = 
    return (
        <div className='fullbody'>
            <div className='add-sk'>
                {<AddEventSmallFeature/>}
                <button className='add1' onClick={}><img className='add1' src={DOT}/></button>
                <button className='add2'><img className='add2' src={DOT}/></button>
                <button className='add3'><img className='add3' src={DOT}/></button>
            </div>

            <div className='sample1'>
                <p className='sample-title'>Sự kiện mẫu</p>

                <div className='sample'>
                    <img src={AVA} className='sampleava'/><p className='samplename'><b>Sự kiện mẫu</b></p>
                    <p className='sampledetail'>Chi tiết sự kiện mẫu</p>
                    <img className='game' src={GAME}/>
                </div>
            </div>

            <div className='sample2'>
                <div className='sample21'>
                    <img className='skava' src={AVA}/>
                    <p className='skname'>Sự kiện 1</p>
                </div>
                <div className='sample21'>
                    <img className='skava' src={AVA}/>
                    <p className='skname'>Sự kiện 2</p>
                </div>
                <div className='sample21'>
                    <img className='skava' src={AVA}/>
                    <p className='skname'>Sự kiện 3</p>
                </div>
                <div className='sample21'>
                    <img className='skava' src={AVA}/>
                    <p className='skname'>Sự kiện 4</p>
                </div>
            </div>
        </div>
    );
}

export default AddEventFeature;