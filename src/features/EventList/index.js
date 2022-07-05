import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import DEL from '../../image/trashbin.png';
import CHANGE from '../../image/edit.png';
import IMG from '../../image/ctxh.jpg';

EventListFeature.propTypes = {
    
};

function EventListFeature(props) {
    return (
        <div className='body1'>
            <div className='detail-body'>
                <div className='unit-area'>
                    <select 
                        className='unit'
                        value='unit'
                        onChange='unit'
                        name='unit'
                    >
                        <option value="">Đơn vị tổ chức</option>
                    </select>
                </div>

                <div className='body-one'>
                    <div className='event-one'>
                        <Link className='event-link'>
                            <img src={IMG} className='event-img'/>
                            <Link className='event-name'><b>Tên sự kiện</b></Link>
                            <p className='chi-tiết'>Chi tiết sự kiện</p>
                        </Link>
                        <div className='button-area'>
                            <button className='view'><img src={CHANGE} className='view' /></button>
                            <button className='delete'><img src={DEL} className='delete'/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventListFeature;