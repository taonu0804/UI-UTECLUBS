import React, { Component } from 'react';
import './style.css';
import NOTJOIN from '../../image/group.png';
import JOINED from '../../image/home.jpg';
import NOTI from '../../image/chuong.png';
import { Link } from "react-router-dom";
import { storage } from '../../firebase';
import { matchPath } from 'react-router-dom/cjs/react-router-dom.min';
import SEND from '../../image/send.png';
import Moment from 'moment';
import Popup from 'reactjs-popup';
import ShowCmtComponent from '../Component/ShowCmt/Content';
import CMT from '../../image/cmt.png';

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
        posts: [],
        cmt: [],
        clubId: '',
        showBtn: false,
        showLink: false,
        showUrl: true,
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.hanldeOut = this.hanldeOut.bind(this);
    this.handleCmt = this.handleCmt.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    }
  
    componentDidMount() {
        const token = localStorage.getItem('access_token');
       const match = matchPath(this.props.history.location.pathname, {
           path: '/newfeed/:clubId',
           exact: true,
           strict: false
       })
       const id = match.params.clubId;
       console.log('id', id);
       this.setState({clubId: id});
   
        fetch(`http://localhost:8080/clubs/${id}/get-role`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response.statusText);
                return response.text();
        })
        .then(item => {
            console.log(item);
            if (item === 'ROLE_LEADER') {
                this.setState({showBtn: false});
                this.setState({showLink: true});
                this.setState({showUrl: true});
            }
            else if (item === 'ROLE_MODERATOR') {
                this.setState({showLink: false});
                this.setState({showBtn: true});
                this.setState({showUrl: true});
            }
            else {
                this.setState({showLink: true});
                this.setState({showBtn: false});
                this.setState({showUrl: false});
            }
        })

        fetch('http://localhost:8080/users/current-user', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(user => {
                this.setState({userclubs: user});
            })


        fetch(`http://localhost:8080/posts/get-by-club/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                }
            })
                .then(response => response.json())
                .then(post => {
                    console.log(post);
                    let details = [];

                    for (var i in post) {
                        details.push({name: i, value: post[i]})
                    }
        
                    this.setState({
                        posts: details,
                    })
                })
            .catch(error => console.log(error))
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
    
    hanldeOut(clubId) {
        const token = localStorage.getItem('access_token');
        console.log('userId', token);
         if (window.confirm('Bạn chắc chắn muốn rời Câu lạc bộ?') == true) {
           fetch(`http://localhost:8080/clubs/${clubId}/leave`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              }
           })
              .then(response => {
                 response.json();
                 alert('Thoát thành công');
                 this.props.history.push('/userwelcome');
              })
              .catch(error => console.log(error))
           }
           else {
              return;
           }
      }

      handleInput(e) {
          this.setState({
              [e.target.name]: e.target.value,
          })
      }

      handleCmt(postId) {
        const token = localStorage.getItem('access_token');
        console.log(postId);
        const body = {
            content: this.state.content,
            postId: postId,
        }
        fetch('http://localhost:8080/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })
            .then(response => {response.json();
                console.log(response);
            })
            .then(item => {
                this.setState({
                    cmt: item,
                })
                
                window.location.reload();
            })
            .catch((e) => {
                console.log('error', e);
            })
      }

    handlePost(e) {
        const token = localStorage.getItem('access_token');
        const match = matchPath(this.props.history.location.pathname, {
            path: '/newfeed/:clubId',
            exact: true,
            strict: false
        })
        const id = match.params.clubId;
        console.log('id', id);
        const body = {
            content: this.state.content,
            clubId: id,
            imageUrl: this.state.url,
        }
        fetch('http://localhost:8080/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })
            .then(response => {response.json();
                console.log(response);
                alert('Đăng bài thành công');
                window.location.reload();
            })
            .catch((e) => {
                console.log('error', e);
            })
    }

    handleDel(postId) {
        const token = localStorage.getItem('access_token');
         if (window.confirm('Bạn chắc chắn muốn xóa bài viết?') == true) {
           fetch(`http://localhost:8080/posts/${postId}`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              }
           })
              .then(response => {
                 response.json();
                 alert('Xóa thành công');
                 window.location.reload();
              })
              .catch(error => console.log(error))
           }
           else {
              return;
           }
    }

    handleSearch(clubId) {
        const token = localStorage.getItem('access_token');
        const body ={
            clubId: clubId,
            searchQuery: this.state.searchQuery,
            dateQuery: this.state.prefix + this.state.date,
        }
        fetch('http://localhost:8080/posts/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })
            .then(response => {
                console.log(response.statusText);
                return (response.text());
            }).then(item => {
                console.log(item);
                if (item !== '') {
                    const arr = JSON.parse(item);
                    console.log(arr);
                    var data = [];

                    for (var i in arr)
                    {
                        data.push({name: i, value: arr[i]})
                    }

                    this.setState({posts: data});
                }
                else {
                    alert('Không có kết quả');
                }
            })
            .catch((e) => {
                console.log('error', e);
            })
    }

    render() {
        const {userclubs} = this.state;
        const {posts} = this.state;
        const clubId = this.state.clubId;
        const post= posts.map((item) => {
            Moment.locale('en');
            const dt = Moment(item.value.createdDate).format('yyyy/MM/DD');
            const fullName = item.value.authorFullName;
            const ava = item.value.authorAvtUrl;
            const content = item.value.content;
            const img = item.value.imageUrl;
            return (
                <div className='nf-post' key={item.value.postId}>
                <div className='posted'>
                    <button className='delpost' style={{display: this.state.showUrl ? 'block' : 'none'}} onClick={() => {this.handleDel(item.value.postId)}}>...</button>
                    <h3 className='authorFullName'><img className='authorAvtUrl' src={ava}/> {fullName}</h3>
                    <p className='createdDate'>{dt}</p>
                    <p className='content'>{content}</p>
                    <img src={img} className='imageUrl'/>
                    <Popup modal trigger={<button className='cmts'><img src={CMT} className='cmts'/></button>}>
                      {<ShowCmtComponent postId={item.value.postId} fullName={item.value.authorFullName}/>}
                  </Popup>
                </div>
                <div className='cmt'>
                    <textarea type='text' className='cmttxt' name='content' onChange={this.handleInput}/><button className='send' onClick={() => {this.handleCmt(item.value.postId)}}><img className='send' src={SEND}/></button>
                </div>
                </div>
        )
    });
    return (
        <div>
            <div className='content-border'>
                <div className='home-page'>
                    <div className='group-info'>
                    <Link className='info-link' to={`/infochange/${userclubs.userId}`}>
                        <img className='nf-avatar' src={userclubs.avatarUrl}/>
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

                    <Link className='get-noti-group' to={`/noti/${clubId}`} style={{display: this.state.showLink ? 'block' : 'none'}}>
                        <img className='nf-get-noti-gr' src={NOTI}/>
                        <p className='nf-get-noti-txt'><b>Thêm thành viên</b></p>
                    </Link>

                    <button className='leave' onClick={() => {this.hanldeOut(clubId)}} style={{display: this.state.showBtn ? 'block' : 'none'}}><b>Rời câu lạc bộ</b></button>
                    </div>

                    <div className='newfeed'>
                        <textarea className='stt-box' type='text' name='content' onChange={this.handleInput} placeholder='Hôm nay bạn thể nào?'></textarea>
                        <div className='sttimg-box'>
                            <progress value={this.state.progress} max="100" hidden={true}/>
                            <label htmlFor="files" className='sttimg-btn'></label>
                            <input id='files' type='file' className='sttimg-btn' onChange={this.handleChange} hidden={true} required/>
                            <button className='changesttimg' onClick={this.handleUpload}></button>
                            <img src={this.state.url} name='imageUrl' value={this.state.url} onChange={this.handleInput} className='sttimg' alt=" " style={{display: this.state.showImg ? 'block' : 'none'}}/>
                            <button className='delimg' onClick={this.handleDelete} style={{display: this.state.showDelBtn ? 'block' : 'none'}}>x</button>
                        </div>
                        <button className='postbtn' onClick={this.handlePost}><b>Đăng</b></button>

                        {post.length ? post : <p className='notible'>Chưa có bài viết nào. Hãy tạo bài viết mới để giao lưu nhé!</p>}
                    </div>

                    <div className='search'>
                        <input className='searchbox' type='text' name='searchQuery' onChange={this.handleInput} placeholder='Tìm kiếm'/><br/>
                        <select 
                            className='selectPrefix'
                            name='prefix'
                            onChange={this.handleInput}
                        >
                            <option value="null">Trạng thái...</option>
                            <option value="lt">Trước ngày</option>
                            <option value="eq">Trong ngày</option>
                            <option value="gt">Sau ngày</option>
                        </select>
                        <input className='date-search' type='date' name='date' onChange={this.handleInput} placeholder='Ngày tháng'/><br/>
                        <button className='search-txt' onClick={() => {this.handleSearch(clubId)}}><b>Tìm kiếm</b></button>
                    </div>
                </div>
            </div>
        </div>

    );
}}

export default NewFeedFeature;