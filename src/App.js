import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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
import { Link, Switch } from 'react-router-dom';
import JoinedCLBFeature from './features/JoinedCLB';
import NotJoinedCLBFeature from './features/NotJoinedCLB';
import ErrorFeature from './features/Error';
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  const handleMoving = () => {
    try {
      const user = localStorage.getItem('user');
      const ava = user.avatarUrl;
      history.push('/newfeed');
    } catch(error) {
      console.log(error);
      history.push('/error');
    }
  }
  return (
    <div className="App">
      <div className="Header">
        <img className='Logo' src={LOGO}/>
        <button className='home-link' onClick={handleMoving}><b>HOME</b></button>
        <button className='contact-link' to='/contact'><b>LIÊN HỆ</b></button>
      </div> 

      <div className='Body'>
      <Switch>
        <Route path='/' component={ HomeFeature } exact/>
        <Route path='/login' component={ LoginFeature } exact/>
        <Route path='/contact' component={ ContactFeature } exact/>
        <Route path='/admin' component={ AdminFeature } exact/>
        <Route path='/noti' component={ NotiFeature } exact/>
        <Route path='/signup' component={ SignupFeature } exact/>
        <Route path='/infochange/:id?' component={ InfochangeFeature } exact/>
        <Route path='/newfeed' component={ NewFeedFeature } exact/>
        <Route path='/clubdetail/:clubId?' component={ ClubDetailFeature } exact/>
        <Route path='/clubmanage' component={ ClubManagementFeature } exact/>
        <Route path='/signupconfirm' component={ SignupConfirmFeature } exact/>
        <Route path='/joinedclb' component={ JoinedCLBFeature } exact/>
        <Route path='/notjoinedclb' component={ NotJoinedCLBFeature } exact/>
        <Route path='/error' component={ ErrorFeature } exact/>
      </Switch>
      </div>
    </div>
  );
}

export default App;
