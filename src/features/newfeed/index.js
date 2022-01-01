import React, { Component } from 'react';
import './style.css';
import NOTJOIN from '../../image/ingroup.png';
import JOINED from '../../image/group.png';
import { Link } from "react-router-dom";
import { storage } from '../../firebase';

class NewFeedFeature extends Component {constructor (props) {
    super(props);
    this.state = {
        image: null,
        url: '',
        progress: 0,
        showDelBtn: false,
        showImg: false,
        user: '',
    }
    
    this.handleChange = this
    .handleChange
    .bind(this);
    this.handleUpload = this.handleUpload.bind(this);

    }

    handleChange = e => {
      if (e.target.files[0]) {
        const image = e.target.files[0];
        this.setState(() => ({image}));
      }
    }
  
    handleUpload = () => {
      const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      },
      (error) => {
           // error function ....
        console.log(error);
      },
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          console.log(url);
          this.setState({showImg: true});
          this.setState({url});
          this.setState({showDelBtn: true});
        });
      });
    };

    handleDelete = () => {
        this.setState(() => ({showImg: false}));
        this.setState(() => ({showDelBtn: false}));
    };
  
    componentDidMount() {
        const user = localStorage.getItem('user');
        const ava = user.avatarUrl;
        this.setState({ ava });
      }
    render() {
    return (
        <div>
            <div className='content-border'>
                <div className='admin-area'>
                    <Link className='clb-btn' to='/clubdetail'><b>Quản lý CLB</b></Link>
                    <Link className='add-btn'><b>Quản lý thành viên</b></Link>
                </div>

                <div className='home-page'>
                    <div className='group-info'>
                    <Link className='info-link' to='/infochange'>
                        <img className='nf-avatar' src={this.state.avatarUrl}/>
                        <p className='nf-home'><b>Trang cá nhân</b></p>
                    </Link>

                    <Link className='joined-group' to='/joinedclb'>
                        <img className='nf-joined-gr' src={JOINED}/>
                        <p className='nf-joined-txt'><b>CLB đã tham gia</b></p>
                    </Link>

                    <Link className='not-joined-group' to='/notjoinedclb'>
                        <img className='nf-not-joined-gr' src={NOTJOIN}/>
                        <p className='nf-not-joined-txt'><b>CLB chưa tham gia</b></p>
                    </Link>
                    </div>

                    <div className='newfeed'>
                        <input className='stt-box' type='text' placeholder='Hôm nay bạn thể nào?'></input>
                        <div className='sttimg-box'>
                            <progress value={this.state.progress} max="100" hidden={true}/>
                            <label for="files" className='sttimg-btn'></label>
                            <input id='files' type='file' className='sttimg-btn' name='img' onChange={this.handleChange} hidden='true' required/>
                            <button className='changesttimg' onClick={this.handleUpload}></button>
                            <img src={this.state.url} className='sttimg' alt=" " style={{display: this.state.showImg ? 'block' : 'none'}}/>
                            <button className='delimg' onClick={this.handleDelete} style={{display: this.state.showDelBtn ? 'block' : 'none'}}>x</button>
                        </div>
                        <button className='postbtn'><b>Đăng</b></button>
                    </div>

                    <div className='search'>
                        <input className='searchbox' type='text' placeholder='Tìm kiếm'/><br/>
                        <select 
                            className='selectPrefix'
                            value={this.state.selectValue} 
                        >
                            <option value="null">Trạng thái...</option>
                            <option value="post">Trước ngày</option>
                            <option value="in">Trong ngày</option>
                            <option value="late">Sau ngày</option>
                        </select>
                        <input className='date-search' type='date' placeholder='Ngày tháng'/><br/>
                        <button className='search-txt'><b>Tìm kiếm</b></button>
                    </div>
                </div>
            </div>
        </div>

    );
}}

export default NewFeedFeature;