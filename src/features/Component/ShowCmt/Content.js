import React, { Component } from 'react';
import './style.css';

class ShowCmtComponent extends Component {
    constructor(props) {
    super(props)
    this.state = {
        cmt: [],
        showUrl: true,
    };
    this.handleDel = this.handleDel.bind(this);
    }
    componentDidMount() {
        const token = localStorage.getItem('access_token');
        console.log(token);
        const postId = this.props.postId;

        fetch(`http://localhost:8080/comments/get-by-post/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(cmts => {
                    console.log(cmts);
                    let details = [];
    
                    for (var item in cmts) {
                        details.push({ name: item, value: cmts[item] });
                    }
        
                    this.setState({
                        cmt: details,
                        loading: true,
                    })
                })
                .catch(error => console.log(error))
    }

    handleDel(cmtId, postId, content) {
        const token = localStorage.getItem('access_token');
         if (window.confirm('Bạn chắc chắn muốn xóa bình luận này?') == true) {
           fetch(`http://localhost:8080/comments/${cmtId}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(postId, content),
           })
              .then(response => {
                 response.json();
                 if (response.status === 400) {
                     alert('Bạn không thể xóa bình luận này');
                 }
                 else {
                    alert('Xóa thành công');
                    window.location.reload();
                }
              })
              .catch(error => console.log(error))
           }
           else {
              return;
           }
    }
    render() {
        const cmt = this.state.cmt.map((i) => {
            return(
            <div className='cmtnew'>
                <h5 className='commentName'>{i.value.authorFullName}</h5><button className='delcmt' style={{display: this.state.showUrl ? 'block' : 'none'}}  onClick={() => {this.handleDel(i.value.commentId, i.value.postId, i.value.content)}}>...</button>
                <p className='commenttxt'>{i.value.content}</p>
            </div>
        )});
        return (
            <div className='commentarea'>
                <h5 className='welc'>Bình luận trên bài viết của {this.props.fullName}</h5>
                <hr/>
                {cmt.length ? cmt : <p>Chưa có bình luận nào. Hãy trả lời bạn bè của bạn nhé.</p>}
            </div>
        );
    }
}

export default ShowCmtComponent;