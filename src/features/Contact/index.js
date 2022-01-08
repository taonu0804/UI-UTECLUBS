import React from 'react';
import './style.css';
import HG from '../../image/huong.jpg';
import MQ from '../../image/quan.jpg';
import LOGO from '../../image/UTE-CLUBS.png';

ContactFeature.propTypes = {
    
};

function ContactFeature(props) {
    return (
        <div>
            <div className='square-decor'></div>
            <div className='bg-contact'>
                <img className='logo' src={LOGO}/>
                <div className='square'/>
                <p className='contact-text'><b>Đừng ngại ngần liên hệ với<br/> CHÚNG TÔI</b></p>
            </div>

            <div className='member'>
                <div className='name-area1'>
                    <img className='mem-img' src={HG}/>
                    <h4 className='name'>Tạ Thị Mai Hương</h4>
                    <p className='mssv'>18110298</p>
                </div>
                <div className='name-area2'>
                    <img className='mem-img' src={MQ}/>
                    <h4 className='name'>Võ Trần Minh Quân</h4>
                    <p className='mssv'>18110344</p>
                </div>
            </div>
        </div>

    );
}

export default ContactFeature;