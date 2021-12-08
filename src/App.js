import './App.css';
import React from 'react';
import HomeFeature from './features/home';
import LoginFeature from './features/login';
import ContactFeature from './features/contact';
import AdminFeature from './features/admin';
import NotiFeature from './features/noti';
import SignupFeature from './features/signup';
import InfochangeFeature from './features/infochange';
import NewFeedFeature from './features/newfeed';
import LOGO from './image/UTE-CLUBS.png';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
//import {useState} from 'react';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <img className='Logo' src={LOGO}/>
        <Link className='home-link' to='/'><b>HOME</b></Link>
        <Link className='contact-link' to='/contact'><b>LIÊN HỆ</b></Link>
      </div> 

      <div className='Body'>
        <Route path='/' component={ HomeFeature } exact/>
        <Route path='/login' component={ LoginFeature } exact/>
        <Route path='/contact' component={ ContactFeature } exact/>
        <Route path='/admin' component={ AdminFeature } exact/>
        <Route path='/noti' component={ NotiFeature } exact/>
        <Route path='/signup' component={ SignupFeature } exact/>
        <Route path='/infochange' component={ InfochangeFeature } exact/>
        <Route path='/newfeed' component={ NewFeedFeature } exact/>
      </div>
    </div>
  );
}

export default App;
