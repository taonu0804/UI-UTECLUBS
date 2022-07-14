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
       };
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