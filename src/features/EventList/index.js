import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import AVA from '../../image/1.png';
import PERSON from '../../image/person.png';

class EventListFeature extends Component {
    constructor(props) {
       super(props)
       this.state = {
          events: [],
          parts:[],
          loading: true
       }

       this.handleInput = this.handleInput.bind(this);
       this.handleSearch = this.handleSearch.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSearch() {
        const token = localStorage.getItem('access_token');
        const body ={
            name: this.state.name,
            startTime: this.state.begdate + ' 08:00',
            endTime: this.state.enddate + ' 08:00',
            clubId: null,
        }
        console.log('body', body);
        fetch('https://uteclubs.herokuapp.com/events/search', {
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
            }).then(events => {
                console.log(events);
                if (events.length <= 1) {
                    const arr = JSON.parse(events);
                    console.log(arr);
                    var details = [];

                    for (var i in arr)
                    {
                        details.push({name: i, value: arr[i]})
                    }

                    this.setState({events: details});
                }
                else {
                    alert('Không có kết quả');
                }
            })
            .catch((e) => {
                alert('Không có kết quả');
                console.log('error', e);
            })
    }

    componentDidMount() {
        const token = localStorage.getItem('access_token');
        console.log('userId', token);

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

                this.state.events.map((item) => {
                    fetch(`https://uteclubs.herokuapp.com/events/${item.value.id}/participants`, {
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
                    })
            })
         .catch(error => console.log(error))
    }

    render() {
        console.log(this.state.events);
        var value = this.state.events.map((item) => {
            return (
                <div className='item'>
                    <div className="w3-third-w3-container-w3-margin-bottom">
                        <img src={item.value.imageUrl} alt="Norway" className="w3-hover-opacity"/>
                        <div className="w3-container-w3-white">
                            <Link to={`/detailevent/${item.value.id}`}><b>{item.value.name}</b></Link>
                            <p>{item.value.description}</p>
                            <p>Tối đa {item.value.maximumParticipants} người tham gia</p>
                            <p>Đã có {this.state.parts.length} người tham gia</p>
                        </div>
                    </div>
                </div>
            )
        });
    return (
        <div className='bodymain'>
            <div className='detail-body'>
                <nav className="nav-bar"><br/>
                    <div className="w3-container">
                        <a href="#" className="close-a" title="close menu">
                        </a>
                        <img src={AVA} className="people-ava"/><br/><br/>
                    </div>
                    <div className="w3-bar-block">
                        <Link className="nav-btn" to='/myevent'><img className='person' src={PERSON} />Sự kiện của tôi</Link>
                    </div>
                </nav>

                <div className="w3-main">
                    <header>
                        <span className="w3-button w3-hide-large w3-xxlarge w3-hover-text-grey"></span>
                        <div className="w3-container">
                            <h2><b>Các sự kiện đang diễn ra</b></h2>
                            <div className="w3-section w3-bottombar w3-padding-16">
                                <span className="w3-margin-right">Tên sự kiện</span>
                                <input type='text' className='evename-search' name='name' onChange={this.handleInput}></input>
                                <span className="w3-margin-right">Thời gian: Từ</span>
                                <input type='date' className='evebeg-search' name='begdate' onChange={this.handleInput}></input>
                                <span className="w3-margin-right">đến</span>
                                <input type='date' className='eveend-search' name='enddate' onChange={this.handleInput}></input>
                                <button className="w3-button-w3-white-w3-hide-small" onClick={() => {this.handleSearch()}}>Tìm kiếm</button>
                            </div>
                        </div>
                    </header>
                <hr className='endline'/>
                
                <div className="w3-row-padding">
                {value.length ? value : <p className='notible'>Không có câu lạc bộ nào</p>}
                </div>
            </div>
        </div>
    </div>
    );
    }
}

export default EventListFeature;