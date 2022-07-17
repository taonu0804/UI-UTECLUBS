import React, { Component } from 'react';
import './style.css';
import EDIT from '../../image/edit1.png';
import MAJOR from '../../image/major.png';
import DOB from '../../image/dob.png';
import EVENT from '../../image/event.png';
import IN4 from '../../image/in4.png';
import MEM from '../../image/mem.png';
import ADD from '../../image/add-friend.png';
import GDSC from '../../image/gdsc.png';
import { Link } from "react-router-dom";
import { storage } from '../../firebase';
import { matchPath } from 'react-router-dom/cjs/react-router-dom.min';
import SEND from '../../image/send.png';
import Moment from 'moment';
import Popup from 'reactjs-popup';
import ShowCmtComponent from '../Component/ShowCmt/Content';
import CMT from '../../image/cmt.png';
import ADDE from '../../image/addevent.png';

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
        role: null,
        showBtn: false,
        showLink: false,
        showUrl: true,
        showL: false,
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
   
        fetch(`https://uteclubs.herokuapp.com/clubs/${id}/get-role`, {
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
            this.setState({role: item});
            if (item === 'ROLE_LEADER') {
                this.setState({showBtn: false});
                this.setState({showLink: true});
                this.setState({showUrl: true});
                this.setState({showL: true});
            }
            else if (item === 'ROLE_MODERATOR') {
                this.setState({showLink: false});
                this.setState({showBtn: true});
                this.setState({showUrl: true});
                this.setState({showL: true});
            }
            else {
                this.setState({showLink: true});
                this.setState({showBtn: false});
                this.setState({showUrl: false});
                this.setState({showL: false});
            }
        })

        fetch('https://uteclubs.herokuapp.com/users/current-user', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(user => {
                this.setState({userclubs: user});
            })


        fetch(`https://uteclubs.herokuapp.com/posts/get-by-club/${id}`, {
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
           fetch(`https://uteclubs.herokuapp.com/clubs/${clubId}/leave`, {
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
        fetch('https://uteclubs.herokuapp.com/comments', {
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
        fetch('https://uteclubs.herokuapp.com/posts', {
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
           fetch(`https://uteclubs.herokuapp.com/posts/${postId}`, {
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
        fetch('https://uteclubs.herokuapp.com/posts/search', {
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
        const match = matchPath(this.props.history.location.pathname, {
            path: '/newfeed/:clubId',
            exact: true,
            strict: false
        })
        const id = match.params.clubId;
        console.log('id', id);

        const {userclubs} = this.state;
        const {posts} = this.state;
        const clubId = this.state.clubId;
        Moment.locale('en');
        const dob = Moment(userclubs.dob).format('yyyy/MM/DD')
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
                    <button className='delpost' style={{display: this.state.showUrl ? 'block' : 'none'}} onClick={() => {this.handleDel(item.value.postId)}}>x</button>
                    <h3 className='authorFullName'><img className='authorAvtUrl' src={ava}/> {fullName}</h3>
                    <p className='createdDate'>{dt}</p>
                    <hr/>
                    <p className='content'>{content}</p>
                    <img src={img} className='imageUrl'/>
                    <Popup modal trigger={<button className='cmts'><img src={CMT} className='cmts'/></button>}>
                      {<ShowCmtComponent postId={item.value.postId} fullName={item.value.authorFullName}/>}
                  </Popup>
                    <div className='cmt'>
                        <textarea type='text' className='cmttxt' name='content' onChange={this.handleInput}/><button className='send' onClick={() => {this.handleCmt(item.value.postId)}}><img className='send' src={SEND}/></button>
                    </div>
                </div>
                </div>
        )
    });

    const role = this.state.role;
    var link;
    if (role === 'ROLE_LEADER' || role === 'ROLE_MODERATOR') {
        link = `/clubdetail/${clubId}`
    }
    else {
        link = `/userclubdetail/${clubId}`
    }

    return (
        <div className='bodym'>
            <div className='content-border'>
                <div className='home-page'>
                    <div className="w3-row">
                        <div className="w3-col-m3">
                            <div className="w3-card w3-round w3-white">
                                <div className="w3-container">
                                    <Link to={`/infochange/${userclubs.userId}`}><h4 className="w3-center">{userclubs.fullName}</h4></Link>
                                    <img src={userclubs.avatarUrl} className="w3-circle" alt="Avatar"/>
                                    <hr/>
                                    <p className='in4'><img className='idimg' src={EDIT}/>     {userclubs.studentId}</p>
                                    <p className='in4'><img className='majorimg' src={MAJOR}/>     {userclubs.faculty}</p>
                                    <p className='in4'><img className='dobimg' src={DOB}/>     {dob}</p>
                                </div>
                            </div>
                        </div>
                        <br/>
                        
                        <div className="w3-card-w3-round">
                            <Link className="w3-button-w3-block-w3-theme-l1-w3-left-align" to={link}><img className='btnic1' src={IN4}/> Thông tin chung<br/></Link>
                            <Link className="w3-button-w3-block-w3-theme-l1-w3-left-align" to={`/eventlist`}><img className='btnic2' src={EVENT}/> Các sự kiện<br/></Link>
                            <Link className="w3-button-w3-block-w3-theme-l1-w3-left-align" to={`/clbmember/${clubId}`}><img className='btnic3' src={MEM}/> Các thành viên<br/></Link>
                            <Link className="w3-button-w3-block-w3-theme-l1-w3-left-align" to={`/noti/${clubId}`}><img className='btnic4' src={ADD}/> Thêm thành viên<br/></Link>
                            <Link className='add1btn' to={`/addevent/${clubId}`} style={{display: this.state.showL ? 'block' : 'none'}}><img className='addevent' src={ADDE}/>Thêm sự kiện</Link>
                            <button className='onleave' onClick={() => {this.hanldeOut(clubId)}} style={{display: this.state.showBtn ? 'block' : 'none'}}><b>Rời câu lạc bộ</b></button>
                        </div>
                        <br/>
                        
                        <div className="w3-card-w3-round-w3-white-w3-hide-small">
                            <div className="w3-container">
                                <p>Đáng chú ý</p>
                                <p>
                                    <span className="w3-tag-w3-small-w3-theme-d5">Mới</span>
                                    <span className="w3-tag-w3-small-w3-theme-d4">Câu lạc bộ</span>
                                    <span className="w3-tag-w3-small-w3-theme-d3">Sự kiện</span>
                                    <span className="w3-tag-w3-small-w3-theme-d2">Thành viên</span>
                                    <span className="w3-tag-w3-small-w3-theme-d1">Đăng ký</span>
                                    <span className="w3-tag-w3-small-w3-theme-d">Đăng nhập</span>
                                    <span className="w3-tag-w3-small-w3-theme-l1">Bài đăng</span>
                                    <span className="w3-tag-w3-small-w3-theme-l2">Cá nhân</span>
                                </p>
                            </div>
                        <br/>
                    </div>
                </div>

                    <div className='newfeed'>
                        <textarea className='stt-box' type='text' name='content' onChange={this.handleInput} placeholder='Hôm nay bạn thế nào?'></textarea>
                        <div className='sttimg-box'>
                            <progress value={this.state.progress} max="100" hidden={true}/>
                            <label htmlFor="files" className='sttimg-btn'></label>
                            <input id='files' type='file' className='sttimg-btn' onChange={this.handleChange} hidden={true} required/>
                            <button className='changesttimg' onClick={this.handleUpload}></button>
                            <img src={this.state.url} name='imageUrl' value={this.state.url} onChange={this.handleInput} className='sttimg' alt=" " style={{display: this.state.showImg ? 'block' : 'none'}}/>
                            <button className='delimg' onClick={this.handleDelete} style={{display: this.state.showDelBtn ? 'block' : 'none'}}>x</button>
                        </div>
                        <button className='postbtn' onClick={this.handlePost}><b>Đăng</b></button>
                    </div>

                    <div className='post'>
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

                    <div className='sample'>
                        <p className='spname'><b>GDSC</b></p>
                        <img className='spimg' src={GDSC}/>
                        <button className='spbtn'>Thông tin</button>
                    </div>
                </div>
            </div>
        </div>

    );
}}

export default NewFeedFeature;