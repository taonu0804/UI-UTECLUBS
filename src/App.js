import './App.css';
import jwt from 'jwt-decode';
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
import SignupConfirmFeature from './features/SignupConfirm';
import LOGO from './image/UTE-CLUBS.png';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch } from 'react-router-dom';
import JoinedCLBFeature from './features/JoinedCLB';
import NotJoinedCLBFeature from './features/NotJoinedCLB';
import ErrorFeature from './features/Error';
import UserClubDetailFeature from './features/UserClubDetail';
import UserWelcomeFeature from './features/UserWelcome';
import { useHistory } from 'react-router-dom';
import ClbMembersFeature from './features/ClbMembers';
import AddClbFeature from './features/AddClb';
import ForgetPassFeature from './features/ForgetPassword';
import UserDetailFeature from './features/UserDetail';
import InputEmailForgetPassFeature from './features/InputEmailForgetPass';
import DetailedEventFeature from './features/DetailEvent';
import EventListFeature from './features/EventList';
import StatisticFeature from './features/Statistic';
import AddEventFeature from './features/AddEvent';
import ParticipantListFeature from './features/Participantlist';
import ManageCLBFeature from './features/ManageCLB';
import MyEventFeature from './features/MyEvent';
import EventEditFeature from './features/EventEdit';
import ClubManagementFeature from './features/ClubManagement';
import AdminClubDetailFeature from './features/AdminClubDetail';

function App() {
  const history = useHistory();
  const handleMoving = () => {
    try {
      const user = localStorage.getItem('user');
      const ava = user.avatarUrl;
      const access_token = localStorage.getItem('access_token');
      const role = (jwt(access_token)).roles[0];
      if (role === 'ROLE_ADMIN') {
        history.push('/admin');
      }
      else {
        history.push('/userwelcome');
      }
    } catch(error) {
      console.log(error);
      history.push('/error');
    }
  }

  const handleEvent = () => {
    try {
      const user = localStorage.getItem('user');
      const ava = user.avatarUrl;
      const access_token = localStorage.getItem('access_token');
      const role = (jwt(access_token)).roles[0];
      if (role === 'ROLE_ADMIN') {
        history.push('/eventlist');
      }
      else {
        history.push('/eventlist');
      }
    } catch(error) {
      console.log(error);
      history.push('/error');
    }
  }

  const contactPage = () => {
    history.push('/contact');
  }
  return (
    <div className="App">
      <div className="Header">
        <img className='Logo' src={LOGO}/>
        <button className='home-link' onClick={handleMoving}><b>TRANG CH???</b></button>
        <button className='event-link' onClick={handleEvent}><b>S??? KI???N</b></button>
        <button className='contact-link' onClick={contactPage}><b>LI??N H???</b></button>
      </div>

      <div className='Body'>
      <Switch>
        <Route path='/' component={ HomeFeature } exact/>
        <Route path='/login' component={ LoginFeature } exact/>
        <Route path='/contact' component={ ContactFeature } exact/>
        <Route path='/admin' component={ AdminFeature } exact/>
        <Route path='/noti/:clubId' component={ NotiFeature } exact/>
        <Route path='/signup' component={ SignupFeature } exact/>
        <Route path='/infochange/:userId' component={ InfochangeFeature } exact/>
        <Route path='/newfeed/:clubId' component={ NewFeedFeature } exact/>
        <Route path='/clubdetail/:clubId' component={ ClubDetailFeature } exact/>
        <Route path='/signupconfirm' component={ SignupConfirmFeature } exact/>
        <Route path='/joinedclb' component={ JoinedCLBFeature } exact/>
        <Route path='/notjoinedclb' component={ NotJoinedCLBFeature } exact/>
        <Route path='/userclubdetail' component={ UserClubDetailFeature }>
            <Route path='/userclubdetail/:clubId' component={ UserClubDetailFeature } exact/>
            <Route path='/userclubdetail/:clubId/notjoin' component={ UserClubDetailFeature } exact/>
        </Route>
        <Route path='/userwelcome' component={ UserWelcomeFeature } exact/>
        <Route path='/manageclb' component={ ClubManagementFeature } exact/>
        <Route path='/clbmember/:clubId' component={ ClbMembersFeature } exact/>
        <Route path='/addclb' component={ AddClbFeature } exact/>
        <Route path='/inputemail' component={ InputEmailForgetPassFeature } exact/>
        <Route path='/forgetpass' component={ ForgetPassFeature } exact/>
        <Route path='/userdetail/:userId' component={ UserDetailFeature } exact/>
        <Route path='/error' component={ ErrorFeature } exact/>
        <Route path='/detailevent/:eventId' component={ DetailedEventFeature } exact/>
        <Route path='/eventlist' component={ EventListFeature } exact/>
        <Route path='/statistic' component={ StatisticFeature } exact/>
        <Route path='/addevent/:clubId' component={ AddEventFeature } exact/>
        <Route path='/participant/:eventId' component={ ParticipantListFeature } exact/>
        <Route path='/myevent' component={ MyEventFeature } exact/>
        <Route path='/eventedit/:eventId' component={ EventEditFeature } exact/>
        <Route path='/usermanageclb' component={ ManageCLBFeature } exact/>
        <Route path='/admindetailclb/:clubId' component={ AdminClubDetailFeature } exact/>
      </Switch>
      </div>
    </div>
  );
}

export default App;
