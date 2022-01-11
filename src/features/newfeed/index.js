import React, { Component } from 'react';
import './style.css';
import NOTJOIN from '../../image/group.png';
import JOINED from '../../image/home.jpg';
import NOTI from '../../image/chuong.png';
import { Link } from "react-router-dom";
import { storage } from '../../firebase';

class NewFeedFeature extends Component {
    constructor (props) {
    super(props);
    this.state = {
        image: null,
        url: '',
        progress: 0,
        showDelBtn: false,
        showImg: false,
        userclubs: [],
        user: '',
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePost = this.handlePost.bind(this);

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
        const url = '';
        this.setState(() => ({url}));
        this.setState(() => ({showImg: false}));
        this.setState(() => ({showDelBtn: false}));
    };
  
    componentDidMount() {
        const access_token = localStorage.getItem('access_token');
        const user = parseJwt(access_token);
        console.log('avatar', user);

        const token = localStorage.getItem('access_token');
        console.log('userId', token);

       fetch('http://localhost:8080/club-management', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
       })
             .then(response => response.json())
             .then(clubs => {
                console.log('clubs', clubs);
                 this.setState({
                     userclubs: clubs,
                     loading: true,
                 })
             })
          .catch(error => console.log(error))
      }

      handlePost(e) {
          e.preventDefault();
      }
    render() {
        const {userclubs} = this.state; 
        console.log(this.state);
        const clubId = userclubs.map((item) => ( item.clubId ));
    return (
        <div>
            <div className='content-border'>
                <div className='home-page'>
                    <div className='group-info'>
                    <Link className='info-link' to='/infochange'>
                        <img className='nf-avatar' src={this.state.avatarUrl}/>
                        <p className='nf-home'><b>Trang cá nhân</b></p>
                    </Link>

                    <Link className='joined-group' to={`/userclubdetail/${clubId}`}>
                        <img className='nf-joined-gr' src={JOINED}/>
                        <p className='nf-joined-txt'><b>Thông tin CLB</b></p>
                    </Link>

                    <Link className='not-joined-group' to={`/clbmember/${clubId}`}>
                        <img className='nf-not-joined-gr' src={NOTJOIN}/>
                        <p className='nf-not-joined-txt'><b>Thành viên CLB</b></p>
                    </Link>

                    <Link className='get-noti-group' to={`/noti/${clubId}`}>
                        <img className='nf-get-noti-gr' src={NOTI}/>
                        <p className='nf-get-noti-txt'><b>Thêm thành viên</b></p>
                    </Link>

                    <button className='leave'><b>Rời câu lạc bộ</b></button>
                    </div>

                    <div className='newfeed'>
                        <textarea className='stt-box' type='text' placeholder='Hôm nay bạn thể nào?'></textarea>
                        <div className='sttimg-box'>
                            <progress value={this.state.progress} max="100" hidden={true}/>
                            <label for="files" className='sttimg-btn'></label>
                            <input id='files' type='file' className='sttimg-btn' onChange={this.handleChange} hidden='true' required/>
                            <button className='changesttimg' onClick={this.handleUpload}></button>
                            <img src={this.state.url} name='imageUrl' value={this.state.url} className='sttimg' alt=" " style={{display: this.state.showImg ? 'block' : 'none'}}/>
                            <button className='delimg' onClick={this.handleDelete} style={{display: this.state.showDelBtn ? 'block' : 'none'}}>x</button>
                        </div>
                        <button className='postbtn' onClick={this.handlePost}><b>Đăng</b></button>
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

function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export default NewFeedFeature;