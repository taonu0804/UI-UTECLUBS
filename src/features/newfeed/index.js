import React, { useState } from 'react';
import './style.css';
import HG from '../../image/huong.jpg';
import NOTJOIN from '../../image/ingroup.png';
import DH from '../../image/1.png';
import JOINED from '../../image/group.png';
import { Link, useHistory } from "react-router-dom";

NewFeedFeature.propTypes = {
    
};

function NewFeedFeature(props) {
    const history = useHistory();
    const state = {
        selectedFile: null
    }
    const _onChange = (e) => {
        const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (acceptedImageTypes.includes(e.target.files[0].type)) {
        this.setState({
         selectedFile: e.target.files[0],
      });
        }
    };
    const onFileUpload = () => {
        const formData = new FormData(); 
     
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
    };
    const handleCLBManage = e => {history.push('/clubmanage')};
    return (
        <div>
            <div className='content-border'>
                <div className='admin-area' hidden=''>
                    <button className='clb-btn' onClick={handleCLBManage}><b>Quản lý CLB</b></button>
                    <button className='add-btn'><b>Thêm thành viên</b></button>
                    <button className='role'><b>Thay đổi vai trò</b></button>
                </div>

                <div className='home-page'>
                    <div className='group-info'>
                    <Link className='info-link' to='/infochange'>
                        <img className='nf-avatar' src={HG}/>
                        <p className='nf-home'><b>Trang cá nhân</b></p>
                    </Link>

                    <Link className='joined-group'>
                        <img className='nf-joined-gr' src={JOINED}/>
                        <p className='nf-joined-txt'><b>CLB đã tham gia</b></p>
                    </Link>

                    <Link className='not-joined-group'>
                        <img className='nf-not-joined-gr' src={NOTJOIN}/>
                        <p className='nf-not-joined-txt'><b>CLB chưa tham gia</b></p>
                    </Link>
                    </div>

                    <div className='newfeed'>
                        <input className='stt-box' type='text' placeholder='Hôm nay bạn thể nào?'></input>
                        <div className='sttimg-box'>
                            <input
                                style={{ display: "none" }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                accept="image/*"
                                onChange={_onChange}
                            />
                            <button className='sttimg-btn' onClick={onFileUpload}></button>
                        </div>
                        <button className='postbtn'><b>Đăng</b></button>
                    </div>

                    <div className='search'>
                        <input className='searchbox' type='text' value={props.inputValue} placeholder='Tìm kiếm'/><br/>
                        <input className='date-search' type='date' placeholder='Ngày tháng'/><br/>
                        <button className='search-txt'><b>Tìm kiếm</b></button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default NewFeedFeature;