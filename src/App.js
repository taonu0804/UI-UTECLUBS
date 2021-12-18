import './App.css';
import React from 'react';
import HomeFeature from './features/Home';
import LoginFeature from './features/Login';
import ContactFeature from './features/Contact';
import AdminFeature from './features/Admin';
import NotiFeature from './features/Noti';
import SignupFeature from './features/Signup';
import InfochangeFeature from './features/Infochange';
import NewFeedFeature from './features/Newfeed';
import ClubDetailFeature from './features/ClubDetail';
import ClubManagementFeature from './features/ClubManagement';
import SignupConfirmFeature from './features/SignupConfirm';
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
        <Route path='/clubdetail' component={ ClubDetailFeature } exact/>
        <Route path='/clubmanage' component={ ClubManagementFeature } exact/>
        <Route path='/signupconfirm' component={ SignupConfirmFeature } exact/>
      </div>
    </div>
  );
}

export default App;
