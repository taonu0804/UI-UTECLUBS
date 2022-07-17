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
            <p className='greeting'><b>UTE Clubs</b></p>
            <img className='background' src={BG}/>
          </div>

          <div className='login'>
            <Link className='login-link' to='/login'><b>ĐĂNG NHẬP ĐỂ TIẾP TỤC</b></Link>
          </div>
        </div>

        <div className='img-group'>
          <div className='clear-both'/>
          <img className='image1' src={IMG1}/>
          <p className='intro1'><b className='bold'>TIỆN LỢI</b><br/><br/>
          CLB CLUBS là nơi các câu lạc bộ có thể liên lạc, kết nối với nhau một cách nhanh chóng
          </p>
          <hr className='line1'/>
          <img className='image2' src={IMG2}/>
          <p className='intro2'><b className='bold'>TÍCH CỰC</b><br/><br/>
          Là môi trường mới, an toàn để các câu lạc bộ hoạt động, giao lưu với nhau
          </p>
          <hr className='line2'/>
          <img className='image3' src={IMG3}/>
          <p className='intro3'><b className='bold'>HIỆU QUẢ</b><br/><br/>
          Bằng những tính năng và sự riêng tư, giúp cho việc hoạt động câu lạc bộ tối ưu và hiệu quả hơn
          </p>
        </div>
      </div>
    );
}

export default HomeFeature;