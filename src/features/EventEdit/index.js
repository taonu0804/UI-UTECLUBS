import React, { Component } from 'react';
import './style.css';
import { storage } from '../../firebase';
import { matchPath } from 'react-router';
import AVA from '../../image/1.png';
import Moment from 'moment';

class EventEditFeature extends Component {
    constructor (props) {
      super(props);
      this.state = {
        image: null,
        progress: 0,
        url: '',
        events: [],
        showUnit: true,
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleUpload = this.handleUpload.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const access_token = localStorage.getItem('access_token');
        console.log('token', access_token);

        fetch('https://uteclubs.herokuapp.com/events?page=0', {
         headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
      })
            .then(response => response.json())
            .then(events => {
               let details = [];

               for (var i in events.content) {
                   details.push({ name: i, value: events.content[i] })
               }
   
                this.setState({
                    events: details,
                    loading: true,
                })
            })
         .catch(error => console.log(error))
    }

    handleChange = e => {
      if (e.target.files[0]) {
        const image = e.target.files[0];
        this.setState(() => ({image}));
        console.log('image', image);
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
          this.setState({url})
        });
      });
    }

    handleSubmit = (name, description, imageUrl, startTime, endTime, maximumParticipants) => {
      const access_token = localStorage.getItem('access_token');
      console.log('token', access_token);
  
      var body = {
        name: (this.state.name === undefined) ? name : this.state.name,
        description: (this.state.description === undefined) ? description : this.state.description,
        imageUrl: (this.state.imageUrl === undefined) ? imageUrl : this.state.url,
        startTime: (this.state.startTime === undefined) ? startTime : this.state.startTime,
        endTime: (this.state.endTime === undefined) ? endTime : this.state.endTime,
        maximumParticipants: (this.state.maximumParticipants === undefined) ? maximumParticipants : this.state.maximumParticipants,
      }
      const match = matchPath(this.props.history.location.pathname, {
        path: '/eventedit/:eventId',
        exact: true,
        strict: false
      })
      const linkId = match.params.eventId;
      console.log('LinkId', linkId);
  
      console.log(body);
      if (window.confirm('Bạn chắc chắc muốn cập nhật?') == true) {
  
      fetch(`https://uteclubs.herokuapp.com/events/${linkId}`, {
              method: 'PUT',
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify(body),
         },
         {withCredentials: false}
          )
            .then(() => {
                let item = {name, description, imageUrl, startTime, endTime, maximumParticipants};
                  this.setState({ events: item });
                  this.setState({showUnit: true});
                  console.log('item', item);
                  alert('Cập nhật thành công');
            })
            .catch((e) => {
              console.log(e);
            })
          }
          else {
            return;
          }
    }

    render() {
        const match = matchPath(this.props.history.location.pathname, {
          path: '/eventedit/:eventId',
          exact: true,
          strict: false
        })
        const linkId = match.params.eventId;
        console.log('LinkId', linkId);

        const event = this.state.events.map((item) => {
            var img;
            if (this.state.url !== '') {
              img = this.state.url;
            }
            else {
              img = item.value.imageUrl;
            }
            if(linkId == item.value.id) {
                return(
                    <div>
                        <div className='namearea'>
                        <div className='ename-area'>
                            <p className='enametitle'><b>Tên sự kiện</b></p>
                            <input type='text' className='ename' name='name' placeholder={item.value.name} onChange={(e) => {this.setState({[e.target.name]: e.target.value})}} required/>
                        </div>

                        <p className='begtimetitle'><b>Thời gian: Từ</b></p>
                        <div className="begtime-area">
                            <p className='beg1date' style={{display: this.state.showUnit ? 'block' : 'none'}}>{Moment(item.value.startTime).format('DD/MM/yyyy')}</p>
                            <input type="date" name='startTime'  className="begdatetext" onChange={(e) => {this.setState({[e.target.name]: e.target.value}); this.setState({showUnit: false})}} required/>
                        </div>

                        <div className="endtime-area">
                            <p className='endtimetitle'><b>đến:</b></p>
                            <p className='end1date' style={{display: this.state.showUnit ? 'block' : 'none'}}>{Moment(item.value.endTime).format('DD/MM/yyyy')}</p>
                            <input type="date" name='endTime' onChange={(e) => {this.setState({[e.target.name]: e.target.value}); this.setState({showUnit: false})}} className="enddatetext" required/>
                        </div>

                        <div className="maxp-area">
                            <p className='maxptitle'><b>Số lượng người tham gia:</b></p>
                            <input type="number" name='maximumParticipants' onChange={(e) => {this.setState({[e.target.name]: e.target.value})}} placeholder={item.value.maximumParticipants} className="maxp-text" required/>
                        </div>

                            <button type="submit" className="e-button" onClick={() => {this.handleSubmit(item.value.name, item.value.description, item.value.startTime, item.value.endTime, item.value.imageUrl, item.value.maximumParticipants)}}><b>Cập nhật</b></button>
                            </div>

                            <div className='avaarea'>
                                <div className='eimg-area'>
                                    <progress value={this.state.progress} max="100" hidden={true}/>
                                    <label htmlFor="files" className='img'>Tải ảnh lên</label>
                                    <input id='files' type='file' className='img' onChange={this.handleChange} hidden={true} required/>
                                    <button className='img' onClick={this.handleUpload}></button>
                                    <img src={img} name='imageUrl' value={img} onChange={(e) => {this.setState({[e.target.name]: e.target.value})}} className='eve-img' alt=" "/>
                                </div>

                                <div className='eunit-area'>
                                    <div className='edesc-area'>
                                        <p className='edesc1'><b>Mô tả: </b></p>
                                        <textarea className='edescdetail' name='description' placeholder={item.value.description} onChange={(e) => {this.setState({[e.target.name]: e.target.value})}} required/>
                                    </div>
                                </div>
                        </div>
                    </div>
                )
            }
        });
        
        Moment.locale('en');

        return (
            <div className='eventdetail1'>
                <div className='detail-contain1'>
                    {event}
                </div>
            </div>
        );
    }
}

export default EventEditFeature;