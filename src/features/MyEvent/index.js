import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import AVA from '../../image/1.png';
import PERSON from '../../image/person.png';

class MyEventFeature extends Component {
    constructor(props) {
       super(props)
       this.state = {
          events: [],
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
        fetch('https://uteclubs.herokuapp.com/events/registered-events', {
        method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
      })
            .then(response => response.json())
            .then(events => {
               let details = [];

               for (var i in events) {
                   details.push({ name: i, value: events[i] })
               }
   
                this.setState({
                    events: details,
                    loading: true,
                })

                console.log(this.state);
            })
         .catch(error => console.log(error))
    }

    render() {
        console.log(this.state);
        var value = this.state.events.map((item) => {
            return (
                <div className='item'>
                    <div className="w3-third-w3-container-w3-margin-bottom">
                        <img src={item.value.imageUrl} alt="Norway" className="w3-hover-opacity"/>
                        <div className="w3-container-w3-white">
                            <Link to={`/detailevent/${item.value.id}`}><b>{item.value.name}</b></Link>
                            <p>{item.value.description}</p>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className='bodymain'>
                <div className='detail-body'>
                    <nav className="nav-bar1"><br/>
                        <div className="w3-containe1r">
                            <a href="#" className="close-a1" title="close menu">
                                <i class="fa fa-remove"></i>
                            </a>
                            <img src={AVA} alt='Avatar' className="people-ava"/><br/><br/>
                            <Link className='back' to='/eventlist'>Trở lại</Link>
                        </div>
                    </nav>

                    <div className="w3-main1">
                        <header>
                            <span className="w3-button w3-hide-large w3-xxlarge w3-hover-text-grey"><i className="fa fa-bars"></i></span>
                            <div className="w3-container1">
                                <h2><b>Các sự kiện của tôi</b></h2>
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
                    
                    <div className="w3-row-padding1">
                        {value}
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default MyEventFeature;