import React from 'react';
import './style.css';
import BG from '../../image/spkt.jpg';
import IMG1 from '../../image/1.png';
import IMG2 from '../../image/dai-hoc-spkt-tphcm.jpg';
import IMG3 from '../../image/Data-technology-1.jpg';
import IMG4 from '../../image/dh-su-pham-ky-thuat.jpg';
import { Link} from "react-router-dom";

HomeFeature.propTypes = {
    
};

function HomeFeature(props) {
    return (
      <div className='login-form'>
        <div className='login-group' style={{backgroundColor: 'white'}}>
          <div className='bg-group'>
            <p className='greeting'><b>Chào mừng đến với<br/><span>UTECLUBS</span></b></p>
            <img className='background' src={BG}/>
          </div>

          <div className='login'>
            <Link className='login-link' to='/login'><b>ĐĂNG NHẬP ĐỂ TIẾP TỤC</b></Link>
          </div>
        </div>

        <div className='img-group' style={{backgroundColor: '#FFD700'}}>
          <div className='clear-both'/>
          <img className='image' src={IMG1}/>
          <img className='image' src={IMG2}/>
          <img className='image' src={IMG3}/>
          <img className='image' src={IMG4}/>
        </div>

        <div className='intro-group' style={{backgroundColor: '#233077'}}>
          <p className='intro'><b className='bold'>TIỆN LỢI</b><br/><br/>
          CLB CLUBS là nơi các câu lạc bộ có thể liên lạc, kết nối với nhau một cách nhanh chóng
          </p>
          <p className='intro'><b className='bold'>TÍCH CỰC</b><br/><br/>
          Là môi trường mới, an toàn để các câu lạc bộ hoạt động, giao lưu với nhau
          </p>
          <p className='intro'><b className='bold'>HIỆU QUẢ</b><br/><br/>
          Bằng những tính năng và sự riêng tư, giúp cho việc hoạt động câu lạc bộ tối ưu và hiệu quả hơn
          </p>
        </div>
      </div>
    );
}

export default HomeFeature;