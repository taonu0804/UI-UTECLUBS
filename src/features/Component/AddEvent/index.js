import React, { Component } from 'react';
import { storage } from '../../../firebase';
import Validator from '../../../utils/validator.js';
import { useHistory } from 'react-router-dom';
import './style.css';

class AddEventSmallFeature extends Component {
    constructor (props) {
        super(props);
        this.state = {
          image: null,
          url: '',
          progress: 0,
          errors: {},
          events: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;
        const rules = [
          {
            field: 'eventUrl',
            method: 'isEmpty',
            validWhen: false,
            message: 'Yêu cầu chọn ảnh đại diện.',
          },
          {
            field: 'eventname',
            method: 'isEmpty',
            validWhen: false,
            message: 'Yêu cầu nhập tên sự kiện.',
          },
          {
            field: 'detail',
            method: 'isEmpty',
            validWhen: false,
            message: 'Yêu cầu nhập chi tiết sự kiện.',
          },
          {
            field: 'begindate',
            method: 'isEmpty',
            validWhen: false,
            message: 'Yêu cầu nhập ngày bắt đầu.',
          },
          {
            field: 'enddate',
            method: 'isEmpty',
            validWhen: false,
            message: 'Yêu cầu nhập ngày kết thúc.',
          },
          {
            field: 'maxparti',
            method: 'isEmpty',
            validWhen: false,
            message: 'Yêu cầu nhập số người tham gia tối đa.',
          },
        ];
        this.validator = new Validator(rules);
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
          this.setState({url});
          this.setState({
            eventUrl: url
          })
        });
      });
    };

    handleInput(e) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    handleSubmit(e) {
        console.log('event', this.state);
        const access_token = localStorage.getItem('access_token');
        console.log('token', access_token);
        const clubId = this.props.clubId;
        console.log('clubId', clubId);

        var body = {
            name: this.state.eventname,
            description: this.state.detail,
            imageUrl: this.state.eventUrl,
            startTime: this.state.begindate + ' 00:00',
            endTime: this.state.enddate + ' 00:00',
            maximumParticipants: this.state.maxparti,
            clubId: clubId,
        }
        console.log('body', body);

        fetch('https://uteclubs.herokuapp.com/events', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(body),
        },
        {withCredentials: false}
        )
            .then((res) => {
                res.json();
                console.log(res.status);
                if (res.status == 201) {
                    this.setState({events: this.state});
                    console.log('body', this.state.events);
                    alert('Tạo thành công sự kiện');
                }
                else {
                    this.setState({
                        errors: this.validator.validate(this.state),
                    });
                    return;
                }
            })
            .catch((e) => {
                console.log(e);
                alert('Không thể khởi tạo');
            })
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <div className='newava'>
                <progress value={this.state.progress} max="100" hidden={true}/>
                <label htmlFor="files" className='upbtn'>Tải ảnh lên</label>
                <input id='files' type='file' className='upbtn' onChange={this.handleChange} hidden={true} required/>
                <button className='upbtn' onClick={this.handleUpload}></button>
                <img src={this.state.url} name='eventUrl' value={this.state.eventUrl} onChange={this.handleInput} className='newava' alt=" "/>
                <p>{errors.eventUrl && <div className="valid0" style={{display: 'block'}}>{errors.eventUrl}</div>}</p>
                </div>

                <div className="eventname-area">
                    <p className='name-title'><b>Tên sự kiện:</b></p>
                    <input type="text" name='eventname' onChange={this.handleInput} placeholder="Nhập tên sự kiện" className="eventname-text" required/>
                    {errors.eventname && <div className="valid1" style={{display: 'block'}}>{errors.eventname}</div>}
                </div>

                <div className="detail-area">
                    <p className='detail-title'><b>Chi tiết:</b></p>
                    <textarea name='detail' onChange={this.handleInput} placeholder="Nhập chi tiết sự kiện" className="detail-text" required/>
                    {errors.detail && <div className="valid2" style={{display: 'block'}}>{errors.detail}</div>}
                </div>

                <p className='begtime-title1'><b>Thời gian: Từ</b></p>
                <div className="begtime-area1">
                    <input type="date" name='begindate' onChange={this.handleInput} placeholder="dd/mm/yyyy" className="begtime-text1" required/>
                    {errors.begindate && <div className="valid3" style={{display: 'block'}}>{errors.begindate}</div>}
                </div>

                <div className="endtime-area1">
                    <p className='endtime-title1'><b>đến</b></p>
                    <input type="date" name='enddate' onChange={this.handleInput} placeholder="dd/mm/yyyy" className="endtime-text" required/>
                    {errors.enddate && <div className="valid4" style={{display: 'block'}}>{errors.enddate}</div>}
                </div>

                <div className="maxp-area1">
                    <p className='maxp-title'><b>Số lượng người tham gia:</b></p>
                    <input type="number" name='maxparti' onChange={this.handleInput} placeholder="" className="max-text" required/>
                    {errors.maxparti && <div className="valid5" style={{display: 'block'}}>{errors.maxparti}</div>}
                </div>

                <button className='submitevent' onClick={this.handleSubmit}>Tạo sự kiện</button>
            </div>
        );
    }
}

export default AddEventSmallFeature;