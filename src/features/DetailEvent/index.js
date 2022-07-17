import React, { Component } from 'react';
import { useHistory } from "react-router-dom";
import './style.css';
import AVA from '../../image/spkt.jpg';
import EDITE from '../../image/editevent.png';
import DELE from '../../image/delevent.png';
import JOIN from '../../image/join.png';
import USER1 from '../../image/user1.png';
import USER2 from '../../image/user2.png';
import USER3 from '../../image/user3.png';
import CANCEL from '../../image/cancel.png';
import TT from '../../image/tt.jpg';
import XTN from '../../image/xtn.jpg';
import { Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import Moment from 'moment';
import jwt from 'jwt-decode';

class DetailEventFeature extends Component {
    constructor (props) {
      super(props);
      this.state = {
        events: [],
        parts: [],
        showAdGroup: false,
        showUserGroup: false,
        showRes: true,
        showCancel: false,
        join: [],
      }

      this.handleCancel = this.handleCancel.bind(this);
      this.handleRes = this.handleRes.bind(this);
      this.handleDel = this.handleDel.bind(this);
    }

    componentDidMount() {
        const match = matchPath(this.props.history.location.pathname, {
            path: '/detailevent/:eventId',
            exact: true,
            strict: false
          })
          const linkId = match.params.eventId;
          console.log('LinkId', linkId);

        const token = localStorage.getItem('access_token');
        console.log('userId', token);
        fetch(`https://uteclubs.herokuapp.com/events/${linkId}/participants`, {
         headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
      })
            .then(response => response.json())
            .then(parts => {
               let details = [];

               for (var i in parts.content) {
                   details.push({ name: i, value: parts.content[i] })
               }
   
                this.setState({
                    parts: details,
                    loading: true,
                })
            })
         .catch(error => console.log(error))

         fetch('https://uteclubs.herokuapp.com/events?page=0', {
         headers: {
            Authorization: `Bearer ${token}`,
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

         fetch(`https://uteclubs.herokuapp.com/events/${linkId}/get-edit-permission`, {
         headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
      })
            .then((response) => {
                response.json();
                console.log(response.ok);

                if(response.ok == true) {
                    this.setState({showAdGroup: true,
                    showUserGroup: false})
                }
                else {
                    this.setState({showAdGroup: false,
                    showUserGroup: true})
                }

            })
            .catch(error => console.log(error))

            fetch('https://uteclubs.herokuapp.com/events/registered-events', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                    .then(response => response.json())
                    .then(join => {
                    let details = [];

                    for (var i in join.content) {
                        details.push({ name: i, value: join.content[i] })
                    }
        
                    this.setState({
                        join: details,
                        loading: true,
                    })

                    let d = new Date();
                    this.state.join.map((item) => {
                        if (d.toUTCString() >= item.value.endTime) {
                            this.setState({showRes: false,
                            showCancel:false})
                        }
                        else {
                            if (item.value.id == linkId) {
                                this.setState({showRes:false,
                                showCancel: true})
                            }
                            else {
                                this.setState({showRes:true,
                                showCancel: false})
                            }
                        }
                    })
                    })
                .catch(error => console.log(error))
        }

    handleRes = (e) => {
        e.preventDefault();
        const match = matchPath(this.props.history.location.pathname, {
            path: '/detailevent/:eventId',
            exact: true,
            strict: false
          })
        const linkId = match.params.eventId;
        console.log('LinkId', linkId);
        var body = {
            eventId: linkId,
        }

        const token = localStorage.getItem('access_token');
        console.log('userId', token);

        fetch(`https://uteclubs.herokuapp.com/events/register-to-event`, {
       method: 'POST',
       headers: {
           Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify(body)
   })
       .then(response => {response.json();
           console.log(response);
           this.setState({showRes: false,
                        showCancel: true})
       })
       .catch((e) => {
           console.log('error', e);
           alert('Có lỗi xảy ra');
           
           window.location.reload();
       })
    }

    handleCancel = (e) => {
        e.preventDefault();
        const match = matchPath(this.props.history.location.pathname, {
            path: '/detailevent/:eventId',
            exact: true,
            strict: false
          })
        const linkId = match.params.eventId;
        console.log('LinkId', linkId);

        const token = localStorage.getItem('access_token');
        console.log('userId', token);

    if (window.confirm('Bạn muốn hủy yêu cầu?') == true) {
        fetch(`https://uteclubs.herokuapp.com/events/${linkId}/cancel-event-registration`, {
       method: 'DELETE',
       headers: {
           Authorization: `Bearer ${token}`,
       },
    })
       .then(response => {response.json();
           console.log(response);
           alert('Hủy yêu cầu thành công');
           this.setState({showRes: true,
                        showCancel: false})
       })
       .catch((e) => {
           console.log('error', e);
           alert('Có lỗi xảy ra');
       })
    }
    else {
        return;
    }
    }

    handleDel = (e) => {
        e.preventDefault();
        const match = matchPath(this.props.history.location.pathname, {
            path: '/detailevent/:eventId',
            exact: true,
            strict: false
          })
        const linkId = match.params.eventId;
        console.log('LinkId', linkId);

        const token = localStorage.getItem('access_token');
        console.log('userId', token);

    if (window.confirm('Bạn muốn hủy yêu cầu?') == true) {
        fetch(`https://uteclubs.herokuapp.com/events/${linkId}`, {
       method: 'DELETE',
       headers: {
           Authorization: `Bearer ${token}`,
       },
    })
       .then(response => {response.json();
           console.log(response);
           alert('Xóa thành công');

           let history = useHistory();
           history.path('/myevent');
       })
       .catch((e) => {
           console.log('error', e);
           alert('Có lỗi xảy ra');
       })
    }
    else {
        return;
    }
    }

    render() {
        const match = matchPath(this.props.history.location.pathname, {
          path: '/detailevent/:eventId',
          exact: true,
          strict: false
        })
        const linkId = match.params.eventId;
        console.log('LinkId', linkId);

        const eventName = this.state.events.map((item) => {
            if(linkId == item.value.id) {
                return(
                    item.value.name
                )
            }
        });
        
        Moment.locale('en');
        const eventDetail = this.state.events.map((item) => {
            if(linkId == item.value.id) {
                return(
                    <div>
                        <p className='title11'><b>Chi tiết sự kiện:</b></p>
                        <p className='detailed'>{item.value.description}</p>
                        <p className='begin-time'><b>Thời gian bắt đầu: </b></p>
                        <p className='begin'>{Moment(item.value.startTime).format('DD/MM/yyyy')}</p>
                        <p className='end-time'><b>Thời gian kết thúc: </b></p>
                        <p className='end'>{Moment(item.value.endTime).format('DD/MM/yyyy')}</p>
                        <p className='end-time'><b>Số người tham gia: </b></p>
                        <p className='end'>{item.value.maximumParticipants}</p>
                    </div>
                )
            }
        });

        return (
            <div className='eventlist'>
                <div className='body-main'>
                    <div className='in4body'>
                        <img className='ava-main' src={AVA}/>
                        <p className='event-name'><b>{eventName}</b></p>
                    </div>

                    <div className='body-one'>
                        {eventDetail}
                    </div>

                    <div className='body-two'>
                        <img className='ava-two' src={USER1}/>
                        <img className='ava-two' src={USER2}/>
                        <img className='ava-two' src={USER3}/><br/>
                        <Link className='amount' to={`/participant/${linkId}`}><p>{this.state.parts.length} người tham gia</p></Link>
                    </div>
                    
                    <div className='body-three'>
                    <p className='title-rela'><b>Sự kiện liên quan</b></p>
                        <img className='ava-three' src={TT}/> <p className='name1'>Đêm trung thu</p>
                        <img className='ava-three' src={XTN}/> <p className='name1'>Xuân tình nguyện</p>
                    </div>
                </div>

                <div className='buttongr' style={{display: this.state.showAdGroup ? 'block' : 'none'}}>
                    <Link className='edit1' to={`/eventedit/${linkId}`}><img className='editevent' src={EDITE}/><b>  Sửa sự kiện</b></Link>
                    <button className='del1' onClick={this.handleDel}><img className='delevent' src={DELE}/><b>  Xóa sự kiện</b></button>
                </div>

                <div className='buttongr' style={{display: this.state.showUserGroup ? 'block' : 'none'}}>
                    <button className='registerbtn' style={{display: this.state.showRes ? 'block' : 'none'}} onClick={this.handleRes}><img className='joinevent' src={JOIN}/><b>  Tham gia</b></button>
                    <button className='cancelregbtn' style={{display: this.state.showCancel ? 'block' : 'none'}} onClick={this.handleCancel}><img className='cancelevent' src={CANCEL}/><b>  Hủy tham gia</b></button>
                </div>
            </div>
        );
    }
}

export default DetailEventFeature;