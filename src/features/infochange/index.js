import React, { useState } from 'react';
import { Button  } from '@material-ui/core';
import './style.css';
import HG from '../../image/huong.jpg';
import { Link } from 'react-router-dom';

InfoChangeFeature.propTypes = {
    
}; 

function InfoChangeFeature(props) {
    const [state, setState] = useState({
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/myevents-finalproject.appspot.com/o/images%2F25780c863cb1c8ef91a0.jpg?alt=media&token=51c300f4-f947-41d3-96d5-440ef2303fd0",
        avatarFile: null,
        account: {
          oldpassword: "",
          newpassword: "",
          renewpassword: ""
        },
      });

    const _onChange = (e) => {
        const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (acceptedImageTypes.includes(e.target.files[0].type)) {
          setState({
            ...state,
            avatarFile: e.target.files[0],
          });
        }
    };

    return (
        <div>
            <div className='frame'></div>
            <form method="POST" className="info-form" style={{padding: 0}} source="custom" name="form">
                <div className='avatar-group'>
                    <img alt="" className="avatar" src={HG} />
                    <label htmlFor="upload-photo">
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      accept="image/*"
                      onChange={_onChange}
                    />

                    <Button
                      component="span"
                    >
                      Upload
                    </Button>
                  </label>
                </div>
                <div className="pass-group">
                    <label className="pass-label">Mật khẩu cũ</label>
                    <input type="password" placeholder="Vui lòng nhập mật khẩu cũ" className="oldpassword" required />
                </div>
                <div className="newpass-group">
                    <label className="newpass-label">Mật khẩu mới</label>
                    <input type="password" placeholder="Vui lòng nhập mật khẩu mới" className="newpassword" required />
                </div>
                <div className="repass-group">
                    <label className="repass-label" wfd-invisible="true">Nhập lại mật khẩu mới</label>
                    <input type="password" placeholder="Vui lòng nhập lại mật khẩu mới" className="renewpassword" required />
                </div>
                <div className="change-group">
                    <Link href="#" className="change-link">THAY ĐỔI</Link>
                </div>
            </form>
        </div>
    );
}
export default InfoChangeFeature;